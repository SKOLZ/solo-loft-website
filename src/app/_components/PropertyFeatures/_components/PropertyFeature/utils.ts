import {
  FeatureFragment,
  LuminousStages,
  Orientations,
} from "@/generated/graphql";
import { pluralizeString } from "@/utils/pluralizeString";
import type { MetersFeature } from "./types";

export const featureTypenameIconMap: Record<
  FeatureFragment["__typename"] | MetersFeature["__typename"],
  string
> = {
  Bathroom: "ic-bathroom",
  Bedroom: "ic-bed",
  BuildingAge: "ic-calendar",
  CoveredMeter: "ic-covered-meters",
  Garage: "ic-garage",
  Luminosity: "ic-luminosity",
  Orientation: "ic-window",
  Room: "ic-door",
  Toilet: "ic-toilet",
  Meters: "ic-squared-meters",
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
  switch (feature.__typename) {
    case "Meters":
      return `${feature.amount} m²`;
    case "Bathroom":
      return `${feature.amount} ${pluralizeString(feature.amount, "Baño")}`;
    case "Bedroom":
      return `${feature.amount} Dorm.`;
    case "BuildingAge":
      return `${feature.years} ${pluralizeString(feature.years, "Año")}`;
    case "CoveredMeter":
      return `${feature.amount} m² Cub.`;
    case "Garage":
      return `${feature.amount} Coch.`;
    case "Luminosity":
      return luminosityLevelMap[feature.level];
    case "Orientation":
      return orientationMap[feature.orientation];
    case "Room":
      return `${feature.amount} Amb.`;
    case "Toilet":
      return `${feature.amount} ${pluralizeString(feature.amount, "Toilette")}`;
  }
};
