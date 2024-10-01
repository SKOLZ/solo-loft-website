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
import { Carousel } from "@/app/_components/Carousel";
import { Map } from "./_components/Map";

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
      <Link className={styles.propertyBackLink} href="/properties">
        <i className="ic ic-chevron-left" />
        Volver al listado
      </Link>
      <section className={styles.propertyContainer}>
        <div className={styles.propertyInfoContainer}>
          <Carousel className={styles.propertyPhotos}>
            <Image
              className={styles.propertyPhoto}
              width={500}
              height={375}
              src={property.photos[0].url}
              alt=""
            />
          </Carousel>
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
    </>
  );
};

export default PropertyDetailsPage;
