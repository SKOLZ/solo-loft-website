import { NextConfig } from "next";

const nextConfig: NextConfig = {
  cacheComponents: true,
  images: {
    minimumCacheTTL: 2678400,
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
