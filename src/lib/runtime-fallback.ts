import snapshot from "@/data/runtime-fallback.json";
import type { ContributionCalendarData } from "./contribution-calendar";
import {
  isVisibleContributionRepository,
  type CommunityData,
  type ContributionProject,
} from "./contributions";
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
const fallbackCommunity = Array.isArray(legacyCompatibleSnapshot.community)
  ? { projects: legacyCompatibleSnapshot.community, records: [] }
  : legacyCompatibleSnapshot.community;

export const RUNTIME_FALLBACK: RuntimeFallbackSnapshot = {
  ...legacyCompatibleSnapshot,
  community: {
    projects: fallbackCommunity.projects.filter((project) => {
      return isVisibleContributionRepository(project.name);
    }),
    records: fallbackCommunity.records.filter((record) => {
      return isVisibleContributionRepository(record.repository);
    }),
  },
};
