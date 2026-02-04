export type SitemapField = {
  loc: string;
  lastmod?: string;
};

/**
 * Returns sitemap
 *
 * @param fields SitemapField[]
 * @returns string
 */
export function buildSitemapXml(fields: SitemapField[]) {
  const output: string[] = [];

  fields.forEach((fieldItem) => {
    const fieldNode: string[] = [];

    for (const key of Object.keys(fieldItem)) {
      fieldNode.push(
        `<${key}>${fieldItem[key as keyof SitemapField]}</${key}>`,
      );
    }

    output.push(`<url>${fieldNode.join(``)}</url>`);
  });

  const result = output.join("");

  return `<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${result}</urlset>`;
}

/**
 * Adds base URL to a pathname
 *
 * @param path string
 * @returns string
 */
export function withBaseUrl(path: string) {
  const _path = path.startsWith("/") ? path.slice(1) : path;

  return `https://solo-loft.com.ar/${_path}`;
}
