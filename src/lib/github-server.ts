import { FALLBACK_GITHUB_LANGUAGES } from "@/data/fallback-activity";
import { FALLBACK_PROFILE, FALLBACK_REPOSITORIES } from "@/data/fallback-github";
import type { GitHubProfile, GitHubRepository, LanguageStat } from "./github";
import {
  aggregateLanguages,
  selectFeaturedRepositories,
  sumRepositoryStars,
} from "./github";
import { getProjectDetailsMap } from "./project-details";
import type { ProjectDetailsMap } from "./project-details";

const OWN_REPOSITORIES_URL =
  "https://api.github.com/users/langningchen/repos?per_page=100&sort=updated";
const PROFILE_URL = "https://api.github.com/users/langningchen";
const EXTRA_REPOSITORY_URLS = [
  "https://api.github.com/repos/XMOJ-Script-dev/XMOJ-Script",
  "https://api.github.com/repos/CYEZOI/OJ",
];

export interface GitHubData {
  featured: GitHubRepository[];
  languages: LanguageStat[];
  profile: GitHubProfile;
  projectDetails: ProjectDetailsMap;
  totalStars: number;
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

function normalizeRepositories(
  owned: GitHubRepository[],
  extra: GitHubRepository[],
): GitHubRepository[] {
  const legacyXmoj = owned.find(
    (repository) => repository.name.toLowerCase() === "xmoj-script",
  );
  const normalizedOwned = owned
    .filter((repository) => repository !== legacyXmoj)
    .map((repository) => ({
      ...repository,
      homepage:
        repository.name.toLowerCase() === "math" ? null : repository.homepage,
    }));
  const normalizedExtra = extra.map((repository) =>
    repository.full_name === "XMOJ-Script-dev/XMOJ-Script"
      ? { ...repository, legacy_url: legacyXmoj?.html_url }
      : repository,
  );

  return [...normalizedOwned, ...normalizedExtra];
}

function aggregateProjectLanguages(details: ProjectDetailsMap): LanguageStat[] {
  const languageMaps = Object.values(details).map((project) =>
    Object.fromEntries(
      project.languages.map((language) => [language.name, language.value]),
    ),
  );
  return aggregateLanguages(languageMaps);
}

export async function getGitHubData(): Promise<GitHubData> {
  try {
    const responses = await Promise.all([
      fetch(OWN_REPOSITORIES_URL, {
        headers: githubHeaders(),
        next: { revalidate: 3600 },
      }),
      fetch(PROFILE_URL, {
        headers: githubHeaders(),
        next: { revalidate: 3600 },
      }),
      ...EXTRA_REPOSITORY_URLS.map((url) =>
        fetch(url, {
          headers: githubHeaders(),
          next: { revalidate: 3600 },
        }),
      ),
    ]);

    if (!responses[0].ok || !responses[1].ok) {
      throw new Error("GitHub profile data unavailable");
    }

    const owned = (await responses[0].json()) as GitHubRepository[];
    const profile = (await responses[1].json()) as GitHubProfile;
    const extra = await Promise.all(
      responses
        .slice(2)
        .filter((response) => response.ok)
        .map((response) => response.json() as Promise<GitHubRepository>),
    );
    const repositories = normalizeRepositories(owned, extra);
    const featured = selectFeaturedRepositories(repositories);
    const projectDetails = await getProjectDetailsMap(featured);
    const languages = aggregateProjectLanguages(projectDetails);

    return {
      featured,
      languages:
        languages.length > 0 ? languages : FALLBACK_GITHUB_LANGUAGES,
      profile,
      projectDetails,
      totalStars: sumRepositoryStars(repositories),
    };
  } catch {
    return {
      featured: selectFeaturedRepositories(FALLBACK_REPOSITORIES),
      languages: FALLBACK_GITHUB_LANGUAGES,
      profile: FALLBACK_PROFILE,
      projectDetails: {},
      totalStars: sumRepositoryStars(FALLBACK_REPOSITORIES),
    };
  }
}
