"use client";

import style from "./styles.module.scss";
import { useEffect, useRef } from "react";
import type {
  Map as MapLibreMap,
  Marker as MapLibreMarker,
  StyleSpecification,
} from "maplibre-gl";
import "maplibre-gl/dist/maplibre-gl.css";

const STYLE_URL = "https://tiles.openfreemap.org/styles/dark";

/**
 * OpenFreeMap's `dark` style is an unmodified fork of the upstream dark-matter
 * style, and it still asks for a `wood-pattern` sprite image that OpenFreeMap's
 * sprite does not ship.
 *
 * MapLibre resolves fill patterns while processing the first tiles, which
 * happens *before* `load` fires, so patching the layer in `load` only fixes the
 * rendering and still logs
 * "Image \"wood-pattern\" could not be loaded" once. Dropping the broken
 * reference from the style JSON means MapLibre never asks for it. The layer
 * keeps its own `fill-color` and opacity ramp, which is how the woods read on a
 * dark basemap anyway.
 */
function dropMissingWoodPattern(
  styleSpec: StyleSpecification,
): StyleSpecification {
  return {
    ...styleSpec,
    layers: styleSpec.layers.map((layer) => {
      if (
        layer.id !== "landcover_wood" ||
        !("paint" in layer) ||
        !layer.paint
      ) {
        return layer;
      }
      const paint: Record<string, unknown> = { ...layer.paint };
      delete paint["fill-pattern"];
      return { ...layer, paint } as typeof layer;
    }),
  };
}

interface Props {
  lat: number;
  lng: number;
}

export const Map: React.FC<Props> = ({ lat, lng }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = containerRef.current;

    if (!container) return;

    let map: MapLibreMap | undefined;
    let marker: MapLibreMarker | undefined;
    let cancelled = false;

    // Loaded lazily because maplibre-gl touches browser globals on import while
    // Next.js still server-renders this client component.
    import("maplibre-gl").then(async (maplibregl) => {
      if (cancelled) return;

      // MapLibre resolves its worker relative to `import.meta.url`, which does
      // not land on an emitted asset under Next.js. Point it at the copy in
      // /public that scripts/copy-maplibre-worker.mjs installs; otherwise the
      // map mounts and throws "Worker failed to load".
      maplibregl.setWorkerUrl("/maplibre/maplibre-gl-worker.mjs");

      // Best effort: if the style cannot be fetched, fall back to the URL so
      // the map still mounts — at the cost of the wood-pattern warning.
      // Named `styleSpec`, not `style`: the latter shadows the SCSS module.
      let styleSpec: StyleSpecification | string = STYLE_URL;
      try {
        const response = await fetch(STYLE_URL);
        if (response.ok) {
          styleSpec = dropMissingWoodPattern(
            (await response.json()) as StyleSpecification,
          );
        }
      } catch {
        // Keep the URL; MapLibre will retry the style itself.
      }
      if (cancelled) return;

      // OpenFreeMap: no API key, no registration, no usage limits. Its "dark"
      // style is the same Dark Matter look CARTO ships, just keyless.
      const mapInstance = new maplibregl.Map({
        container,
        style: styleSpec,
        center: [lng, lat],
        // Native resolution: the OpenFreeMap vector source tops out at z14, so
        // this is the only zoom that renders tiles without overzooming them.
        zoom: 15,
        scrollZoom: false,
        dragRotate: false,
        pitchWithRotate: false,
        attributionControl: false,
      });
      map = mapInstance;

      // The style draws one-way arrows on streets. They only paint from z15 up,
      // so they are already gone at z14, but hide them so they stay gone if the
      // user zooms in with the navigation control.
      mapInstance.on("load", () => {
        for (const layerId of ["road_oneway", "road_oneway_opposite"]) {
          if (mapInstance.getLayer(layerId)) {
            mapInstance.setLayoutProperty(layerId, "visibility", "none");
          }
        }
      });

      // Parity with the previous map: zoom buttons only, no rotation.
      mapInstance.touchZoomRotate.disableRotation();
      mapInstance.addControl(
        new maplibregl.NavigationControl({ showCompass: false }),
        "top-left",
      );

      // The basemap licence requires visible attribution and forbids
      // collapsing it behind a click, so `compact` stays false and the
      // quiet look comes from styles.module.scss instead.
      mapInstance.addControl(
        new maplibregl.AttributionControl({ compact: false }),
        "bottom-right",
      );

      const markerEl = document.createElement("div");
      markerEl.className = style.marker;
      markerEl.setAttribute("aria-hidden", "true");

      marker = new maplibregl.Marker({ element: markerEl, anchor: "bottom" })
        .setLngLat([lng, lat])
        .addTo(mapInstance);
    });

    return () => {
      cancelled = true;
      marker?.remove();
      map?.remove();
      marker = undefined;
      map = undefined;
    };
  }, [lat, lng]);

  return <div className={style.mapContainer} ref={containerRef} />;
};
