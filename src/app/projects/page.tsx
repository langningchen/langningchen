import type { Metadata } from "next";
import ProjectArchiveShell from "@/components/project-archive-shell";
import { repositoryFullName } from "@/lib/github";
import { getGitHubData } from "@/lib/github-server";

export const metadata: Metadata = {
  title: "Open-source Projects | Langning Chen",
  description: "More open-source projects by Langning Chen.",
};

export const dynamic = "force-dynamic";

export default async function ProjectsPage() {
  const github = await getGitHubData(6, "archive");
  const featuredNames = new Set(
    github.featured.slice(0, 2).map((repository) => repositoryFullName(repository)),
  );

  return (
    <ProjectArchiveShell
      details={github.projectDetails}
      repositories={github.projects.filter(
        (repository) => !featuredNames.has(repositoryFullName(repository)),
      )}
    />
  );
}
