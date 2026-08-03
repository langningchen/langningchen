import { siCloudflare, siDocker, siGit, siGithubactions, siLinux, siPnpm } from "simple-icons";
import type { Skill } from "./skill-types";

export const INFRASTRUCTURE_SKILLS: Skill[] = [
  { color: "#f38020", icon: siCloudflare, label: "Cloudflare" },
  { color: "#2088ff", icon: siGithubactions, label: "GitHub Actions" },
  { color: "#1793d1", icon: siLinux, label: "Linux / WSL" },
  { color: "#2496ed", icon: siDocker, label: "Docker" },
  { color: "#f69220", icon: siPnpm, label: "pnpm" },
  { color: "#f05032", icon: siGit, label: "Git" },
];
