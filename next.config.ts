import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.licdn.com",
      },
      {
        protocol: "https",
        hostname: "static.licdn.com",
      },
      {
        protocol: "https",
        hostname: "www.linkedin.com",
      },
      {
        protocol: "https",
        hostname: "velox-images-bucket.s3.sa-east-1.amazonaws.com",
        pathname: "/public/mwolfc/**",
      },
    ],
  },
};

export default nextConfig;
