export const SITE_URL = "https://solo-loft.com.ar";

export const ORGANIZATION_ID = `${SITE_URL}/#organization`;

type UnknownRecord = Record<string, unknown>;

/**
 * Serializes a JSON-LD payload for `dangerouslySetInnerHTML`, escaping the
 * characters that could break out of an inline `<script>` element.
 */
export const serializeJsonLd = (data: unknown): { __html: string } => ({
  __html: JSON.stringify(data)
    .replace(/</g, "\\u003c")
    .replace(/>/g, "\\u003e")
    .replace(/&/g, "\\u0026")
    .replace(/\u2028/g, "\\u2028")
    .replace(/\u2029/g, "\\u2029"),
});

const collectRichText = (node: unknown, parts: string[]): void => {
  if (node === null || node === undefined) {
    return;
  }

  if (typeof node === "string") {
    parts.push(node);
    return;
  }

  if (Array.isArray(node)) {
    node.forEach((child) => collectRichText(child, parts));
    return;
  }

  if (typeof node !== "object") {
    return;
  }

  const record = node as UnknownRecord;

  if (typeof record.text === "string") {
    parts.push(record.text);
  }

  if (record.children) {
    collectRichText(record.children, parts);
  }
};

/**
 * Walks a Hygraph rich-text `raw` value and returns its plain text content.
 * Tolerates the raw value being a JSON string or an unknown node shape.
 */
export const richTextToPlainText = (raw: unknown): string => {
  let value: unknown = raw;

  if (typeof value === "string") {
    try {
      value = JSON.parse(value);
    } catch {
      value = raw;
    }
  }

  const parts: string[] = [];
  collectRichText(value, parts);

  return parts.join(" ").replace(/\s+/g, " ").trim();
};
