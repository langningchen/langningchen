import ArrowOutwardRounded from "@mui/icons-material/ArrowOutwardRounded";
import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import { GitPullRequestIcon, IssueOpenedIcon } from "@primer/octicons-react";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { useTranslations } from "next-intl";
import type { ContributionProject } from "@/lib/contributions";
import ScrollReveal from "./scroll-reveal";
import SectionHeading from "./section-heading";

interface CommunitySectionProps {
  projects: ContributionProject[];
}

function repositoryOwner(projectName: string): string {
  return projectName.split("/")[0] ?? projectName;
}

export default function CommunitySection({ projects }: CommunitySectionProps) {
  const t = useTranslations("community");

  return (
    <Box className="reveal-section" component="section" sx={{ py: { xs: 9, md: 14 } }}>
      <ScrollReveal variant="slide-left">
        <Container maxWidth="xl">
        <SectionHeading description={t("description")} eyebrow={t("eyebrow")} title={t("title")} />
        <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", md: "repeat(2, 1fr)" } }}>
          {projects.map((project) => (
            <Box
              component="a"
              href={project.url}
              key={project.name}
              rel="noreferrer"
              target="_blank"
              sx={{
                alignItems: "center",
                borderTop: 1,
                borderColor: "divider",
                color: "inherit",
                display: "flex",
                gap: 2,
                justifyContent: "space-between",
                minHeight: 100,
                px: { xs: 0, md: 2 },
                textDecoration: "none",
                transition: "background-color 160ms ease",
                "&:hover": { bgcolor: "action.hover" },
              }}
            >
              <Stack direction="row" spacing={2} sx={{ alignItems: "center", minWidth: 0 }}>
                <Avatar
                  alt=""
                  slotProps={{ img: { decoding: "async", loading: "lazy" } }}
                  src={`https://github.com/${repositoryOwner(project.name)}.png?size=96`}
                  sx={{
                    bgcolor: "action.selected",
                    border: "1px solid",
                    borderColor: "divider",
                    flex: "0 0 auto",
                    height: 48,
                    width: 48,
                  }}
                />
                <Box sx={{ minWidth: 0 }}>
                  <Typography className="mono" noWrap sx={{ fontWeight: 700 }}>
                    {project.name}
                  </Typography>
                  <Stack direction="row" spacing={1.5} sx={{ color: "text.secondary", mt: 1 }}>
                    {project.pullRequests > 0 && (
                      <Stack direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
                        <GitPullRequestIcon size={16} />
                        <Typography variant="body2">{t("pullRequests", { count: project.pullRequests })}</Typography>
                      </Stack>
                    )}
                    {project.issues > 0 && (
                      <Stack direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
                        <IssueOpenedIcon size={16} />
                        <Typography variant="body2">{t("issues", { count: project.issues })}</Typography>
                      </Stack>
                    )}
                  </Stack>
                </Box>
              </Stack>
              <ArrowOutwardRounded color="action" />
            </Box>
          ))}
        </Box>
        <Box sx={{ display: "flex", justifyContent: "flex-end", mt: 3 }}>
          <Button
            component={Link}
            endIcon={<ArrowForwardRounded />}
            href="/community"
            prefetch
          >
            {t("viewMore")}
          </Button>
        </Box>
        </Container>
      </ScrollReveal>
    </Box>
  );
}
