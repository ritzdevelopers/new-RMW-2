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
      {
        source: "/api/my-sql/find-blogs-using-key/:keyword*",
        destination: `${API_BASE}/api/my-sql/find-blogs-using-key/:keyword*`,
      },
      {
        source: "/api/blog/categories",
        destination: `${API_BASE}/api/blog/categories`,
      },
      {
        source: "/api/blog/:slug*",
        destination: `${API_BASE}/api/blog/:slug*`,
      },
      {
        source: "/api/get_all_blogs",
        destination: `${API_BASE}/api/get_all_blogs`,
      },
      {
        source: "/api/ritz_blogs/get-single-blog/:slug*",
        destination: `${API_BASE}/api/ritz_blogs/get-single-blog/:slug*`,
      },
    ];
  },
};

export default nextConfig;
