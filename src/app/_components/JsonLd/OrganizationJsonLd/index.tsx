import type { ContactInformationFragment } from "@/generated/graphql";
import type {
  ContactPoint,
  Graph,
  PostalAddress,
  RealEstateAgent,
  WebSite,
} from "schema-dts";
import { ORGANIZATION_ID, SITE_URL } from "@/utils/structuredData";
import { districtTextMap } from "@/utils/districtTextMap";
import { JsonLd } from "../utils";

const WEBSITE_ID = `${SITE_URL}/#website`;

/**
 * `Graph` already pins `"@context": "https://schema.org"`. schema-dts 2.1.0's
 * `WithContext<T>` requires a `JsonLdObject` (`"@type"`), which a graph does not
 * have, so `WithContext<Graph>` does not type-check; `Graph` is the closest type.
 */
const buildOrganizationGraph = (
  contact?: ContactInformationFragment | null,
): Graph => {
  const contactAddress: PostalAddress | undefined = contact?.address
    ? {
        "@type": "PostalAddress",
        streetAddress: contact.address,
      }
    : undefined;

  const contactPoint: ContactPoint = {
    "@type": "ContactPoint",
    contactType: "sales",
    ...(contact?.email ? { email: contact.email } : {}),
    ...(contact?.phone ? { telephone: contact.phone } : {}),
    availableLanguage: ["es"],
  };

  const organization: RealEstateAgent = {
    "@type": "RealEstateAgent",
    "@id": ORGANIZATION_ID,
    name: "Solo Loft",
    url: `${SITE_URL}/`,
    ...(contact?.email ? { email: contact.email } : {}),
    ...(contact?.phone ? { telephone: contact.phone } : {}),
    ...(contactAddress ? { address: contactAddress } : {}),
    areaServed: Object.values(districtTextMap),
    contactPoint,
  };

  const website: WebSite = {
    "@type": "WebSite",
    "@id": WEBSITE_ID,
    name: "Solo Loft",
    url: `${SITE_URL}/`,
    inLanguage: "es-AR",
    publisher: { "@id": ORGANIZATION_ID },
  };

  return {
    "@context": "https://schema.org",
    "@graph": [organization, website],
  };
};

interface Props {
  contact?: ContactInformationFragment | null;
}

export const OrganizationJsonLd: React.FC<Props> = ({ contact }) => {
  return <JsonLd data={buildOrganizationGraph(contact)} />;
};
