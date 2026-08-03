import { FALLBACK_CONTRIBUTIONS } from "@/data/fallback-activity";
import type { ContributionProject, GitHubSearchItem } from "./contributions";
import { aggregateContributions } from "./contributions";

const PULL_REQUESTS_URL =
  "https://api.github.com/search/issues?q=author%3Alangningchen+type%3Apr+-user%3Alangningchen&per_page=100";
const ISSUES_URL =
  "https://api.github.com/search/issues?q=author%3Alangningchen+type%3Aissue+-user%3Alangningchen&per_page=100";

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

export async function getCommunityData(): Promise<ContributionProject[]> {
  try {
    const [pullRequestsResponse, issuesResponse] = await Promise.all([
      fetch(PULL_REQUESTS_URL, {
        headers: githubHeaders(),
        next: { revalidate: 3600 },
      }),
      fetch(ISSUES_URL, {
        headers: githubHeaders(),
        next: { revalidate: 3600 },
      }),
    ]);
    if (!pullRequestsResponse.ok || !issuesResponse.ok) {
      return FALLBACK_CONTRIBUTIONS;
    }

    const pullRequests = (await pullRequestsResponse.json()) as SearchResponse;
    const issues = (await issuesResponse.json()) as SearchResponse;
    return aggregateContributions(pullRequests.items, issues.items);
  } catch {
    return FALLBACK_CONTRIBUTIONS;
  }
}
