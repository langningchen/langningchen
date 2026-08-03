export interface GitHubSearchItem {
  html_url: string;
  pull_request?: object;
  repository_url: string;
  title: string;
}

export interface ContributionProject {
  issues: number;
  name: string;
  pullRequests: number;
  url: string;
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
    })
    .slice(0, 10);
}
