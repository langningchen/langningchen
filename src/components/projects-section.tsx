"use client";

import { useState } from "react";
import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Link from "next/link";
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

interface ProjectsSectionProps {
  details: ProjectDetailsMap;
  installCount: number;
  repositories: GitHubRepository[];
}

export default function ProjectsSection({ details, installCount, repositories }: ProjectsSectionProps) {
  const t = useTranslations("projects");
  const [selectedRepository, setSelectedRepository] = useState<GitHubRepository | null>(null);

  return (
    <Box className="reveal-section" component="section" id="work" sx={{ py: { xs: 7, md: 8 } }}>
      <ScrollReveal>
        <Container maxWidth="xl">
          <SectionHeading
            compact
            description={t("description")}
            eyebrow={t("eyebrow")}
            title={t("title")}
          />
          <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: { xs: "1fr", md: "repeat(12, 1fr)" } }}>
            {repositories.slice(0, 2).map((repository, index) => (
              <ProjectCard
                index={index}
                installCount={repository.name.toLowerCase() === "cph-ng" ? installCount : undefined}
                key={repository.id}
                onOpen={setSelectedRepository}
                repository={repository}
              />
            ))}
          </Box>
          <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 2 }}>
            <Button component={Link} endIcon={<ArrowForwardRounded />} href="/projects" prefetch>
              {t("viewMore")}
            </Button>
          </Box>
        </Container>
      </ScrollReveal>
      <ProjectDetailsDrawer
        details={selectedRepository
          ? details[repositoryFullName(selectedRepository)] ?? EMPTY_PROJECT_DETAILS
          : EMPTY_PROJECT_DETAILS}
        onClose={() => setSelectedRepository(null)}
        repository={selectedRepository}
        installCount={selectedRepository?.name.toLowerCase() === "cph-ng" ? installCount : undefined}
      />
    </Box>
  );
}
