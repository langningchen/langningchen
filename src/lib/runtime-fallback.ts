import snapshot from "@/data/runtime-fallback.json";
import type { ContributionCalendarData } from "./contribution-calendar";
import type { CommunityData, ContributionProject } from "./contributions";
import type { GameProfile } from "./game-types";
import type { GitHubData } from "./github-server";
import type { WakaTimeData } from "./wakatime";

interface RuntimeFallbackSnapshot {
  calendar: ContributionCalendarData;
  community: CommunityData;
  games: {
    genshin: GameProfile;
    starRail: GameProfile;
  };
  github: GitHubData;
  installCount: number;
  wakaTime: WakaTimeData;
}

type LegacyRuntimeFallbackSnapshot = Omit<RuntimeFallbackSnapshot, "community"> & {
  community: CommunityData | ContributionProject[];
};

const legacyCompatibleSnapshot = snapshot as LegacyRuntimeFallbackSnapshot;

export const RUNTIME_FALLBACK: RuntimeFallbackSnapshot = {
  ...legacyCompatibleSnapshot,
  community: Array.isArray(legacyCompatibleSnapshot.community)
    ? { projects: legacyCompatibleSnapshot.community, records: [] }
    : legacyCompatibleSnapshot.community,
};
