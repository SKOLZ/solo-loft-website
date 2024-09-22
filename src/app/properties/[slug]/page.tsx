import { RichText } from "@graphcms/rich-text-react-renderer";
import { PropertyFeatures } from "@/app/_components/PropertyFeatures";
import { TransactionTypeTag } from "@/app/_components/TransactionTypeTag";
import { getPropertyDetails } from "@/services/properties";
import { formatNumber } from "@/utils/formatNumber";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "./styles.module.scss";
import { districtTextMap } from "@/utils/districtTextMap";

interface Props {
  params: {
    slug?: string;
  };
}

const PropertyDetailsPage: React.FC<Props> = async ({ params }) => {
  const property = await getPropertyDetails(params.slug!);

  if (!property) {
    return notFound();
  }
  return (
    <>
      <Link href="/properties">Volver al listado</Link>
      <section className={styles.propertyContainer}>
        <div className={styles.propertyInfoContainer}>
          <Image
            className={styles.propertyPhotos}
            width={500}
            height={375}
            src={property.photos[0].url}
            alt=""
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
            </Link>
          </div>
        </div>
        {property.description && (
          <article className={styles.propertyDescription}>
            <RichText
              content={property.description.raw}
              renderers={{
                h3: ({ children }) => (
                  <h3 className={styles.propertyDescriptionTitle}>
                    {children}
                  </h3>
                ),
                p: ({ children }) => (
                  <p className={styles.propertyDescriptionText}>{children}</p>
                ),
              }}
            />
          </article>
        )}
        {/* google maps */}
      </section>
    </>
  );
};

export default PropertyDetailsPage;
