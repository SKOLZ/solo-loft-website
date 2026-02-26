import { NextRequest } from "next/server";
import { ImageResponse } from "next/og";
import { SEO_CONFIG } from "@/utils/seoConfig";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

function splitGraphAssetUrl(url: string): { baseUrl: string; handle: string } {
  const lastSlashIndex = url.lastIndexOf("/");
  const baseUrl = url.substring(0, lastSlashIndex + 1);
  const handle = url.substring(lastSlashIndex + 1);
  return { baseUrl, handle };
}

// Image generation
export async function GET(context: NextRequest) {
  const { searchParams } = context.nextUrl;
  const title = searchParams.get("title");
  const propertyImage = searchParams.get("image");
  const propertyImageWidth = parseInt(searchParams.get("imageW") ?? "");
  const propertyImageHeight = parseInt(searchParams.get("imageH") ?? "");
  const propertyTransactionType = searchParams.get("transactionType");

  const isPropertyImage =
    propertyImage &&
    propertyTransactionType &&
    propertyImageWidth &&
    propertyImageHeight;

  const isHorizontalImage =
    propertyImageWidth &&
    propertyImageHeight &&
    propertyImageWidth >= propertyImageHeight;

  const requestBaseUrl = `${context.nextUrl.protocol}//${context.nextUrl.host}`;

  let propertyFormattedImage;
  if (propertyImage) {
    const { baseUrl, handle } = splitGraphAssetUrl(propertyImage);
    propertyFormattedImage = `${baseUrl}output=format:jpg/${handle}`;
  }

  const poppinsFont = await readFile(
    join(process.cwd(), "public/Poppins-SemiBold.ttf"),
  );

  return new ImageResponse(
    <>
      <div
        style={{
          backgroundImage: `url(${requestBaseUrl}${SEO_CONFIG.openGraphImage.bg})`,
          padding: "60px",
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          minHeight: "100%",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: isPropertyImage ? "flex-start" : "center",
            gap: "20px",
            flex: "1",
            wordBreak: "break-word",
          }}
        >
          {propertyTransactionType && (
            <p
              style={{
                fontSize: "2.5rem",
                lineHeight: "3.75rem",
                padding: "0 16px",
                backgroundColor:
                  propertyTransactionType === "sale"
                    ? "rgba(144, 76, 76, 0.3)"
                    : "rgba(76, 95, 144, 0.3)",
                color: "#fff",
                borderRadius: "8px",
                border: `1px solid ${propertyTransactionType === "sale" ? "#610000" : "#002761"}`,
              }}
            >
              {propertyTransactionType.toUpperCase()}
            </p>
          )}
          <h1
            style={{
              fontSize: "6.25rem",
              lineHeight: "7.5rem",
              letterSpacing: "2px",
              color: "#fff",
              fontFamily: "Poppins, sans-serif",
              textTransform: "uppercase",
              textAlign: isPropertyImage ? "left" : "center",
            }}
          >
            {title}
          </h1>
        </div>
        {propertyFormattedImage &&
          propertyImageWidth &&
          propertyImageHeight && (
            <div
              style={{
                display: "flex",
                flex: "1",
                alignItems: "center",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element*/}
              <img
                src={propertyFormattedImage}
                alt="Property"
                style={{
                  width: `${
                    isHorizontalImage
                      ? 580
                      : (600 * propertyImageWidth) / propertyImageHeight
                  }px`,
                  height: `${
                    isHorizontalImage
                      ? (580 * propertyImageHeight) / propertyImageWidth
                      : 600
                  }px`,
                  borderRadius: "8px",
                  backgroundColor: "red",
                }}
              />
            </div>
          )}
      </div>
    </>,
    {
      width: SEO_CONFIG.openGraphImage.width,
      height: SEO_CONFIG.openGraphImage.height,
      fonts: [
        {
          name: "Poppins",
          data: poppinsFont,
          style: "normal",
          weight: 600,
        },
      ],
    },
  );
}
