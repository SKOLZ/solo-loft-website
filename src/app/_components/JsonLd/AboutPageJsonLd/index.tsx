import type { AboutPage, WithContext } from "schema-dts";
import { ORGANIZATION_ID, SITE_URL } from "@/utils/structuredData";
import { JsonLd } from "../utils";

const buildAboutPageGraph = (): WithContext<AboutPage> => ({
  "@context": "https://schema.org",
  "@type": "AboutPage",
  "@id": `${SITE_URL}/about-us#webpage`,
  url: `${SITE_URL}/about-us`,
  name: "Sobre nosotros",
  inLanguage: "es-AR",
  mainEntity: { "@id": ORGANIZATION_ID },
});

export const AboutPageJsonLd: React.FC = () => {
  return <JsonLd data={buildAboutPageGraph()} />;
};
