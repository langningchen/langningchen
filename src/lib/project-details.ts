import type { GitHubRepository, LanguageStat } from "./github";
import { aggregateLanguages, repositoryFullName } from "./github";

export interface GitHubContributor {
  avatar_url: string;
  contributions: number;
  html_url: string;
  login: string;
}

interface GitHubCommit {
  commit: {
    author: {
      date: string;
    } | null;
  };
}

export interface ProjectDetailsData {
  activity: number[];
  contributors: GitHubContributor[];
  languages: LanguageStat[];
  readme: string;
}

export type ProjectDetailsMap = Record<string, ProjectDetailsData>;

export const EMPTY_PROJECT_DETAILS: ProjectDetailsData = {
  activity: [],
  contributors: [],
  languages: [],
  readme: "",
};

function githubHeaders(accept = "application/vnd.github+json") {
  return {
    Accept: accept,
    ...(process.env.GITHUB_TOKEN
      ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
      : {}),
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

function dailyActivity(commits: GitHubCommit[]): number[] {
  const days = Array<number>(84).fill(0);
  const currentTime = Date.now();
  const dayLength = 24 * 60 * 60 * 1000;

  commits.forEach((commit) => {
    const date = commit.commit.author?.date;
    if (!date) return;
    const daysAgo = Math.floor((currentTime - Date.parse(date)) / dayLength);
    if (daysAgo >= 0 && daysAgo < days.length) {
      days[days.length - 1 - daysAgo] += 1;
    }
  });

  return days;
}

function summarizeReadme(markdown: string): string {
  return markdown
    .replace(/<!--[^]*?-->/g, " ")
    .replace(/!\[[^\]]*\]\([^)]*\)/g, " ")
    .replace(/\[([^\]]+)\]\([^)]*\)/g, "$1")
    .replace(/<[^>]+>/g, " ")
    .replace(/[`*_>#|~-]/g, " ")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 520);
}

export async function getProjectDetails(
  repository: GitHubRepository,
): Promise<ProjectDetailsData> {
  try {
    const fullName = repositoryFullName(repository);
    const baseUrl = `https://api.github.com/repos/${fullName}`;
    const [contributorsResponse, commitsResponse, languagesResponse, readmeResponse] =
      await Promise.all([
        fetch(`${baseUrl}/contributors?per_page=8`, {
          headers: githubHeaders(),
          next: { revalidate: 3600 },
        }),
        fetch(`${baseUrl}/commits?per_page=100&since=${new Date(Date.now() - 84 * 24 * 60 * 60 * 1000).toISOString()}`, {
          headers: githubHeaders(),
          next: { revalidate: 3600 },
        }),
        fetch(`${baseUrl}/languages`, {
          headers: githubHeaders(),
          next: { revalidate: 3600 },
        }),
        fetch(`${baseUrl}/readme`, {
          headers: githubHeaders("application/vnd.github.raw+json"),
          next: { revalidate: 3600 },
        }),
      ]);

    const contributors = contributorsResponse.ok
      ? ((await contributorsResponse.json()) as GitHubContributor[])
      : [];
    const commits = commitsResponse.ok
      ? ((await commitsResponse.json()) as GitHubCommit[])
      : [];
    const languages = languagesResponse.ok
      ? aggregateLanguages([
          (await languagesResponse.json()) as Record<string, number>,
        ])
      : [];
    const readme = readmeResponse.ok ? await readmeResponse.text() : "";

    return {
      activity: dailyActivity(commits),
      contributors,
      languages,
      readme: summarizeReadme(readme),
    };
  } catch {
    return EMPTY_PROJECT_DETAILS;
  }
}

export async function getProjectDetailsMap(
  repositories: GitHubRepository[],
): Promise<ProjectDetailsMap> {
  const details = await Promise.all(repositories.map(getProjectDetails));
  return Object.fromEntries(
    repositories.map((repository, index) => [
      repositoryFullName(repository),
      details[index],
    ]),
  );
}
