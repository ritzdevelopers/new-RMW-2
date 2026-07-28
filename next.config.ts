import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

const API_BASE =
  process.env.API_BASE_URL ||
  process.env.NEXT_PUBLIC_API_BASE_URL ||
  "https://ritzmediaworld.com";
const configDir = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  // Static export only for production builds. In `next dev` + Turbopack,
  // `output: "export"` throws if you hit any dynamic path not yet listed in
  // generateStaticParams (error: missing param "/[slug]").
  ...(process.env.NODE_ENV === "production" ? { output: "export" as const } : {}),
  images: {
    unoptimized: true,
  },
  turbopack: {
    root: configDir,
  },
  async rewrites() {
    return [
      {
        source: "/api/:path*",
        destination: `${API_BASE}/api/:path*`,
      },
    ];
  },
};

export default nextConfig;
