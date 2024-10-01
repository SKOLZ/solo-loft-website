import Image from "next/image";
import styles from "./styles.module.scss";
import { PropertySummaryFragment } from "@/generated/graphql";
import { TransactionTypeTag } from "@/app/_components/TransactionTypeTag";
import { formatNumber } from "@/utils/formatNumber";
import Link from "next/link";
import { PropertyFeatures } from "@/app/_components/PropertyFeatures";
import { districtTextMap } from "@/utils/districtTextMap";

interface Props {
  propertySummary: PropertySummaryFragment;
}

export const PropertyCard: React.FC<Props> = ({ propertySummary }) => {
  return (
    <Link
      href={`/properties/${propertySummary.slug}`}
      className={styles.propertyCard}
    >
      <Image
        className={styles.propertyCardImage}
        src={propertySummary.photos[0].url}
        alt="Property"
        width={308}
        height={234}
      />
      <div className={styles.propertyCardContent}>
        <TransactionTypeTag
          transactionType={propertySummary.transactionType}
          className={styles.propertyCardType}
        />
        <h2 className={styles.propertyCardAddress}>
          {propertySummary.address}
        </h2>
        {propertySummary.district && (
          <p className={styles.propertyCardDistrict}>
            {districtTextMap[propertySummary.district]}
          </p>
        )}
        <div className={styles.propertyCardFeatures}>
          <PropertyFeatures
            features={propertySummary.features}
            meters={propertySummary.meters}
          />
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
    </Link>
  );
};
