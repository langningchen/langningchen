import type { Metadata } from "next";
import ProjectArchiveShell from "@/components/project-archive-shell";
import { getGitHubData } from "@/lib/github-server";

export const metadata: Metadata = {
  title: "Open-source Projects | Langning Chen",
  description: "More open-source projects by Langning Chen.",
};

export default async function ProjectsPage() {
  const github = await getGitHubData();

  return (
    <ProjectArchiveShell
      details={github.projectDetails}
      repositories={github.featured.slice(2)}
    />
  );
}
