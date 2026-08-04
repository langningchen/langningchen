import type { ContributionProject } from "@/lib/contributions";
import type { LanguageStat } from "@/lib/github";
import type { WakaTimeData } from "@/lib/wakatime";

export const FALLBACK_GITHUB_LANGUAGES: LanguageStat[] = [
  { color: "#3178c6", name: "TypeScript", value: 41 },
  { color: "#f05c82", name: "C++", value: 27 },
  { color: "#d6b72c", name: "JavaScript", value: 15 },
  { color: "#4f8fc9", name: "Python", value: 10 },
  { color: "#e34c26", name: "HTML", value: 5 },
  { color: "#7b8ca8", name: "C", value: 2 },
];

export const FALLBACK_WAKATIME: WakaTimeData = {
  dailyAverage: "2 hrs 52 mins",
  languages: [
    { color: "#f05c82", name: "C++", value: 39.41 },
    { color: "#3178c6", name: "TypeScript", value: 25.35 },
    { color: "#d6b72c", name: "JavaScript", value: 9.25 },
    { color: "#4f8fc9", name: "Python", value: 2.92 },
    { color: "#777bb4", name: "PHP", value: 1.66 },
    { color: "#b65d2e", name: "Rust", value: 1.11 },
  ],
  range: "since Jul 27 2022",
  total: "3,168 hrs 18 mins",
};

export const FALLBACK_CONTRIBUTIONS: ContributionProject[] = [
  { issues: 0, name: "cloudflare/workers-sdk", pullRequests: 1, url: "https://github.com/cloudflare/workers-sdk" },
  { issues: 1, name: "hydro-dev/Hydro", pullRequests: 2, url: "https://github.com/hydro-dev/Hydro" },
  { issues: 0, name: "jmerle/competitive-companion", pullRequests: 1, url: "https://github.com/jmerle/competitive-companion" },
  { issues: 8, name: "CYEZOI/OJ", pullRequests: 1, url: "https://github.com/CYEZOI/OJ" },
  { issues: 0, name: "yltx/vscode-luogu", pullRequests: 2, url: "https://github.com/yltx/vscode-luogu" },
  { issues: 1, name: "MasterKale/SimpleWebAuthn", pullRequests: 0, url: "https://github.com/MasterKale/SimpleWebAuthn" },
  { issues: 1, name: "microsoft/vscode", pullRequests: 0, url: "https://github.com/microsoft/vscode" },
];
