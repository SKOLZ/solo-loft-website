import { RichText } from "@graphcms/rich-text-react-renderer";
import { PropertyFeatures } from "@/app/_components/PropertyFeatures";
import { TransactionTypeTag } from "@/app/_components/TransactionTypeTag";
import {
  getAllPropertyIdentifiers,
  getPropertyDetails,
} from "@/services/properties";
import { formatNumber } from "@/utils/formatNumber";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "./styles.module.scss";
import { districtTextMap } from "@/utils/districtTextMap";

import { PropertyAssetsViewer } from "./_components/PropertyAssetsViewer";
import { buildMetadata } from "@/utils/buildMetadata";
import { MapWrapper } from "./_components/MapWrapper";
import { Suspense } from "react";

interface Props {
  params: Promise<{
    slug?: string;
  }>;
}

export const generateMetadata = async (props: Props) => {
  const params = await props.params;
  const property = await getPropertyDetails(params.slug!);

  if (!property?.seo) {
    return null;
  }

  return buildMetadata(property.seo, `/properties/${params.slug}`);
};

export const generateStaticParams = async () => {
  const properties = await getAllPropertyIdentifiers();
  return properties.map((property) => ({
    slug: property.slug,
  }));
};

const PropertyDetailsPage: React.FC<Props> = async (props) => {
  const params = await props.params;
  const property = await getPropertyDetails(params.slug!);

  if (!property) {
    return notFound();
  }

  return (
    <>
      <Link className={styles.propertyBackLink} href="/properties">
        <i className="ic ic-chevron-left" />
        Volver al listado
      </Link>
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
          <Suspense fallback={<div>Cargando mapa...</div>}>
            <MapWrapper
              lat={property.location.latitude}
              lng={property.location.longitude}
            />
          </Suspense>
        )}
      </section>
    </>
  );
};

export default PropertyDetailsPage;
