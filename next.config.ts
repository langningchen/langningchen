import type { NextConfig } from "next";

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
  output: "export",
  reactStrictMode: true,
  trailingSlash: true,
  typedRoutes: true,
};

export default nextConfig;
