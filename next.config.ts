import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "media.dickies.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
