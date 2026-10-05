import {
  getAllPropertyIdentifiers,
  getPropertyDetails,
} from "@/services/properties";
import { notFound } from "next/navigation";
import { districtTextMap } from "@/utils/districtTextMap";

import { buildMetadata } from "@/utils/buildMetadata";
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
  const properties = await getAllPropertyIdentifiers();
  return properties.map((property) => ({
    slug: property.slug,
  }));
};

const AdPropertyDetailsPage: React.FC<Props> = async (props) => {
  const params = await props.params;
  const property = await getPropertyDetails(params.slug!);

  if (!property) {
    return notFound();
  }

  return <PropertyLayout property={property} />;
};

export default AdPropertyDetailsPage;
