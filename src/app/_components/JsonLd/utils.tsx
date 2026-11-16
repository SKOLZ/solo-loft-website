import { serializeJsonLd } from "@/utils/structuredData";

interface Props {
  data: unknown;
}

export const JsonLd: React.FC<Props> = ({ data }) => {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={serializeJsonLd(data)}
    />
  );
};
