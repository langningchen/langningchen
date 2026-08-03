export interface GitHubRepository {
  archived: boolean;
  description: string | null;
  fork: boolean;
  forks_count: number;
  full_name?: string;
  homepage: string | null;
  html_url: string;
  id: number;
  language: string | null;
  languages_url?: string;
  legacy_url?: string;
  name: string;
  open_issues_count?: number;
  owner?: {
    login: string;
  };
  pushed_at: string;
  size?: number;
  stargazers_count: number;
  topics: string[];
}

export interface GitHubProfile {
  avatar_url: string;
  bio: string | null;
  created_at: string;
  followers: number;
  html_url: string;
  public_gists: number;
  public_repos: number;
}

export interface ProjectMedia {
  alt: string;
  icon: string;
  image: string;
  presentation: "crop" | "interface";
}

export interface LanguageStat {
  color: string;
  name: string;
  value: number;
}

const PRIORITY = [
  "cph-ng",
  "xmoj-script",
  "oj",
  "hydro-helper",
  "shanghai-textbook-server",
  "miniapp",
  "luogucaptcha",
  "math",
  "fileshare",
  "paper",
];
const EXCLUDED = new Set(["home", "langningchen", "onechina"]);

const LANGUAGE_COLORS: Record<string, string> = {
  "C++": "#f05c82",
  C: "#7b8ca8",
  HTML: "#e34c26",
  JavaScript: "#d6b72c",
  Python: "#4f8fc9",
  Rust: "#b65d2e",
  TypeScript: "#3178c6",
};

export const PROJECT_MEDIA: Record<string, ProjectMedia> = {
  "cph-ng": {
    alt: "CPH-NG folder selection interface",
    icon: "/cph-ng-icon.png",
    image: "/cph-ng-ui.png",
    presentation: "interface",
  },
  "xmoj-script": {
    alt: "XMOJ Script enhanced problem interface",
    icon: "/xmoj-icon.png",
    image: "/xmoj-preview.png",
    presentation: "crop",
  },
};

function priorityOf(repository: GitHubRepository): number {
  const index = PRIORITY.indexOf(repository.name.toLowerCase());
  return index === -1 ? PRIORITY.length : index;
}

export function selectFeaturedRepositories(
  repositories: GitHubRepository[],
): GitHubRepository[] {
  return repositories
    .filter((repository) => !repository.fork)
    .filter((repository) => !EXCLUDED.has(repository.name.toLowerCase()))
    .sort((left, right) => {
      const priorityDifference = priorityOf(left) - priorityOf(right);
      if (priorityDifference !== 0) return priorityDifference;

      const starDifference = right.stargazers_count - left.stargazers_count;
      if (starDifference !== 0) return starDifference;

      return Date.parse(right.pushed_at) - Date.parse(left.pushed_at);
    })
    .slice(0, 8);
}

export function sumRepositoryStars(repositories: GitHubRepository[]): number {
  return repositories.reduce(
    (total, repository) => total + repository.stargazers_count,
    0,
  );
}

export function aggregateLanguages(
  languageResponses: Record<string, number>[],
): LanguageStat[] {
  const totals = new Map<string, number>();

  languageResponses.forEach((response) => {
    Object.entries(response).forEach(([language, bytes]) => {
      totals.set(language, (totals.get(language) ?? 0) + bytes);
    });
  });

  return [...totals.entries()]
    .sort((left, right) => right[1] - left[1])
    .slice(0, 6)
    .map(([name, value]) => ({
      color: LANGUAGE_COLORS[name] ?? "#87dbac",
      name,
      value,
    }));
}

export function repositoryFullName(repository: GitHubRepository): string {
  return repository.full_name ?? `langningchen/${repository.name}`;
}
