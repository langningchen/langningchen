import CloseRounded from "@mui/icons-material/CloseRounded";
import GitHub from "@mui/icons-material/GitHub";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useTranslations } from "next-intl";
import type { GitHubRepository } from "@/lib/github";
import { repositoryFullName } from "@/lib/github";
import type { ProjectDetailsData } from "@/lib/project-details";
import ActivitySparkline from "./activity-sparkline";
import LanguageBreakdown from "./language-breakdown";
import ProjectDetailMetrics from "./project-detail-metrics";

interface ProjectDetailsDrawerProps {
  details: ProjectDetailsData;
  installCount?: number;
  onClose: () => void;
  repository: GitHubRepository | null;
}

export default function ProjectDetailsDrawer({
  details,
  installCount,
  onClose,
  repository,
}: ProjectDetailsDrawerProps) {
  const t = useTranslations("projectDetails");

  return (
    <Drawer
      anchor="right"
      onClose={onClose}
      open={repository !== null}
      slotProps={{
        paper: {
          sx: { p: { xs: 2.5, md: 4 }, width: "min(94vw, 640px)" },
        },
      }}
    >
      {repository && (
        <Stack data-lenis-prevent spacing={4}>
          <Stack direction="row" sx={{ alignItems: "flex-start", justifyContent: "space-between" }}>
            <Box>
              <Typography className="mono" color="primary.main" variant="overline">
                {repositoryFullName(repository)}
              </Typography>
              <Typography component="h2" sx={{ fontSize: { xs: 30, md: 38 }, mt: 0.5 }} variant="h2">
                {repository.name}
              </Typography>
            </Box>
            <Tooltip title={t("close")}>
              <IconButton aria-label={t("close")} onClick={onClose}>
                <CloseRounded />
              </IconButton>
            </Tooltip>
          </Stack>

          <Stack direction="row" sx={{ alignItems: "center", flexWrap: "wrap", gap: 1 }}>
            <Chip
              color={repository.archived ? "default" : "primary"}
              label={repository.archived ? t("archived") : t("active")}
              size="small"
              variant="outlined"
            />
            {repository.topics.map((topic) => (
              <Chip key={topic} label={topic} size="small" variant="outlined" />
            ))}
          </Stack>

          <ProjectDetailMetrics installCount={installCount} repository={repository} />

          <Box>
            <Typography component="h3" sx={{ mb: 2 }} variant="h6">
              {t("activity")}
            </Typography>
            <ActivitySparkline values={details.activity} />
            <Typography color="text.secondary" variant="body2">
              {t("activityCaption")}
            </Typography>
          </Box>
          <Box>
            <Typography component="h3" sx={{ mb: 2 }} variant="h6">
              {t("languages")}
            </Typography>
            <LanguageBreakdown data={details.languages} />
          </Box>
          <Box>
            <Typography component="h3" sx={{ mb: 2 }} variant="h6">
              {t("contributors")}
            </Typography>
            <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1.5 }}>
              {details.contributors.map((contributor) => (
                <Tooltip key={contributor.login} title={`${contributor.login} · ${contributor.contributions}`}>
                  <Avatar
                    alt={contributor.login}
                    component="a"
                    href={contributor.html_url}
                    src={contributor.avatar_url}
                    sx={{ height: 42, width: 42 }}
                  />
                </Tooltip>
              ))}
            </Stack>
          </Box>
          <Box>
            <Typography component="h3" sx={{ mb: 1.5 }} variant="h6">
              {t("readme")}
            </Typography>
            <Typography color="text.secondary" sx={{ lineHeight: 1.75 }}>
              {details.readme || repository.description || t("noReadme")}
            </Typography>
          </Box>
          <Button
            color="primary"
            href={repository.html_url}
            rel="noreferrer"
            startIcon={<GitHub />}
            target="_blank"
            variant="contained"
          >
            {t("openGitHub")}
          </Button>
        </Stack>
      )}
    </Drawer>
  );
}
