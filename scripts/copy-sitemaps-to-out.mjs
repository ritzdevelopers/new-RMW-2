import fs from "fs";
import path from "path";
import { createRequire } from "module";

const require = createRequire(import.meta.url);
const { SITEMAP_INDEX_FILES } = require("../next-sitemap.shared.js");

const publicDir = path.join(process.cwd(), "public");
const outDir = path.join(process.cwd(), "out");

const files = ["sitemap.xml", ...SITEMAP_INDEX_FILES];

function copySitemaps() {
  if (!fs.existsSync(outDir)) {
    console.warn("[copy-sitemaps-to-out] out/ missing; skipping (run after next build)");
    return;
  }

  let copied = 0;

  for (const file of files) {
    const source = path.join(publicDir, file);
    const target = path.join(outDir, file);

    if (!fs.existsSync(source)) {
      console.warn(`[copy-sitemaps-to-out] Missing ${file}; skipping`);
      continue;
    }

    fs.copyFileSync(source, target);
    copied += 1;
  }

  console.log(`[copy-sitemaps-to-out] Copied ${copied} sitemap file(s) to out/`);

  writeServeJson(outDir);
}

function writeServeJson(outDir) {
  const serveConfig = {
    headers: [
      {
        source: "/_next/static/**",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "/fonts/**",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        source: "**/*.{jpg,jpeg,png,webp,gif,svg,ico,woff,woff2,otf,mp4}",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=2592000, stale-while-revalidate=86400",
          },
        ],
      },
    ],
  };

  fs.writeFileSync(
    path.join(outDir, "serve.json"),
    `${JSON.stringify(serveConfig, null, 2)}\n`,
  );
  console.log("[copy-sitemaps-to-out] Wrote serve.json cache headers to out/");
}

copySitemaps();
