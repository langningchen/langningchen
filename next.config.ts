import type { NextConfig } from "next";
import { initOpenNextCloudflareForDev } from "@opennextjs/cloudflare";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        hostname: "enka.network",
        pathname: "/ui/**",
        protocol: "https",
      },
      {
        hostname: "raw.githubusercontent.com",
        pathname: "/langningchen/langningchen/**",
        protocol: "https",
      },
    ],
    unoptimized: true,
  },
  reactStrictMode: true,
  trailingSlash: true,
  typedRoutes: true,
};

export default nextConfig;

initOpenNextCloudflareForDev();
