import type { GitHubRepository, LanguageStat } from "./github";
import { aggregateLanguages, repositoryFullName } from "./github";
import { fetchFromServer } from "./server-fetch";

export interface GitHubContributor {
  avatar_url: string;
  contributions: number;
  html_url: string;
  login: string;
}

interface GitHubWeeklyActivity {
  days: number[];
  week: number;
}

const ACTIVITY_RETRY_DELAYS = [0, 750, 2_000];
const DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;
const YEAR_LENGTH = 365;

export interface ProjectDetailsData {
  activity: number[];
  activityStartDate?: string;
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

function annualActivity(weeks: GitHubWeeklyActivity[]) {
  const activityByDate = new Map<string, number>();

  weeks.forEach((week) => {
    week.days.forEach((count, dayIndex) => {
      const date = new Date(week.week * 1000 + dayIndex * DAY_IN_MILLISECONDS);
      activityByDate.set(date.toISOString().slice(0, 10), count);
    });
  });

  const endDate = new Date();
  endDate.setUTCHours(0, 0, 0, 0);
  const startDate = new Date(endDate.getTime() - (YEAR_LENGTH - 1) * DAY_IN_MILLISECONDS);
  const activity = Array.from({ length: YEAR_LENGTH }, (_, index) => {
    const date = new Date(startDate.getTime() + index * DAY_IN_MILLISECONDS);
    return activityByDate.get(date.toISOString().slice(0, 10)) ?? 0;
  });

  return {
    activity,
    activityStartDate: startDate.toISOString().slice(0, 10),
  };
}

function parseWeeklyActivity(payload: unknown): GitHubWeeklyActivity[] | null {
  if (!Array.isArray(payload)) return null;

  const weeks = payload.filter((value): value is GitHubWeeklyActivity => {
    if (!value || typeof value !== "object") return false;
    const candidate = value as Partial<GitHubWeeklyActivity>;
    return typeof candidate.week === "number"
      && Array.isArray(candidate.days)
      && candidate.days.every((count) => typeof count === "number");
  });

  return weeks.length === payload.length ? weeks : null;
}

async function fetchAnnualActivity(baseUrl: string) {
  for (const delay of ACTIVITY_RETRY_DELAYS) {
    if (delay > 0) {
      await new Promise<void>((resolve) => setTimeout(resolve, delay));
    }

    const response = await fetchFromServer(`${baseUrl}/stats/commit_activity`, {
      headers: githubHeaders(),
    }, { bypassCache: true });

    if (response.status === 200) {
      const weeks = parseWeeklyActivity(await response.json());
      return weeks ? annualActivity(weeks) : null;
    }
    if (response.status !== 202) return null;
  }

  return null;
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
  fallback: ProjectDetailsData = EMPTY_PROJECT_DETAILS,
): Promise<ProjectDetailsData> {
  try {
    const fullName = repositoryFullName(repository);
    const baseUrl = `https://api.github.com/repos/${fullName}`;
    const [contributorsResponse, activity, languagesResponse, readmeResponse] =
      await Promise.all([
        fetchFromServer(`${baseUrl}/contributors?per_page=8`, {
          headers: githubHeaders(),
        }),
        fetchAnnualActivity(baseUrl),
        fetchFromServer(`${baseUrl}/languages`, {
          headers: githubHeaders(),
        }),
        fetchFromServer(`${baseUrl}/readme`, {
          headers: githubHeaders("application/vnd.github.raw+json"),
        }),
      ]);

    const contributors = contributorsResponse.ok
      ? ((await contributorsResponse.json()) as GitHubContributor[])
      : fallback.contributors;
    const normalizedActivity = activity ?? {
      activity: fallback.activity,
      activityStartDate: fallback.activityStartDate,
    };
    const languages = languagesResponse.ok
      ? aggregateLanguages([
          (await languagesResponse.json()) as Record<string, number>,
        ])
      : fallback.languages;
    const readme = readmeResponse.ok
      ? summarizeReadme(await readmeResponse.text())
      : fallback.readme;

    return {
      ...normalizedActivity,
      contributors,
      languages,
      readme,
    };
  } catch {
    return fallback;
  }
}

export async function getProjectDetailsMap(
  repositories: GitHubRepository[],
  fallback: ProjectDetailsMap = {},
): Promise<ProjectDetailsMap> {
  const details = await Promise.all(
    repositories.map((repository) => {
      const fullName = repositoryFullName(repository);
      return getProjectDetails(repository, fallback[fullName]);
    }),
  );
  return Object.fromEntries(
    repositories.map((repository, index) => [
      repositoryFullName(repository),
      details[index],
    ]),
  );
}
