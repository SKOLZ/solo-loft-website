import type { PropertySummaryFragment } from "@/generated/graphql";
import type {
  CollectionPage,
  ItemList,
  ListItem,
  WithContext,
} from "schema-dts";
import { SITE_URL } from "@/utils/structuredData";
import { districtTextMap } from "@/utils/districtTextMap";
import { SEO_CONFIG } from "@/utils/seoConfig";
import { JsonLd } from "../utils";

const buildListingGraph = (
  properties: PropertySummaryFragment[],
): WithContext<CollectionPage> => {
  const itemListElement: ListItem[] = properties.map(
    (property, index): ListItem => ({
      "@type": "ListItem",
      position: index + 1,
      url: `${SITE_URL}/properties/${property.slug}`,
      name: property.district
        ? `${property.address}, ${districtTextMap[property.district]}`
        : property.address,
    }),
  );

  const mainEntity: ItemList = {
    "@type": "ItemList",
    "@id": `${SITE_URL}/properties#list`,
    itemListElement,
  };

  return {
    "@context": "https://schema.org",
    "@type": "CollectionPage",
    "@id": `${SITE_URL}/properties#collection`,
    url: `${SITE_URL}/properties`,
    name: SEO_CONFIG.title,
    description: SEO_CONFIG.description,
    inLanguage: "es-AR",
    mainEntity,
  };
};

interface Props {
  properties: PropertySummaryFragment[];
}

export const PropertiesJsonLd: React.FC<Props> = ({ properties }) => {
  return <JsonLd data={buildListingGraph(properties)} />;
};
