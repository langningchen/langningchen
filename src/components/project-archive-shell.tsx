"use client";

import ArrowOutwardRounded from "@mui/icons-material/ArrowOutwardRounded";
import CallSplitRounded from "@mui/icons-material/CallSplitRounded";
import StarRounded from "@mui/icons-material/StarRounded";
import { useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useFormatter, useTranslations } from "next-intl";
import { getProjectDescriptionKey, getProjectName } from "@/data/project-copy";
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
import SubpageBackLink from "./subpage-back-link";
import SubpageEntrance from "./subpage-entrance";

interface ProjectArchiveShellProps {
  details: ProjectDetailsMap;
  repositories: GitHubRepository[];
}

export default function ProjectArchiveShell({ details, repositories }: ProjectArchiveShellProps) {
  const format = useFormatter();
  const t = useTranslations("projectArchive");
  const tNav = useTranslations("nav");
  const tProjects = useTranslations("projects");
  const tDescription = useTranslations("projectDescriptions");
  const [selectedRepository, setSelectedRepository] = useState<GitHubRepository | null>(null);
  const sortedRepositories = useMemo(() => [...repositories].sort((left, right) => {
    const starDifference = right.stargazers_count - left.stargazers_count;
    if (starDifference !== 0) return starDifference;
    const updatedDifference = Date.parse(right.pushed_at) - Date.parse(left.pushed_at);
    if (updatedDifference !== 0) return updatedDifference;
    return left.name.localeCompare(right.name);
  }), [repositories]);
  const cardRepositories = sortedRepositories.slice(0, 6);
  const listedRepositories = sortedRepositories.slice(6);

  const projectDescription = (repository: GitHubRepository) => {
    const descriptionKey = getProjectDescriptionKey(repository.name);
    return descriptionKey
      ? tDescription(descriptionKey)
      : repository.description ?? tProjects("fallbackDescription");
  };

  return (
    <SubpageEntrance variant="projects">
      <Box component="main" sx={{ pt: { xs: "64px", md: "72px" } }}>
        <Box className="reveal-section" component="section" sx={{ py: { xs: 9, md: 12 } }}>
          <ScrollReveal>
            <Container maxWidth="xl">
              <SubpageBackLink label={tNav("backHome")} />
              <SectionHeading description={t("description")} eyebrow={t("eyebrow")} title={t("title")} />
              <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: { xs: "1fr", md: "repeat(12, 1fr)" } }}>
                {cardRepositories.map((repository, index) => (
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
              {listedRepositories.length > 0 && (
                <Box component="section" sx={{ mt: { xs: 6, md: 8 } }}>
                  <Typography component="h2" sx={{ fontSize: { xs: 22, md: 26 }, fontWeight: 700, mb: 2 }}>
                    {t("allProjects")}
                  </Typography>
                  <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
                    {listedRepositories.map((repository) => (
                      <Box
                        aria-label={getProjectName(repository.name)}
                        component="a"
                        href={repository.html_url}
                        key={repository.id}
                        rel="noreferrer"
                        sx={{
                          alignItems: { xs: "flex-start", md: "center" },
                          borderTop: 1,
                          borderColor: "divider",
                          cursor: "pointer",
                          display: "grid",
                          gap: { xs: 1.5, md: 3 },
                          gridTemplateColumns: { xs: "minmax(0, 1fr) auto", md: "minmax(0, 1fr) auto auto" },
                          outline: "none",
                          py: 2,
                          color: "inherit",
                          textDecoration: "none",
                          transition: "background-color 160ms ease",
                          "&:focus-visible": { bgcolor: "action.hover" },
                          "&:hover": { bgcolor: "action.hover" },
                        }}
                        target="_blank"
                      >
                        <Box sx={{ minWidth: 0 }}>
                          <Stack direction="row" sx={{ alignItems: "center", flexWrap: "wrap", gap: 1 }}>
                            <Typography className="mono" component="h3" sx={{ fontSize: 16, fontWeight: 700 }}>
                              {getProjectName(repository.name)}
                            </Typography>
                            {repository.archived && (
                              <Chip label={tProjects("archived")} size="small" variant="outlined" />
                            )}
                          </Stack>
                          <Typography color="text.secondary" sx={{ fontSize: 13.5, lineHeight: 1.55, mt: 0.5 }}>
                            {projectDescription(repository)}
                          </Typography>
                        </Box>
                        <Stack
                          direction="row"
                          sx={{
                            alignItems: "center",
                            color: "text.secondary",
                            flexWrap: "wrap",
                            gap: 1.5,
                            gridColumn: { xs: "1 / -1", md: "auto" },
                          }}
                        >
                          {repository.language && (
                            <Typography className="mono" sx={{ fontSize: 12 }}>
                              {repository.language}
                            </Typography>
                          )}
                          <Stack direction="row" spacing={0.4} sx={{ alignItems: "center" }}>
                            <StarRounded fontSize="small" />
                            <Typography className="mono" sx={{ fontSize: 12 }}>
                              {repository.stargazers_count}
                            </Typography>
                          </Stack>
                          <Stack direction="row" spacing={0.4} sx={{ alignItems: "center" }}>
                            <CallSplitRounded fontSize="small" />
                            <Typography className="mono" sx={{ fontSize: 12 }}>
                              {repository.forks_count}
                            </Typography>
                          </Stack>
                          <Typography className="mono" sx={{ fontSize: 12 }}>
                            {tProjects("updated")} {format.dateTime(new Date(repository.pushed_at), {
                              month: "short",
                              year: "numeric",
                            })}
                          </Typography>
                        </Stack>
                        <ArrowOutwardRounded
                          color="action"
                          sx={{ gridColumn: { xs: 2, md: 3 }, gridRow: 1 }}
                        />
                      </Box>
                    ))}
                  </Box>
                </Box>
              )}
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
    </SubpageEntrance>
  );
}
