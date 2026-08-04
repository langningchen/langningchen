import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";

const SOURCE_URL = "https://enka.network/_app/immutable/chunks/SvgIcon.1e7ac3fd.js";
const OUTPUT_PATH = path.resolve("src/data/game-stat-icons.json");
const ICON_PATTERN = /([A-Za-z0-9_]+):\{viewBox:"([^"]+)",svg:'((?:\\.|[^'])*)'\}/g;

interface CachedIcon {
  svg: string;
  viewBox: string;
}

function decodeJavaScriptString(value: string): string {
  return value.replace(/\\(['"\\nrt])/g, (_, escaped: string) => {
    if (escaped === "n") return "\n";
    if (escaped === "r") return "\r";
    if (escaped === "t") return "\t";
    return escaped;
  });
}

async function readSource(): Promise<string> {
  const localSource = process.argv[2];
  if (localSource) return readFile(localSource, "utf8");

  const response = await fetch(SOURCE_URL);
  if (!response.ok) throw new Error(`Unable to download Enka icons: ${response.status}`);
  return response.text();
}

const source = await readSource();
const icons: Record<string, CachedIcon> = {};

for (const match of source.matchAll(ICON_PATTERN)) {
  const [, name, viewBox, svg] = match;
  if (!name.startsWith("FIGHT_PROP_") && !name.startsWith("Icon")) continue;
  icons[name] = { svg: decodeJavaScriptString(svg), viewBox };
}

if (Object.keys(icons).length < 40) {
  throw new Error(`Only found ${Object.keys(icons).length} stat icons; the Enka bundle format may have changed.`);
}

await writeFile(OUTPUT_PATH, `${JSON.stringify(icons, null, 2)}\n`);
console.log(`Cached ${Object.keys(icons).length} game stat icons in ${OUTPUT_PATH}`);
