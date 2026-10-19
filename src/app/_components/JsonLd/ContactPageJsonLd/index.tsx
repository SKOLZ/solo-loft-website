import type { ContactPage, WithContext } from "schema-dts";
import { ORGANIZATION_ID, SITE_URL } from "@/utils/structuredData";
import { JsonLd } from "../utils";

const buildContactPageGraph = (): WithContext<ContactPage> => ({
  "@context": "https://schema.org",
  "@type": "ContactPage",
  "@id": `${SITE_URL}/contact#webpage`,
  url: `${SITE_URL}/contact`,
  name: "Contacto",
  inLanguage: "es-AR",
  mainEntity: { "@id": ORGANIZATION_ID },
});

export const ContactPageJsonLd: React.FC = () => {
  return <JsonLd data={buildContactPageGraph()} />;
};
