"use client";

import { useMemo } from "react";
import style from "./styles.module.scss";
import { MapContainer, Marker, TileLayer } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { Icon } from "leaflet";

interface Props {
  lat: number;
  lng: number;
}

const Map: React.FC<Props> = ({ lat, lng }) => {
  const center = useMemo(() => ({ lat, lng }), [lat, lng]);

  const defaultIcon = new Icon({
    iconUrl:
      "https://sa-east-1.graphassets.com/clzbzounr059207j00w2u668e/cm6nkvhxp11qc07kkf5d8bny4",
    iconSize: [27, 36],
    iconAnchor: [12, 36],
    popupAnchor: [1, -36],
    shadowSize: [36, 36],
  });

  return (
    <MapContainer
      center={center}
      zoom={17}
      scrollWheelZoom={true}
      className={style.mapContainer}
    >
      <TileLayer
        attribution=""
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <Marker icon={defaultIcon} position={center} />
    </MapContainer>
  );
};

export default Map;
