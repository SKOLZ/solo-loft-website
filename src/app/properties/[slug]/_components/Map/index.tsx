"use client";

import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import { useCallback, useMemo } from "react";
import style from "./styles.module.scss";

interface Props {
  lat: number;
  lng: number;
}

export const Map: React.FC<Props> = ({ lat, lng }) => {
  const center = useMemo(() => ({ lat, lng }), [lat, lng]);
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: process.env.GOOGLE_MAPS_API_KEY || "",
  });

  const onLoad = useCallback(
    function callback(map: google.maps.Map) {
      const bounds = new window.google.maps.LatLngBounds(center);
      map.fitBounds(bounds);
    },
    [center]
  );

  if (!isLoaded) {
    return null;
  }

  return (
    <GoogleMap
      mapContainerClassName={style.mapContainer}
      center={center}
      zoom={15}
      onLoad={onLoad}
      options={{
        disableDefaultUI: true,
        zoomControl: true,
        controlSize: 24,
        keyboardShortcuts: false,
      }}
    >
      <Marker position={center} />
    </GoogleMap>
  );
};
