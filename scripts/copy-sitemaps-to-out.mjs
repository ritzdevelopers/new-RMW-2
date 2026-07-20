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
}

copySitemaps();
