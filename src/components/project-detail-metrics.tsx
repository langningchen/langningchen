import CallSplitRounded from "@mui/icons-material/CallSplitRounded";
import DownloadRounded from "@mui/icons-material/DownloadRounded";
import ErrorOutlineRounded from "@mui/icons-material/ErrorOutlineRounded";
import StarRounded from "@mui/icons-material/StarRounded";
import UpdateRounded from "@mui/icons-material/UpdateRounded";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useFormatter, useTranslations } from "next-intl";
import type { GitHubRepository } from "@/lib/github";
import CountUpValue from "./count-up-value";

interface ProjectDetailMetricsProps {
  installCount?: number;
  repository: GitHubRepository;
}

export default function ProjectDetailMetrics({ installCount, repository }: ProjectDetailMetricsProps) {
  const format = useFormatter();
  const t = useTranslations("projectDetails");
  const metrics = [
    { icon: <StarRounded />, label: t("stars"), value: repository.stargazers_count },
    { icon: <CallSplitRounded />, label: t("forks"), value: repository.forks_count },
    { icon: <ErrorOutlineRounded />, label: t("issues"), value: repository.open_issues_count ?? 0 },
    ...(installCount === undefined
      ? []
      : [{ icon: <DownloadRounded />, label: t("installs"), value: installCount }]),
  ];

  return (
    <Box sx={{ borderBlock: "1px solid", borderColor: "divider", display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))" }}>
      {metrics.map((metric) => (
        <Box key={metric.label} sx={{ minWidth: 0, py: 2 }}>
          <Stack direction="row" spacing={0.5} sx={{ alignItems: "center", color: "text.secondary" }}>
            {metric.icon}
            <Typography variant="caption">{metric.label}</Typography>
          </Stack>
          <Typography className="mono" sx={{ fontSize: 21, fontWeight: 750, mt: 0.5 }}>
            <CountUpValue value={metric.value} />
          </Typography>
        </Box>
      ))}
      <Box sx={{ minWidth: 0, py: 2 }}>
        <Stack direction="row" spacing={0.5} sx={{ alignItems: "center", color: "text.secondary" }}>
          <UpdateRounded />
          <Typography variant="caption">{t("updated")}</Typography>
        </Stack>
        <Typography className="mono" sx={{ fontSize: 13, fontWeight: 700, mt: 1 }}>
          {format.dateTime(new Date(repository.pushed_at), { dateStyle: "medium" })}
        </Typography>
      </Box>
    </Box>
  );
}
