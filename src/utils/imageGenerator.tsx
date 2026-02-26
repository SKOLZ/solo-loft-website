import { ImageResponse } from "next/og";
import { SEO_CONFIG } from "./seoConfig";
import { readFile } from "node:fs/promises";
import { join } from "node:path";

export const generatenateDefaultImage = async (title: string) => {
  const poppinsFont = await readFile(join(process.cwd(), "assets/Poppins.ttf"));

  return new ImageResponse(
    <>
      <div
        style={{
          backgroundImage: `url(${SEO_CONFIG.openGraphImage.bg})`,
          padding: "60px",
          backgroundSize: "cover",
          backgroundRepeat: "no-repeat",
          backgroundPosition: "center",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          minHeight: "100%",
        }}
      >
        <h1
          style={{
            fontSize: "4rem",
            lineHeight: "4.3rem",
            letterSpacing: "-0.08rem",
            color: "#fff",
            fontFamily: "Poppins, sans-serif",
            textTransform: "uppercase",
          }}
        >
          {title}
        </h1>
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
};

export const generateImageForProperty = (property: { address: string }) => {
  return generatenateDefaultImage(property.address);
};
