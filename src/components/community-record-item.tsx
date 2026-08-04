import ArrowOutwardRounded from "@mui/icons-material/ArrowOutwardRounded";
import CallMergeRounded from "@mui/icons-material/CallMergeRounded";
import ErrorOutlineRounded from "@mui/icons-material/ErrorOutlineRounded";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { ContributionRecord } from "@/lib/contributions";

interface CommunityRecordItemProps {
  closedLabel: string;
  issueLabel: string;
  openGitHubLabel: string;
  openLabel: string;
  pullRequestLabel: string;
  record: ContributionRecord;
  updatedLabel: string;
}

function repositoryOwner(repository: string): string {
  return repository.split("/")[0] ?? repository;
}

export default function CommunityRecordItem(props: CommunityRecordItemProps) {
  const {
    closedLabel,
    issueLabel,
    openGitHubLabel,
    openLabel,
    pullRequestLabel,
    record,
    updatedLabel,
  } = props;
  const pullRequest = record.kind === "pullRequest";

  return (
    <Box
      component="article"
      sx={{
        alignItems: { md: "center" },
        borderTop: 1,
        borderColor: "divider",
        display: "grid",
        gap: 2,
        gridTemplateColumns: { xs: "1fr", md: "minmax(0, 1fr) auto" },
        py: 2.5,
      }}
    >
      <Stack direction="row" spacing={2} sx={{ alignItems: "flex-start", minWidth: 0 }}>
        <Avatar
          alt=""
          slotProps={{ img: { decoding: "async", loading: "lazy" } }}
          src={`https://github.com/${repositoryOwner(record.repository)}.png?size=96`}
          sx={{ border: 1, borderColor: "divider", height: 44, width: 44 }}
        />
        <Box sx={{ minWidth: 0 }}>
          <Stack direction="row" sx={{ alignItems: "center", flexWrap: "wrap", gap: 0.75 }}>
            <Stack direction="row" spacing={0.5} sx={{ alignItems: "center", color: "primary.main" }}>
              {pullRequest ? <CallMergeRounded fontSize="small" /> : <ErrorOutlineRounded fontSize="small" />}
              <Typography className="mono" sx={{ fontSize: 13, fontWeight: 700 }}>
                {record.repository}
              </Typography>
            </Stack>
            <Chip label={pullRequest ? pullRequestLabel : issueLabel} size="small" variant="outlined" />
            <Chip
              color={record.state === "open" ? "primary" : "default"}
              label={record.state === "open" ? openLabel : closedLabel}
              size="small"
              variant="outlined"
            />
          </Stack>
          <Typography component="h2" sx={{ fontSize: 18, fontWeight: 700, lineHeight: 1.45, mt: 1 }}>
            {record.title}
          </Typography>
          <Typography className="mono" color="text.secondary" sx={{ fontSize: 12, mt: 0.75 }}>
            #{record.number} · {updatedLabel}
          </Typography>
        </Box>
      </Stack>
      <Button
        endIcon={<ArrowOutwardRounded />}
        href={record.url}
        rel="noreferrer"
        sx={{ justifySelf: { md: "end" } }}
        target="_blank"
        variant="text"
      >
        {openGitHubLabel}
      </Button>
    </Box>
  );
}
