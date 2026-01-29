"use client";

import style from "./styles.module.scss";
import MapContainer from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

interface Props {
  lat: number;
  lng: number;
}

const Map: React.FC<Props> = ({ lat, lng }) => {
  return (
    <div className={style.mapContainer}>
      <MapContainer
        initialViewState={{
          longitude: lat,
          latitude: lng,
          zoom: 17,
        }}
        mapStyle="https://api.maptiler.com/maps/streets/style.json?key=ETYUbTqaV4poyV2t8ZDG"
      />
    </div>
  );
};

export default Map;
