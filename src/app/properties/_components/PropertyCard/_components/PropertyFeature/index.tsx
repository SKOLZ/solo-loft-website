import { Feature } from "@/generated/graphql";
import styles from "./styles.module.scss";
import { featureTypenameIconMap, getFeatureText } from "./utils";
import type { MetersFeature } from "./types";

interface Props {
  propertyFeature: Feature | MetersFeature;
}

export const PropertyFeature: React.FC<Props> = ({ propertyFeature }) => {
  return (
    <div className={styles.feature}>
      <i
        className={`${styles.featureIcon} ic ${
          featureTypenameIconMap[propertyFeature.__typename]
        }`}
      />
      <p className={styles.featureLabel}>{getFeatureText(propertyFeature)}</p>
    </div>
  );
};
