import {
  getAllPropertyIdentifiers,
  getPropertyDetails,
} from "@/services/properties";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "./styles.module.scss";
import { districtTextMap } from "@/utils/districtTextMap";

import { buildMetadata } from "@/utils/buildMetadata";
import { delay } from "@/utils/delay";
import { transactionTypeTextMap } from "@/app/_components/TransactionTypeTag/utils";
import { PropertyLayout } from "@/app/_components/PropertyLayout";

interface Props {
  params: Promise<{
    slug?: string;
  }>;
}

export const generateMetadata = async (props: Props) => {
  const params = await props.params;
  const property = await getPropertyDetails(params.slug!);

  if (!property) {
    return null;
  }

  let seo = property.seo || {
    title: property.address,
    description: `Propiedad en ${transactionTypeTextMap[property.transactionType]} en ${property.address}, ${property.district ? districtTextMap[property.district] : "Capital Federal"}.`,
  };

  if (property.photos?.[0]) {
    return buildMetadata(seo, `/properties/${params.slug}`, {
      imageUrl: property.photos[0].url,
      transactionType: property.transactionType,
      imageWidth: property.photos[0].width || 580,
      imageHeight: property.photos[0].height || 580,
    });
  } else {
    return buildMetadata(seo, `/properties/${params.slug}`);
  }
};

export const generateStaticParams = async () => {
  await delay(200);
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
      <PropertyLayout property={property} />
    </>
  );
};

export default PropertyDetailsPage;
