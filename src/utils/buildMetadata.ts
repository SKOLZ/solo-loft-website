import type { Metadata } from "next/types";
import type { OpenGraphType } from "next/dist/lib/metadata/types/opengraph-types";
import { SEO_CONFIG } from "./seoConfig";
import { SeoFragment } from "@/generated/graphql";

export type SeoMetadata = Metadata &
  SeoFragment & { type?: OpenGraphType; publishedTime?: string };

export const buildMetadata = async (
  seo: SeoMetadata,
  currentPath: string,
  relatedProperty?: {
    imageUrl: string;
    transactionType: string;
    imageWidth: number;
    imageHeight: number;
  },
): Promise<Metadata> => {
  const {
    title: seoTitle,
    description: seoDescription,
    image,
    type = "website",
  } = seo;

  const title = seoTitle || SEO_CONFIG.title;
  const description = seoDescription || SEO_CONFIG.description;

  let ogImage: string;
  let ogImageWidth: number;
  let ogImageHeight: number;
  let ogMimeType: string;

  if (image) {
    ogImage = image.url;
    ogImageWidth = image.width || SEO_CONFIG.openGraphImage.width;
    ogImageHeight = image.height || SEO_CONFIG.openGraphImage.height;
    ogMimeType = image.mimeType || SEO_CONFIG.openGraphImage.type;
  } else {
    const searchParams = new URLSearchParams({
      title,
      ...(relatedProperty?.imageUrl && { image: relatedProperty.imageUrl }),
      ...(relatedProperty?.transactionType && {
        transactionType: relatedProperty.transactionType,
      }),
      ...(relatedProperty?.imageWidth && {
        imageW: relatedProperty.imageWidth.toString(),
      }),
      ...(relatedProperty?.imageHeight && {
        imageH: relatedProperty.imageHeight.toString(),
      }),
    });

    const generatedImage =
      process.env.NODE_ENV === "production"
        ? `/api/og_image?${searchParams.toString()}`
        : `http://localhost:3000/api/og_image?${searchParams.toString()}`;
    ogImage = generatedImage;
    ogImageWidth = SEO_CONFIG.openGraphImage.width;
    ogImageHeight = SEO_CONFIG.openGraphImage.height;
    ogMimeType = SEO_CONFIG.openGraphImage.type;
  }

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
