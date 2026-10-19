import {
  FeatureType,
  TransactionType,
  type District,
  type FeatureFragment,
  type PropertyFragment,
} from "@/generated/graphql";
import { getFeatureText } from "@/app/_components/PropertyFeatures/_components/PropertyFeature/utils";
import type {
  Accommodation,
  BreadcrumbList,
  BusinessFunction,
  GeoCoordinates,
  ListItem,
  LocationFeatureSpecification,
  Offer,
  PostalAddress,
  RealEstateListing,
  WithContext,
} from "schema-dts";
import { richTextToPlainText, SITE_URL } from "@/utils/structuredData";
import { districtTextMap } from "@/utils/districtTextMap";
import { JsonLd } from "../utils";

const districtRegionMap: Record<District, string> = {
  belgranoChicoCapitalFederal: "Ciudad Autónoma de Buenos Aires",
  colegialesCapitalFederal: "Ciudad Autónoma de Buenos Aires",
  palermoHollywoodCapitalFederal: "Ciudad Autónoma de Buenos Aires",
  parquePatriciosCapitalFederal: "Ciudad Autónoma de Buenos Aires",
  sanIsidroBuenosAires: "Provincia de Buenos Aires",
};

/**
 * schema-dts models schema.org enumerations as object leaves, but the
 * GoodRelations business function values are documented URI literals. Keep the
 * wire value and narrow it to the schema-dts shape.
 */
const goodRelationsBusinessFunction = (value: string): BusinessFunction =>
  value as unknown as BusinessFunction;

const findFeature = (
  features: FeatureFragment[],
  type: FeatureType,
): FeatureFragment | undefined =>
  features.find((feature) => feature.type === type);

const buildPropertyGraph = (
  property: PropertyFragment,
  slug: string,
): WithContext<RealEstateListing> => {
  const pageUrl = `${SITE_URL}/properties/${slug}`;
  const listingId = `${pageUrl}#listing`;
  const accommodationId = `${listingId}#accommodation`;
  const description = property.description?.raw
    ? richTextToPlainText(property.description.raw)
    : "";

  const amenityFeature: LocationFeatureSpecification[] = [];

  const garages = findFeature(property.features, FeatureType.Garages);
  if (garages) {
    amenityFeature.push({
      "@type": "LocationFeatureSpecification",
      name: "Cochera",
      value: true,
    });
  }

  const luminosity = findFeature(property.features, FeatureType.Luminosity);
  const luminosityText = luminosity ? getFeatureText(luminosity) : "";
  if (luminosityText) {
    amenityFeature.push({
      "@type": "LocationFeatureSpecification",
      name: luminosityText,
      value: true,
    });
  }

  const orientation = findFeature(property.features, FeatureType.Orientation);
  const orientationText = orientation ? getFeatureText(orientation) : "";
  if (orientationText) {
    amenityFeature.push({
      "@type": "LocationFeatureSpecification",
      name: orientationText,
      value: true,
    });
  }

  const rooms = findFeature(property.features, FeatureType.Rooms)?.amount;
  const bedrooms = findFeature(property.features, FeatureType.Bedrooms)?.amount;
  const bathrooms = findFeature(
    property.features,
    FeatureType.Bathrooms,
  )?.amount;

  const address: PostalAddress = {
    "@type": "PostalAddress",
    streetAddress: property.address,
    ...(property.district
      ? {
          addressLocality: districtTextMap[property.district],
          addressRegion: districtRegionMap[property.district],
        }
      : {}),
    addressCountry: "AR",
  };

  const geo: GeoCoordinates | undefined = property.location
    ? {
        "@type": "GeoCoordinates",
        latitude: property.location.latitude,
        longitude: property.location.longitude,
      }
    : undefined;

  const accommodation: Accommodation = {
    "@type": "Accommodation",
    "@id": accommodationId,
    address,
    ...(geo ? { geo } : {}),
    floorSize: {
      "@type": "QuantitativeValue",
      value: property.meters,
      unitCode: "MTK",
    },
    ...(rooms != null ? { numberOfRooms: rooms } : {}),
    ...(bedrooms != null ? { numberOfBedrooms: bedrooms } : {}),
    ...(bathrooms != null ? { numberOfBathroomsTotal: bathrooms } : {}),
    ...(amenityFeature.length ? { amenityFeature } : {}),
  };

  const offers: Offer = {
    "@type": "Offer",
    url: pageUrl,
    price: property.cost,
    priceCurrency: property.costCurrency.toUpperCase(),
    availability: "https://schema.org/InStock",
    businessFunction: goodRelationsBusinessFunction(
      property.transactionType === TransactionType.Rent
        ? "http://purl.org/goodrelations/v1#LeaseOut"
        : "http://purl.org/goodrelations/v1#Sell",
    ),
    itemOffered: { "@id": accommodationId },
  };

  return {
    "@context": "https://schema.org",
    "@type": "RealEstateListing",
    "@id": listingId,
    url: pageUrl,
    name: property.address,
    ...(description ? { description } : {}),
    inLanguage: "es-AR",
    ...(property.photos.length
      ? { image: property.photos.map((photo) => photo.url) }
      : {}),
    ...(property.publishedAt ? { datePosted: property.publishedAt } : {}),
    ...(property.updatedAt ? { dateModified: property.updatedAt } : {}),
    about: accommodation,
    offers,
  };
};

const buildBreadcrumbGraph = (
  address: string,
  slug: string,
): WithContext<BreadcrumbList> => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [
    {
      "@type": "ListItem",
      position: 1,
      name: "Propiedades",
      item: `${SITE_URL}/properties`,
    },
    {
      "@type": "ListItem",
      position: 2,
      name: address,
      item: `${SITE_URL}/properties/${slug}`,
    },
  ],
});

interface Props {
  property: PropertyFragment;
  slug: string;
}

export const PropertyJsonLd: React.FC<Props> = ({ property, slug }) => {
  return (
    <>
      <JsonLd data={buildPropertyGraph(property, slug)} />
      <JsonLd data={buildBreadcrumbGraph(property.address, slug)} />
    </>
  );
};
