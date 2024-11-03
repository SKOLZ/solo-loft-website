"use client";

import { useMemo } from "react";
import style from "./styles.module.scss";
import {
  APIProvider,
  Map as GoogleMap,
  Marker,
} from "@vis.gl/react-google-maps";

interface Props {
  lat: number;
  lng: number;
}

export const Map: React.FC<Props> = ({ lat, lng }) => {
  const center = useMemo(() => ({ lat, lng }), [lat, lng]);

  return (
    <APIProvider apiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}>
      <GoogleMap
        className={style.mapContainer}
        defaultCenter={center}
        defaultZoom={15}
        disableDefaultUI={true}
        keyboardShortcuts={false}
      >
        <Marker position={center} />
      </GoogleMap>
    </APIProvider>
  );
};
