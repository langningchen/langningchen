export interface GitHubSearchItem {
  comments?: number;
  created_at: string;
  closed_as_duplicate_of?: number | { number?: number } | null;
  draft?: boolean;
  html_url: string;
  number: number;
  pull_request?: {
    merged_at?: string | null;
  };
  reactions?: {
    total_count?: number;
  };
  duplicate_of?: number | { number?: number } | null;
  repository_url: string;
  state: "closed" | "open";
  state_reason?: "completed" | "not_planned" | "reopened" | null;
  title: string;
  updated_at: string;
}

export interface ContributionProject {
  issues: number;
  name: string;
  pullRequests: number;
  stars: number;
  url: string;
}

export interface ContributionRecord {
  closedReason?: "merged" | "notPlanned" | "duplicate" | "closed";
  createdAt: string;
  draft?: boolean;
  interactions?: number;
  kind: "issue" | "pullRequest";
  number: number;
  repository: string;
  state: "closed" | "open";
  title: string;
  updatedAt: string;
  url: string;
  duplicateOf?: number;
}

function duplicateOf(item: GitHubSearchItem): number | undefined {
  const value = item.closed_as_duplicate_of ?? item.duplicate_of;
  if (typeof value === "number") return value;
  if (value && typeof value.number === "number") return value.number;
  return undefined;
}

function closedReason(
  item: GitHubSearchItem,
  kind: ContributionRecord["kind"],
): ContributionRecord["closedReason"] {
  if (item.state === "open") return undefined;
  if (kind === "pullRequest" && item.pull_request?.merged_at) return "merged";
  if (kind === "issue" && duplicateOf(item) !== undefined) return "duplicate";
  if (item.state_reason === "not_planned") return "notPlanned";
  return "closed";
}

export interface CommunityData {
  projects: ContributionProject[];
  records: ContributionRecord[];
}

const HIDDEN_CONTRIBUTION_REPOSITORIES = new Set([
  "clash-verge-rev/clash-verge-rev",
  "vernesong/openclash",
]);

function isExternalContributionRepository(repository: string): boolean {
  return !repository.toLowerCase().startsWith("langningchen/");
}

export function isVisibleContributionRepository(repository: string): boolean {
  return isExternalContributionRepository(repository)
    && !HIDDEN_CONTRIBUTION_REPOSITORIES.has(repository.toLowerCase());
}

function repositoryName(repositoryUrl: string): string {
  return repositoryUrl.split("/repos/")[1] ?? repositoryUrl;
}

export function aggregateContributions(
  pullRequests: GitHubSearchItem[],
  issues: GitHubSearchItem[],
  repositoryStars: ReadonlyMap<string, number> = new Map(),
): ContributionProject[] {
  const projects = new Map<string, ContributionProject>();

  pullRequests.forEach((item) => {
    const name = repositoryName(item.repository_url);
    const current = projects.get(name) ?? {
      issues: 0,
      name,
      pullRequests: 0,
      stars: repositoryStars.get(name) ?? 0,
      url: `https://github.com/${name}`,
    };
    current.pullRequests += 1;
    projects.set(name, current);
  });

  issues.forEach((item) => {
    const name = repositoryName(item.repository_url);
    const current = projects.get(name) ?? {
      issues: 0,
      name,
      pullRequests: 0,
      stars: repositoryStars.get(name) ?? 0,
      url: `https://github.com/${name}`,
    };
    current.issues += 1;
    projects.set(name, current);
  });

  return sortContributionProjects(
    [...projects.values()].filter((project) => isVisibleContributionRepository(project.name)),
  );
}

export function sortContributionProjects(
  projects: ContributionProject[],
): ContributionProject[] {
  return [...projects].sort((left, right) => {
    const leftContributions = left.pullRequests + left.issues;
    const rightContributions = right.pullRequests + right.issues;
    const scoreDifference = rightContributions * right.stars
      - leftContributions * left.stars;
    if (scoreDifference !== 0) return scoreDifference;
    if (right.stars !== left.stars) return right.stars - left.stars;
    if (rightContributions !== leftContributions) {
      return rightContributions - leftContributions;
    }
    return left.name.localeCompare(right.name);
  });
}

export function collectContributionRecords(
  pullRequests: GitHubSearchItem[],
  issues: GitHubSearchItem[],
): ContributionRecord[] {
  return [
    ...pullRequests.map((item) => ({ item, kind: "pullRequest" as const })),
    ...issues.map((item) => ({ item, kind: "issue" as const })),
  ]
    .map(({ item, kind }) => ({
      closedReason: closedReason(item, kind),
      createdAt: item.created_at,
      draft: kind === "pullRequest" ? item.draft : undefined,
      duplicateOf: kind === "issue" ? duplicateOf(item) : undefined,
      interactions: (item.comments ?? 0) + (item.reactions?.total_count ?? 0),
      kind,
      number: item.number,
      repository: repositoryName(item.repository_url),
      state: item.state,
      title: item.title,
      updatedAt: item.updated_at,
      url: item.html_url,
    }))
    .filter((record) => isVisibleContributionRepository(record.repository))
    .sort((left, right) => Date.parse(right.updatedAt) - Date.parse(left.updatedAt));
}
