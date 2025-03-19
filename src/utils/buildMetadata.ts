import type { Metadata } from "next/types";
import type { OpenGraphType } from "next/dist/lib/metadata/types/opengraph-types";
import { SEO_CONFIG } from "./seoConfig";
import { SeoFragment } from "@/generated/graphql";

export type SeoMetadata = Metadata &
  SeoFragment & { type?: OpenGraphType; publishedTime?: string };

export const buildMetadata = (
  seo: SeoMetadata,
  currentPath: string
): Metadata => {
  const {
    title: seoTitle,
    description: seoDescription,
    image,
    publishedTime,
    type = "website",
  } = seo;

  const title = seoTitle || SEO_CONFIG.title;
  const description = seoDescription || SEO_CONFIG.description;

  // Image
  const ogImage = image?.url || "";
  const ogImageWidth = image?.width || "";
  const ogImageHeight = image?.height || "";
  const ogMimeType = image?.mimeType || "";

  return {
    metadataBase: new URL("https://solo-loft.com.ar"),
    title: `${title} | Solo Loft`,
    description,
    referrer: "no-referrer-when-downgrade",
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ogImage,
    },
    openGraph: {
      url: currentPath,
      title,
      description,
      publishedTime,
      type,
      images: [
        {
          url: ogImage,
          width: ogImageWidth,
          height: ogImageHeight,
          type: ogMimeType,
        },
      ],
      locale: "es_AR",
    },
  };
};
