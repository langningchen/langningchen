import snapshot from "@/data/runtime-fallback.json";
import type { ContributionCalendarData } from "./contribution-calendar";
import {
  isVisibleContributionRepository,
  sortContributionProjects,
  type CommunityData,
  type ContributionProject,
} from "./contributions";
import type { GameProfile } from "./game-types";
import type { GitHubRepository } from "./github";
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

type LegacyContributionProject = Omit<ContributionProject, "stars"> & {
  stars?: number;
};

type LegacyCommunityData = Omit<CommunityData, "projects"> & {
  projects: LegacyContributionProject[];
};

type LegacyGitHubData = Omit<GitHubData, "projects"> & {
  projects?: GitHubRepository[];
};

type LegacyRuntimeFallbackSnapshot = Omit<RuntimeFallbackSnapshot, "community" | "github"> & {
  community: LegacyCommunityData | LegacyContributionProject[];
  github: LegacyGitHubData;
};

const legacyCompatibleSnapshot = snapshot as unknown as LegacyRuntimeFallbackSnapshot;
const fallbackCommunity = Array.isArray(legacyCompatibleSnapshot.community)
  ? { projects: legacyCompatibleSnapshot.community, records: [] }
  : legacyCompatibleSnapshot.community;

export const RUNTIME_FALLBACK: RuntimeFallbackSnapshot = {
  ...legacyCompatibleSnapshot,
  community: {
    projects: sortContributionProjects(
      fallbackCommunity.projects
        .filter((project) => isVisibleContributionRepository(project.name))
        .map((project) => ({ ...project, stars: project.stars ?? 0 })),
    ),
    records: fallbackCommunity.records.filter((record) => {
      return isVisibleContributionRepository(record.repository);
    }),
  },
  github: {
    ...legacyCompatibleSnapshot.github,
    projects: legacyCompatibleSnapshot.github.projects
      ?? legacyCompatibleSnapshot.github.featured,
  },
};
