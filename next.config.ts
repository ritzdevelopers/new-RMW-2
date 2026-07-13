import type { NextConfig } from "next";
import path from "path";
import { fileURLToPath } from "url";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL || "https://ritzmediaworld.com";
const configDir = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  output: "export",
  images: {
    unoptimized: true,
  },
  // Prevent Turbopack from using C:\Users\nishi as root (extra lockfile there).
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
