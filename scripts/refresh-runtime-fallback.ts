import { mkdir, readFile, rename, writeFile } from "node:fs/promises";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import { getCommunityData } from "../src/lib/community-server";
import { getContributionCalendar } from "../src/lib/contribution-calendar";
import { getGenshinProfile, getStarRailProfile } from "../src/lib/game-data";
import { getGitHubData } from "../src/lib/github-server";
import { getMarketplaceInstallCount } from "../src/lib/marketplace-server";
import { getWakaTimeData } from "../src/lib/wakatime-server";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const destination = resolve(root, "src/data/runtime-fallback.json");
const temporaryDestination = `${destination}.tmp`;

const [calendar, community, genshin, github, installCount, starRail, wakaTime] =
  await Promise.all([
    getContributionCalendar(),
    getCommunityData(),
    getGenshinProfile(),
    getGitHubData(),
    getMarketplaceInstallCount(),
    getStarRailProfile(),
    getWakaTimeData(),
  ]);

const snapshot = {
  calendar,
  community,
  games: { genshin, starRail },
  github,
  installCount,
  wakaTime,
};
const serializedSnapshot = `${JSON.stringify(snapshot, null, 2)}\n`;

await mkdir(dirname(destination), { recursive: true });
const currentSnapshot = await readFile(destination, "utf8").catch(() => "");

if (currentSnapshot === serializedSnapshot) {
  console.log("Runtime fallback snapshot is already current");
} else {
  await writeFile(temporaryDestination, serializedSnapshot);
  await rename(temporaryDestination, destination);
  console.log("Updated runtime fallback snapshot");
}
