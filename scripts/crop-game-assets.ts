import { mkdir, readdir } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

interface CropOptions {
  ignoreDarkPixels: boolean;
}

interface PixelBounds {
  height: number;
  left: number;
  top: number;
  width: number;
}

const ALPHA_THRESHOLD = 12;
const DARK_THRESHOLD = 22;

async function detectContentBounds(
  inputPath: string,
  { ignoreDarkPixels }: CropOptions,
): Promise<PixelBounds | null> {
  const { data, info } = await sharp(inputPath)
    .ensureAlpha()
    .raw()
    .toBuffer({ resolveWithObject: true });
  let left = info.width;
  let right = -1;
  let top = info.height;
  let bottom = -1;

  for (let y = 0; y < info.height; y += 1) {
    for (let x = 0; x < info.width; x += 1) {
      const offset = (y * info.width + x) * info.channels;
      const alpha = data[offset + 3];
      const brightestChannel = Math.max(data[offset], data[offset + 1], data[offset + 2]);
      const visible = alpha > ALPHA_THRESHOLD
        && (!ignoreDarkPixels || brightestChannel > DARK_THRESHOLD);
      if (!visible) continue;
      left = Math.min(left, x);
      right = Math.max(right, x);
      top = Math.min(top, y);
      bottom = Math.max(bottom, y);
    }
  }

  if (right < left || bottom < top) return null;
  return {
    height: bottom - top + 1,
    left,
    top,
    width: right - left + 1,
  };
}

async function cropAssets(
  sourceDirectory: string,
  outputDirectory: string,
  fileNames: string[],
  options: CropOptions,
): Promise<number> {
  await mkdir(outputDirectory, { recursive: true });
  await Promise.all(fileNames.map(async (fileName) => {
    const inputPath = path.join(sourceDirectory, fileName);
    const outputPath = path.join(outputDirectory, fileName);
    const bounds = await detectContentBounds(inputPath, options);
    const pipeline = sharp(inputPath);
    if (bounds) pipeline.extract(bounds);
    await pipeline.webp({ lossless: true }).toFile(outputPath);
  }));
  return fileNames.length;
}

async function main(): Promise<void> {
  const publicDirectory = path.join(process.cwd(), "public", "games");
  const relicDirectory = path.join(publicDirectory, "relics");
  const relicFiles = await readdir(relicDirectory);
  const relicCount = await cropAssets(
    relicDirectory,
    path.join(relicDirectory, "cropped"),
    relicFiles.filter((fileName) => fileName.startsWith("starrail-") && fileName.endsWith(".webp")),
    { ignoreDarkPixels: true },
  );
  console.log(`Cropped ${relicCount} relic images`);
}

await main();
