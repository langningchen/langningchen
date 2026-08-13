import type { CommunityData, GitHubSearchItem } from "./contributions";
import {
  aggregateContributions,
  collectContributionRecords,
  isVisibleContributionRepository,
} from "./contributions";
import { RUNTIME_FALLBACK } from "./runtime-fallback";
import { fetchFromServer } from "./server-fetch";

const PULL_REQUESTS_URL =
  "https://api.github.com/search/issues?q=author%3Alangningchen+type%3Apr+-user%3Alangningchen&per_page=100&sort=updated&order=desc";
const ISSUES_URL =
  "https://api.github.com/search/issues?q=author%3Alangningchen+type%3Aissue+-user%3Alangningchen&per_page=100&sort=updated&order=desc";
const SEARCH_PAGE_SIZE = 100;
const SEARCH_RESULT_LIMIT = 1_000;

interface SearchResponse {
  items: GitHubSearchItem[];
  total_count: number;
}

interface RepositoryResponse {
  stargazers_count: number;
}

function githubHeaders() {
  return {
    Accept: "application/vnd.github+json",
    ...(process.env.GITHUB_TOKEN
      ? { Authorization: `Bearer ${process.env.GITHUB_TOKEN}` }
      : {}),
    "X-GitHub-Api-Version": "2022-11-28",
  };
}

async function fetchSearchItems(url: string): Promise<GitHubSearchItem[]> {
  const firstResponse = await fetchFromServer(url, { headers: githubHeaders() });
  if (!firstResponse.ok) throw new Error("GitHub contribution search unavailable");

  const firstPage = (await firstResponse.json()) as SearchResponse;
  const resultCount = Math.min(firstPage.total_count, SEARCH_RESULT_LIMIT);
  const pageCount = Math.ceil(resultCount / SEARCH_PAGE_SIZE);
  if (pageCount <= 1) return firstPage.items;

  const pageResponses = await Promise.all(
    Array.from({ length: pageCount - 1 }, (_, index) => {
      const pageUrl = new URL(url);
      pageUrl.searchParams.set("page", String(index + 2));
      return fetchFromServer(pageUrl, { headers: githubHeaders() });
    }),
  );
  if (pageResponses.some((response) => !response.ok)) {
    throw new Error("GitHub contribution search pagination unavailable");
  }

  const pages = await Promise.all(
    pageResponses.map((response) => response.json() as Promise<SearchResponse>),
  );
  return [firstPage, ...pages].flatMap((page) => page.items);
}

async function fetchRepositoryStars(
  pullRequests: GitHubSearchItem[],
  issues: GitHubSearchItem[],
): Promise<Map<string, number>> {
  const repositoryNames = [
    ...new Set(
      [...pullRequests, ...issues]
        .map((item) => item.repository_url.split("/repos/")[1] ?? item.repository_url)
        .filter((repository) => isVisibleContributionRepository(repository)),
    ),
  ];
  const fallbackStars = new Map(
    RUNTIME_FALLBACK.community.projects.map((project) => [
      project.name.toLowerCase(),
      project.stars,
    ]),
  );
  const responses = await Promise.all(
    repositoryNames.map((repository) => fetchFromServer(
      `https://api.github.com/repos/${repository}`,
      { headers: githubHeaders() },
    )),
  );
  const entries = await Promise.all(
    responses.map(async (response, index) => {
      const repository = repositoryNames[index];
      if (!response.ok) {
        return [repository, fallbackStars.get(repository.toLowerCase()) ?? 0] as const;
      }
      const data = (await response.json()) as RepositoryResponse;
      return [repository, data.stargazers_count] as const;
    }),
  );

  return new Map(entries);
}

export async function getCommunityData(): Promise<CommunityData> {
  try {
    const [pullRequests, issues] = await Promise.all([
      fetchSearchItems(PULL_REQUESTS_URL),
      fetchSearchItems(ISSUES_URL),
    ]);
    const repositoryStars = await fetchRepositoryStars(pullRequests, issues);
    return {
      projects: aggregateContributions(pullRequests, issues, repositoryStars),
      records: collectContributionRecords(pullRequests, issues),
    };
  } catch {
    return RUNTIME_FALLBACK.community;
  }
}
