export interface GitHubSearchItem {
  created_at: string;
  html_url: string;
  number: number;
  pull_request?: object;
  repository_url: string;
  state: "closed" | "open";
  title: string;
  updated_at: string;
}

export interface ContributionProject {
  issues: number;
  name: string;
  pullRequests: number;
  url: string;
}

export interface ContributionRecord {
  createdAt: string;
  kind: "issue" | "pullRequest";
  number: number;
  repository: string;
  state: "closed" | "open";
  title: string;
  updatedAt: string;
  url: string;
}

export interface CommunityData {
  projects: ContributionProject[];
  records: ContributionRecord[];
}

const CONTRIBUTION_PRIORITY = [
  "cloudflare/workers-sdk",
  "hydro-dev/Hydro",
  "jmerle/competitive-companion",
  "CYEZOI/OJ",
  "yltx/vscode-luogu",
  "clash-verge-rev/clash-verge-rev",
  "MasterKale/SimpleWebAuthn",
  "microsoft/vscode",
  "vernesong/OpenClash",
  "extend-luogu/extend-luogu",
];

function repositoryName(repositoryUrl: string): string {
  return repositoryUrl.split("/repos/")[1] ?? repositoryUrl;
}

export function aggregateContributions(
  pullRequests: GitHubSearchItem[],
  issues: GitHubSearchItem[],
): ContributionProject[] {
  const projects = new Map<string, ContributionProject>();

  pullRequests.forEach((item) => {
    const name = repositoryName(item.repository_url);
    const current = projects.get(name) ?? {
      issues: 0,
      name,
      pullRequests: 0,
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
      url: `https://github.com/${name}`,
    };
    current.issues += 1;
    projects.set(name, current);
  });

  return [...projects.values()]
    .filter((project) => !project.name.startsWith("langningchen/"))
    .sort((left, right) => {
      const leftPriority = CONTRIBUTION_PRIORITY.indexOf(left.name);
      const rightPriority = CONTRIBUTION_PRIORITY.indexOf(right.name);
      const normalizedLeft = leftPriority === -1 ? CONTRIBUTION_PRIORITY.length : leftPriority;
      const normalizedRight = rightPriority === -1 ? CONTRIBUTION_PRIORITY.length : rightPriority;
      if (normalizedLeft !== normalizedRight) return normalizedLeft - normalizedRight;
      return right.pullRequests + right.issues - left.pullRequests - left.issues;
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
      createdAt: item.created_at,
      kind,
      number: item.number,
      repository: repositoryName(item.repository_url),
      state: item.state,
      title: item.title,
      updatedAt: item.updated_at,
      url: item.html_url,
    }))
    .filter((record) => !record.repository.startsWith("langningchen/"))
    .sort((left, right) => Date.parse(right.updatedAt) - Date.parse(left.updatedAt));
}
