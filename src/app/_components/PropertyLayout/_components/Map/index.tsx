"use client";

import style from "./styles.module.scss";
import { useEffect, useRef } from "react";
import "maplibre-gl/dist/maplibre-gl.css";

type MapLibreMap = import("maplibre-gl").Map;
type MapLibreMarker = import("maplibre-gl").Marker;

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
    import("maplibre-gl").then((maplibregl) => {
      if (cancelled) return;

      // MapLibre resolves its worker relative to `import.meta.url`, which does
      // not land on an emitted asset under Next.js. Point it at the copy in
      // /public that scripts/copy-maplibre-worker.mjs installs; otherwise the
      // map mounts and throws "Worker failed to load".
      maplibregl.setWorkerUrl("/maplibre/maplibre-gl-worker.mjs");

      // OpenFreeMap: no API key, no registration, no usage limits. Its "dark"
      // style is the same Dark Matter look CARTO ships, just keyless.
      const mapInstance = new maplibregl.Map({
        container,
        style: "https://tiles.openfreemap.org/styles/dark",
        center: [lng, lat],
        // Native resolution: the OpenFreeMap vector source tops out at z14, so
        // this is the only zoom that renders tiles without overzooming them.
        zoom: 14,
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

        // The style is an unmodified fork of the upstream dark-matter style and
        // still asks for a "wood-pattern" sprite image that OpenFreeMap's sprite
        // does not ship, so MapLibre logs "Image \"wood-pattern\" could not be
        // loaded" on every paint. Clearing the pattern keeps the layer's own
        // fill-color and opacity ramp, which is how the woods are meant to look
        // on a dark basemap anyway.
        if (mapInstance.getLayer("landcover_wood")) {
          // Clearing a paint property with `null` is supported at runtime —
          // `Style.setPaintProperty` skips validation for null/undefined on
          // purpose — but maplibre-gl 6.14 does not declare the overload in
          // its .d.ts, hence the cast.
          mapInstance.setPaintProperty(
            "landcover_wood",
            "fill-pattern",
            null as unknown as string,
          );
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
