import type { NextConfig } from "next";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "https://ritzmediaworld.com";

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  async rewrites() {
    return [
      {
        source: "/api/category/case-study",
        destination: `${API_BASE}/api/category/case-study`,
      },
    ];
  },
};

export default nextConfig;
