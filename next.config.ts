import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "dyyhnhseuvbmoiqcdbsj.supabase.co",
      },
    ],
  },
};

export default nextConfig;
