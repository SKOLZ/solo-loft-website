import {
  FeatureFragment,
  LuminousStages,
  Orientations,
} from "@/generated/graphql";
import { pluralizeString } from "@/utils/pluralizeString";
import type { MetersFeature } from "./types";

export const featureTypenameIconMap: Record<
  FeatureFragment["type"] | MetersFeature["type"],
  string
> = {
  bathrooms: "ic-bathroom",
  bedrooms: "ic-bed",
  buildingAge: "ic-calendar",
  coveredMeters: "ic-covered-meters",
  garages: "ic-garage",
  luminosity: "ic-luminosity",
  orientation: "ic-window",
  rooms: "ic-door",
  toilets: "ic-toilet",
  meters: "ic-squared-meters",
};

const orientationMap: Record<Orientations, string> = {
  north: "Norte",
  south: "Sur",
  east: "Este",
  west: "Oeste",
};

const luminosityLevelMap: Record<LuminousStages, string> = {
  luminous: "Luminoso",
  veryLuminous: "Muy luminoso",
};

export const getFeatureText = (feature: FeatureFragment | MetersFeature) => {
  switch (feature.type) {
    case "meters":
      return `${feature.amount} m²`;
    case "bathrooms":
      return `${feature.amount} ${pluralizeString(
        feature.amount || 0,
        "Baño"
      )}`;
    case "bedrooms":
      return `${feature.amount} Dorm.`;
    case "buildingAge":
      return `${feature.amount} ${pluralizeString(feature.amount || 0, "Año")}`;
    case "coveredMeters":
      return `${feature.amount} m² Cub.`;
    case "garages":
      return `${feature.amount} Coch.`;
    case "luminosity":
      return luminosityLevelMap[feature.luminosityLevel!] || "";
    case "orientation":
      return orientationMap[feature.orientation!] || "";
    case "rooms":
      return `${feature.amount} Amb.`;
    case "toilets":
      return `${feature.amount} ${pluralizeString(
        feature.amount || 0,
        "Toilette"
      )}`;
  }
};
