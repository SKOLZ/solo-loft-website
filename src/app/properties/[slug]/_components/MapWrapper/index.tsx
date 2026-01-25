"use client";
import dynamic from "next/dynamic";
const Map = dynamic(() => import("../Map"), { ssr: false });

interface Props {
  lat: number;
  lng: number;
}

export const MapWrapper: React.FC<Props> = ({ lat, lng }) => {
  return <Map lat={lat} lng={lng} />;
};
