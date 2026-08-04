import type { GitHubProfile, GitHubRepository, LanguageStat } from "./github";
import {
  aggregateLanguages,
  selectFeaturedRepositories,
  sumRepositoryStars,
} from "./github";
import { getProjectDetailsMap } from "./project-details";
import type { ProjectDetailsMap } from "./project-details";
import { RUNTIME_FALLBACK } from "./runtime-fallback";
import { fetchFromServer } from "./server-fetch";

const OWN_REPOSITORIES_URL =
  "https://api.github.com/users/langningchen/repos?per_page=100&sort=updated";
const PROFILE_URL = "https://api.github.com/users/langningchen";
const EXTRA_REPOSITORIES = [
  "XMOJ-Script-dev/XMOJ-Script",
  "CYEZOI/OJ",
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

export async function getGitHubData(detailsLimit = 8): Promise<GitHubData> {
  try {
    const responses = await Promise.all([
      fetchFromServer(OWN_REPOSITORIES_URL, {
        headers: githubHeaders(),
      }),
      fetchFromServer(PROFILE_URL, {
        headers: githubHeaders(),
      }),
      ...EXTRA_REPOSITORIES.map((fullName) =>
        fetchFromServer(`https://api.github.com/repos/${fullName}`, {
          headers: githubHeaders(),
        }),
      ),
    ]);

    if (!responses[0].ok || !responses[1].ok) {
      throw new Error("GitHub profile data unavailable");
    }

    const owned = (await responses[0].json()) as GitHubRepository[];
    const profile = (await responses[1].json()) as GitHubProfile;
    const extraResponses = await Promise.all(
      responses.slice(2).map(async (response, index) => {
        if (response.ok) return (await response.json()) as GitHubRepository;
        const fullName = EXTRA_REPOSITORIES[index];
        return RUNTIME_FALLBACK.github.featured.find(
          (repository) => repository.full_name === fullName,
        ) ?? null;
      }),
    );
    const extra = extraResponses.filter(
      (repository): repository is GitHubRepository => repository !== null,
    );
    const repositories = normalizeRepositories(owned, extra);
    const featured = selectFeaturedRepositories(repositories);
    const projectDetails = await getProjectDetailsMap(
      featured.slice(0, detailsLimit),
      RUNTIME_FALLBACK.github.projectDetails,
    );
    const languages = aggregateProjectLanguages({
      ...RUNTIME_FALLBACK.github.projectDetails,
      ...projectDetails,
    });

    return {
      featured,
      languages:
        languages.length > 0 ? languages : RUNTIME_FALLBACK.github.languages,
      profile,
      projectDetails,
      totalStars: sumRepositoryStars(repositories),
    };
  } catch {
    return RUNTIME_FALLBACK.github;
  }
}
