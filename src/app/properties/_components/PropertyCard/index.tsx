import Image from "next/image";
import styles from "./styles.module.scss";
import { PropertySummaryFragment } from "@/generated/graphql";
import { PropertyFeature } from "./_components/PropertyFeature";
import {
  districtTextMap,
  transactionTypeClassMap,
  transactionTypeTextMap,
} from "./utils";
import { formatNumber } from "@/utils/formatNumber";

interface Props {
  propertySummary: PropertySummaryFragment;
}

export const PropertyCard: React.FC<Props> = ({ propertySummary }) => {
  return (
    <div className={styles.propertyCard}>
      <Image
        className={styles.propertyCardImage}
        src={propertySummary.photos[0].url}
        alt="Property"
        width={308}
        height={234}
      />
      <div className={styles.propertyCardContent}>
        <p
          className={`${styles.propertyCardTransactionType} ${
            transactionTypeClassMap[propertySummary.transactionType]
          }`}
        >
          {transactionTypeTextMap[propertySummary.transactionType]}
        </p>
        <h2 className={styles.propertyCardAddress}>
          {propertySummary.address}
        </h2>
        {propertySummary.district && (
          <p className={styles.propertyCardDistrict}>
            {districtTextMap[propertySummary.district]}
          </p>
        )}
        <div className={styles.propertyCardFeatures}>
          <PropertyFeature
            propertyFeature={{
              __typename: "Meters",
              amount: propertySummary.meters,
            }}
          />
          {propertySummary.features.slice(0, 3).map((feature) => (
            <PropertyFeature
              key={feature.__typename}
              propertyFeature={feature}
            />
          ))}
        </div>
        <h3 className={styles.propertyCardPrice}>
          {propertySummary.costCurrency} {formatNumber(propertySummary.cost)}
        </h3>
        {propertySummary.expenses && (
          <p className={styles.propertyCardExpenses}>
            ${formatNumber(propertySummary.expenses)} expensas
          </p>
        )}
      </div>
    </div>
  );
};
