import { join } from "path";
import { getAllPropertiesSitemapData } from "@/services/properties";
import { buildSitemapXml, SitemapField, withBaseUrl } from "@/utils/sitemap";

const localPages = ["properties", "about-us", "contact"];

export async function GET() {
  const localPagesData: SitemapField[] = localPages.map((slug) => ({
    loc: withBaseUrl(slug),
  }));

  const propertySitemapData = await getAllPropertiesSitemapData();
  const propertiesData: SitemapField[] = propertySitemapData.map((item) => ({
    loc: withBaseUrl(join("properties", item.slug)),
    lastmod: item.updatedAt,
  }));

  const data = buildSitemapXml([...localPagesData, ...propertiesData]);

  const headers = new Headers();
  headers.append("Content-Type", "text/xml");
  headers.append(
    "Cache-Control",
    "s-maxage=2592000, stale-while-revalidate=86400",
  );

  return new Response(data, { headers });
}
