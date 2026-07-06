import Link from "next/link";
import { RichText } from "@graphcms/rich-text-react-renderer";

import { PropertyFragment } from "@/generated/graphql";
import { formatNumber } from "@/utils/formatNumber";
import { districtTextMap } from "@/utils/districtTextMap";

import { TransactionTypeTag } from "../TransactionTypeTag";
import { PropertyFeatures } from "../PropertyFeatures";

import { PropertyAssetsViewer } from "./_components/PropertyAssetsViewer";
import { Map } from "./_components/Map";

import styles from "./styles.module.scss";

interface PropertyLayoutProps {
  property: PropertyFragment;
}

export const PropertyLayout = ({ property }: PropertyLayoutProps) => {
  return (
    <section className={styles.propertyContainer}>
      <div className={styles.propertyInfoContainer}>
        <PropertyAssetsViewer
          photos={property.photos}
          videos={property.videos}
          className={styles.assetViewer}
        />
        <div className={styles.propertyInfoWrapper}>
          <TransactionTypeTag transactionType={property.transactionType} />
          <h2 className={styles.propertyAddress}>{property.address}</h2>
          {property.district && (
            <p className={styles.propertyDistrict}>
              {districtTextMap[property.district]}
            </p>
          )}
          <div className={styles.propertyFeatures}>
            <PropertyFeatures
              features={property.features}
              meters={property.meters}
            />
          </div>
          <h3 className={styles.propertyPrice}>
            {property.costCurrency} {formatNumber(property.cost)}
          </h3>
          {property.expenses && (
            <p className={styles.propertyExpenses}>
              ${formatNumber(property.expenses)} expensas
            </p>
          )}
          <Link
            className={styles.propertyContactCta}
            href={`/contact?propertyId=${property.id}`}
          >
            Contactar
            <i className="ic ic-envelope" />
          </Link>
        </div>
      </div>
      {property.description && (
        <article className={styles.propertyDescription}>
          <RichText content={property.description.raw} />
        </article>
      )}
      {property.location && (
        <Map
          lat={property.location.latitude}
          lng={property.location.longitude}
        />
      )}
    </section>
  );
};
