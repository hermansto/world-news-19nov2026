// make.fun news-image-20261119 — entry v2
// Copies the bundled news image (entry.png) to <MAKEFUN_OUTPUT_DIR>/entry.png.
// Validates the source first: JPEG (FF D8 FF) or PNG (89 50 4E 47) magic bytes,
// and size <= 1_048_576 bytes. Fails with exit(1) and a clear message otherwise.
// Node 22+, standard library only.

import { existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const MAX_BYTES = 1_048_576; // 1 MiB

function fail(message: string): never {
  console.error(`ERROR: ${message}`);
  process.exit(1);
}

const moduleDir = dirname(fileURLToPath(import.meta.url));
const sourcePath = join(moduleDir, "entry.png");

// Verify the source exists before doing anything else.
if (!existsSync(sourcePath)) {
  fail(`source image not found: ${sourcePath}`);
}

const size = statSync(sourcePath).size;
if (size === 0) {
  fail(`source image is empty: ${sourcePath}`);
}
if (size > MAX_BYTES) {
  fail(`source image too large: ${size} bytes (max ${MAX_BYTES} bytes): ${sourcePath}`);
}

const data = readFileSync(sourcePath);

// Magic-byte check: JPEG starts FF D8 FF, PNG starts 89 50 4E 47.
const isJpeg = data.length >= 3 && data[0] === 0xff && data[1] === 0xd8 && data[2] === 0xff;
const isPng =
  data.length >= 4 && data[0] === 0x89 && data[1] === 0x50 && data[2] === 0x4e && data[3] === 0x47;
if (!isJpeg && !isPng) {
  const head = Array.from(data.subarray(0, 4))
    .map((b) => b.toString(16).padStart(2, "0").toUpperCase())
    .join(" ");
  fail(`source image has invalid magic bytes (got ${head || "<empty>"}; expected JPEG FF D8 FF or PNG 89 50 4E 47): ${sourcePath}`);
}

const outDir = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";
mkdirSync(outDir, { recursive: true });

const destPath = join(outDir, "entry.png");
writeFileSync(destPath, data);

console.log(`Wrote ${data.length} bytes to ${destPath}`);
