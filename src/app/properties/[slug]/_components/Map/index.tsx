"use client";

import style from "./styles.module.scss";
import MapContainer, { Marker } from "react-map-gl/maplibre";
import "maplibre-gl/dist/maplibre-gl.css";

interface Props {
  lat: number;
  lng: number;
}

export const Map: React.FC<Props> = ({ lat, lng }) => {
  return (
    <div className={style.mapContainer}>
      <MapContainer
        initialViewState={{
          latitude: lat,
          longitude: lng,
          zoom: 15,
        }}
        mapStyle="/style.json"
      >
        <Marker longitude={lng} latitude={lat} anchor="bottom" draggable>
          <svg
            height={40}
            viewBox="-2 -2 28 28"
            stroke="#fff"
            strokeWidth="2"
            fill="#000"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20.2,15.7L20.2,15.7c1.1-1.6,1.8-3.6,1.8-5.7c0-5.6-4.5-10-10-10S2,4.5,2,10c0,2,0.6,3.9,1.6,5.4c0,0.1,0.1,0.2,0.2,0.3
  c0,0,0.1,0.1,0.1,0.2c0.2,0.3,0.4,0.6,0.7,0.9c2.6,3.1,7.4,7.6,7.4,7.6s4.8-4.5,7.4-7.5c0.2-0.3,0.5-0.6,0.7-0.9
  C20.1,15.8,20.2,15.8,20.2,15.7z"
            />
          </svg>
        </Marker>
      </MapContainer>
    </div>
  );
};
