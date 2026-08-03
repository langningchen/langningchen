import CallSplitRounded from "@mui/icons-material/CallSplitRounded";
import DownloadRounded from "@mui/icons-material/DownloadRounded";
import StarRounded from "@mui/icons-material/StarRounded";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useFormatter } from "next-intl";
import { useTranslations } from "next-intl";
import { getProjectDescriptionKey } from "@/data/project-copy";
import { getProjectName } from "@/data/project-copy";
import type { GitHubRepository } from "@/lib/github";
import { PROJECT_MEDIA } from "@/lib/github";
import { MARKETPLACE_URL } from "@/lib/marketplace";
import ProjectActions from "./project-actions";
import ProjectMedia from "./project-media";
import CountUpValue from "./count-up-value";

interface ProjectCardProps {
  featured?: boolean;
  index: number;
  installCount?: number;
  onOpen: (repository: GitHubRepository) => void;
  repository: GitHubRepository;
  showStatus?: boolean;
}

const LANGUAGE_COLORS: Record<string, string> = {
  "C++": "#f05c82",
  JavaScript: "#f0cf4f",
  Python: "#4f8fc9",
  TypeScript: "#4799d6",
};

export default function ProjectCard({
  featured,
  index,
  installCount,
  onOpen,
  repository,
  showStatus = true,
}: ProjectCardProps) {
  const t = useTranslations("projects");
  const tDescription = useTranslations("projectDescriptions");
  const format = useFormatter();
  const media = PROJECT_MEDIA[repository.name.toLowerCase()];
  const isFeatured = featured ?? index < 2;
  const languageColor = LANGUAGE_COLORS[repository.language ?? ""] ?? "#8d9489";
  const status = showStatus
    ? index === 0 ? t("current") : index === 1 ? t("previous") : null
    : null;
  const descriptionKey = getProjectDescriptionKey(repository.name);
  const mediaLabel = descriptionKey === "cphNg" ? t("cphMedia") : t("xmojMedia");
  const description = descriptionKey
    ? tDescription(descriptionKey)
    : repository.description ?? t("fallbackDescription");

  return (
    <Card
      className="project-card"
      component="article"
      onClick={() => onOpen(repository)}
      onKeyDown={(event) => {
        if (event.currentTarget !== event.target) return;
        if (event.key === "Enter" || event.key === " ") onOpen(repository);
      }}
      role="button"
      tabIndex={0}
      variant="outlined"
      sx={{
        display: "flex",
        flexDirection: "column",
        gridColumn: {
          xs: "1 / -1",
          md: isFeatured ? "span 6" : "span 4",
        },
        minHeight: isFeatured ? 610 : 390,
        overflow: "hidden",
        cursor: "pointer",
        transition: "border-color 180ms ease, transform 180ms ease",
        "&:hover": {
          borderColor: "primary.main",
          transform: "translateY(-3px)",
        },
      }}
    >
      <ProjectMedia
        accent={languageColor}
        featured={isFeatured}
        label={mediaLabel}
        media={media}
      />
      <CardContent sx={{ display: "flex", flexDirection: "column", flexGrow: 1, p: { xs: 2.5, md: 3 } }}>
        <Stack direction="row" spacing={1} sx={{ alignItems: "center", flexWrap: "wrap", gap: 1, mb: 2 }}>
          {status && <Chip color={index === 0 ? "primary" : "secondary"} label={status} size="small" />}
          {repository.archived && <Chip label={t("archived")} size="small" variant="outlined" />}
        </Stack>
        <Typography component="h3" sx={{ fontSize: isFeatured ? 30 : 24, mb: 1.5 }} variant="h3">
          {getProjectName(repository.name)}
        </Typography>
        <Typography color="text.secondary" sx={{ flexGrow: 1, lineHeight: 1.7 }}>
          {description}
        </Typography>
        {repository.topics.length > 0 && (
          <Stack direction="row" sx={{ flexWrap: "wrap", gap: 0.75, mt: 2 }}>
            {repository.topics.slice(0, 3).map((topic) => (
              <Chip key={topic} label={topic} size="small" variant="outlined" />
            ))}
          </Stack>
        )}
        <Stack direction="row" spacing={2} sx={{ alignItems: "center", flexWrap: "wrap", gap: 1.5, my: 2.5 }}>
          {repository.language && (
            <Stack direction="row" spacing={0.75} sx={{ alignItems: "center" }}>
              <Box sx={{ bgcolor: languageColor, borderRadius: "50%", height: 10, width: 10 }} />
              <Typography color="text.secondary" variant="body2">
                {repository.language}
              </Typography>
            </Stack>
          )}
          <Stack direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
            <StarRounded color="action" fontSize="small" />
            <Typography color="text.secondary" variant="body2">
              <CountUpValue value={repository.stargazers_count} />
            </Typography>
          </Stack>
          <Stack direction="row" spacing={0.5} sx={{ alignItems: "center" }}>
            <CallSplitRounded color="action" fontSize="small" />
            <Typography color="text.secondary" variant="body2">
              <CountUpValue value={repository.forks_count} />
            </Typography>
          </Stack>
          {installCount !== undefined && (
            <Stack
              component="a"
              direction="row"
              href={MARKETPLACE_URL}
              onClick={(event) => event.stopPropagation()}
              rel="noreferrer"
              spacing={0.5}
              sx={{ alignItems: "center", color: "primary.main", textDecoration: "none" }}
              target="_blank"
            >
              <DownloadRounded fontSize="small" />
              <Typography color="inherit" variant="body2">
                <CountUpValue value={installCount} /> {t("installs")}
              </Typography>
            </Stack>
          )}
          <Typography color="text.secondary" variant="body2">
            {t("updated")} {format.dateTime(new Date(repository.pushed_at), { month: "short", year: "numeric" })}
          </Typography>
        </Stack>
        <ProjectActions
          homepage={repository.homepage}
          legacySource={repository.legacy_url}
          source={repository.html_url}
        />
      </CardContent>
    </Card>
  );
}
