import {
  TransactionType,
  type PropertySummaryFragment,
} from "@/generated/graphql";
import { getContactInformation } from "@/services/contactInformation";
import { getAllProperties } from "@/services/properties";
import { districtTextMap } from "@/utils/districtTextMap";
import { SITE_URL } from "@/utils/structuredData";

const priceFormatter = new Intl.NumberFormat("es-AR");

const transactionTypeLabel = (transactionType: TransactionType): string =>
  transactionType === TransactionType.Rent ? "alquiler" : "venta";

const buildPropertyLine = (property: PropertySummaryFragment): string => {
  const title = property.district
    ? `${property.address}, ${districtTextMap[property.district]}`
    : property.address;

  const details = [transactionTypeLabel(property.transactionType)];

  if (property.cost != null && property.costCurrency) {
    details.push(
      `${property.costCurrency.toUpperCase()} ${priceFormatter.format(property.cost)}`,
    );
  }

  if (property.meters != null) {
    details.push(`${property.meters} m²`);
  }

  return `- [${title}](${SITE_URL}/properties/${property.slug}): ${details.join(" — ")}`;
};

export async function GET() {
  const [properties, contact] = await Promise.all([
    getAllProperties(),
    getContactInformation(),
  ]);

  const propertyLines = properties.map(buildPropertyLine);

  const pageLines = [
    `- [Propiedades](${SITE_URL}/properties): listado completo con fotos y detalles`,
    `- [Sobre nosotros](${SITE_URL}/about-us): información sobre la empresa`,
    `- [Contacto](${SITE_URL}/contact): formulario y datos de contacto`,
  ];

  const contactLines = [
    contact?.email ? `- Email: ${contact.email}` : null,
    contact?.phone ? `- Teléfono: ${contact.phone}` : null,
    contact?.address ? `- Dirección: ${contact.address}` : null,
  ].filter((line): line is string => line !== null);

  const contactSection = contactLines.length
    ? `## Contacto\n\n${contactLines.join("\n")}`
    : "## Contacto";

  const body =
    [
      "# Solo Loft",
      "> Solo Loft es un sitio de propiedades en venta y alquiler en Buenos Aires, con apartamentos, casas y espacios comerciales. Publicamos anuncios con información detallada, fotos y datos de ubicación en Belgrano Chico, Colegiales, Palermo Hollywood, Parque Patricios (CABA) y San Isidro (Buenos Aires).",
      `## Propiedades\n\n${propertyLines.join("\n")}`,
      `## Páginas\n\n${pageLines.join("\n")}`,
      contactSection,
    ].join("\n\n") + "\n";

  const headers = new Headers();
  headers.append("Content-Type", "text/plain; charset=utf-8");
  headers.append(
    "Cache-Control",
    "s-maxage=2592000, stale-while-revalidate=86400",
  );

  return new Response(body, { headers });
}
