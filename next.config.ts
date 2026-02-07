import { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "*.graphassets.com",
        port: "",
        pathname: "/**",
      },
    ],
  },
  redirects: () => {
    return [
      {
        source: "/",
        destination: "/properties",
        permanent: true,
      },
    ];
  },
  experimental: {
    viewTransition: true,
  },
  sassOptions: {
    silenceDeprecations: ["legacy-js-api"],
  },
  turbopack: {
    rules: {
      "*.svg": {
        loaders: ["@svgr/webpack"],
        as: "*.js",
      },
    },
  },
};

export default nextConfig;
