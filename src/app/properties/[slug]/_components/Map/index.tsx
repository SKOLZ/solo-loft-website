"use client";

import style from "./styles.module.scss";
import { useEffect, useRef } from "react";
import "leaflet/dist/leaflet.css";

interface Props {
  lat: number;
  lng: number;
}

export const Map: React.FC<Props> = ({ lat, lng }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    import("leaflet").then((L) => {
      if (!containerRef.current) return;
      // Fixes a 1px gap between tiles in Leaflet
      (function () {
        var originalInitTile = (L.GridLayer.prototype as any)._initTile;
        L.GridLayer.include({
          _initTile: function (tile: {
            style: { width: string; height: string };
          }) {
            originalInitTile.call(this, tile);

            var tileSize = this.getTileSize();

            tile.style.width = tileSize.x + 0.5 + "px";
            tile.style.height = tileSize.y + 0.5 + "px";
          },
        });
      })();
      const map = L.map(containerRef.current, {
        center: [lat, lng],
        zoom: 16,
      });

      L.tileLayer(
        "https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png",
        {
          maxZoom: 20,
        },
      ).addTo(map);

      const marker = L.icon({
        iconUrl: "/marker.svg",
        iconSize: [40, 40],
        iconAnchor: [20, 40],
      });

      L.marker([lat, lng], { icon: marker }).addTo(map);
    });
  }, [lat, lng]);

  return <div className={style.mapContainer} ref={containerRef} />;
};
