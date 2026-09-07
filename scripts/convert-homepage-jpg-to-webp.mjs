import fs from "node:fs";
import path from "node:path";
import sharp from "sharp";

const root = path.resolve("public");

const files = [
  "loder/loader_i1.jpg",
  "loder/loader_i2.jpg",
  "loder/loader_i3.jpg",
  "loder/loader_i4.jpg",
  "loder/loader_i6.jpg",
  "home/gulshan_optim.jpg",
  "home/vedvan.jpg",
  "home/exotica.jpg",
  "home/lumora_optim.jpg",
  "home/SANSKAR.jpg",
  "home/vvip.jpg",
  "home/GHD.jpg",
  "home/mansha.jpg",
  "home/FAIRFOX.jpg",
  "home/Eldeco.jpg",
  "home/Eon-by-fairfox.jpg",
  "home/Madhusudan-Ghee.jpg",
  "home/Escorts-Tractor.jpg",
  "service/website banner [Recovered]-01.jpg",
];

async function encodeWebp(input, output, quality) {
  await sharp(input)
    .webp({ quality, effort: 6, smartSubsample: true })
    .toFile(output);
  return fs.statSync(output).size;
}

let before = 0;
let after = 0;

for (const rel of files) {
  const input = path.join(root, rel);
  const output = input.replace(/\.jpe?g$/i, ".webp");

  if (!fs.existsSync(input)) {
    console.error(`Missing: ${rel}`);
    process.exitCode = 1;
    continue;
  }

  const inputSize = fs.statSync(input).size;
  before += inputSize;

  let bestQuality = 92;
  let bestSize = Infinity;

  for (const quality of [92, 88, 85, 82, 80, 78, 75]) {
    const size = await encodeWebp(input, output, quality);
    if (size < bestSize) {
      bestSize = size;
      bestQuality = quality;
    }
    if (size <= inputSize) break;
  }

  if (bestSize > inputSize) {
    await encodeWebp(input, output, bestQuality);
  }

  after += fs.statSync(output).size;

  console.log(
    `${rel} -> ${path.basename(output)} (${inputSize} -> ${fs.statSync(output).size}, q${bestQuality})`,
  );
}

console.log(`\nTOTAL: ${before} -> ${after} bytes (-${Math.round((1 - after / before) * 100)}%)`);
