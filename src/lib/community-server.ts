import type { CommunityData, GitHubSearchItem } from "./contributions";
import {
  aggregateContributions,
  collectContributionRecords,
} from "./contributions";
import { RUNTIME_FALLBACK } from "./runtime-fallback";
import { fetchFromServer } from "./server-fetch";

const PULL_REQUESTS_URL =
  "https://api.github.com/search/issues?q=author%3Alangningchen+type%3Apr+-user%3Alangningchen&per_page=100&sort=updated&order=desc";
const ISSUES_URL =
  "https://api.github.com/search/issues?q=author%3Alangningchen+type%3Aissue+-user%3Alangningchen&per_page=100&sort=updated&order=desc";

interface SearchResponse {
  items: GitHubSearchItem[];
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

export async function getCommunityData(): Promise<CommunityData> {
  try {
    const [pullRequestsResponse, issuesResponse] = await Promise.all([
      fetchFromServer(PULL_REQUESTS_URL, {
        headers: githubHeaders(),
      }),
      fetchFromServer(ISSUES_URL, {
        headers: githubHeaders(),
      }),
    ]);
    if (!pullRequestsResponse.ok || !issuesResponse.ok) {
      return RUNTIME_FALLBACK.community;
    }

    const pullRequests = (await pullRequestsResponse.json()) as SearchResponse;
    const issues = (await issuesResponse.json()) as SearchResponse;
    return {
      projects: aggregateContributions(pullRequests.items, issues.items),
      records: collectContributionRecords(pullRequests.items, issues.items),
    };
  } catch {
    return RUNTIME_FALLBACK.community;
  }
}
