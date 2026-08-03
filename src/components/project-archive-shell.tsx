"use client";

import { useState } from "react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useTranslations } from "next-intl";
import type { GitHubRepository } from "@/lib/github";
import { repositoryFullName } from "@/lib/github";
import {
  EMPTY_PROJECT_DETAILS,
  type ProjectDetailsMap,
} from "@/lib/project-details";
import ProjectCard from "./project-card";
import ProjectDetailsDrawer from "./project-details-drawer";
import ScrollReveal from "./scroll-reveal";
import SectionHeading from "./section-heading";
import SiteFooter from "./site-footer";

interface ProjectArchiveShellProps {
  details: ProjectDetailsMap;
  repositories: GitHubRepository[];
}

export default function ProjectArchiveShell({ details, repositories }: ProjectArchiveShellProps) {
  const t = useTranslations("projectArchive");
  const [selectedRepository, setSelectedRepository] = useState<GitHubRepository | null>(null);

  return (
    <>
      <Box component="main" sx={{ pt: { xs: "64px", md: "72px" } }}>
        <Box className="reveal-section" component="section" sx={{ py: { xs: 9, md: 12 } }}>
          <ScrollReveal>
            <Container maxWidth="xl">
              <SectionHeading description={t("description")} eyebrow={t("eyebrow")} title={t("title")} />
              <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: { xs: "1fr", md: "repeat(12, 1fr)" } }}>
                {repositories.map((repository, index) => (
                  <ProjectCard
                    featured={false}
                    index={index}
                    key={repository.id}
                    onOpen={setSelectedRepository}
                    repository={repository}
                    showStatus={false}
                  />
                ))}
              </Box>
            </Container>
          </ScrollReveal>
          <ProjectDetailsDrawer
            details={selectedRepository
              ? details[repositoryFullName(selectedRepository)] ?? EMPTY_PROJECT_DETAILS
              : EMPTY_PROJECT_DETAILS}
            onClose={() => setSelectedRepository(null)}
            repository={selectedRepository}
          />
        </Box>
      </Box>
      <SiteFooter />
    </>
  );
}
