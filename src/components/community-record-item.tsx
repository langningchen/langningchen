"use client";

import type { KeyboardEvent, MouseEvent, ReactNode } from "react";
import {
  CommentIcon,
  GitMergeIcon,
  GitPullRequestClosedIcon,
  GitPullRequestDraftIcon,
  GitPullRequestIcon,
  IssueClosedIcon,
  IssueOpenedIcon,
  SkipIcon,
} from "@primer/octicons-react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { ContributionRecord } from "@/lib/contributions";

interface CommunityRecordItemProps {
  record: ContributionRecord;
  updatedLabel: string;
}

function repositoryUrl(repository: string): string {
  return `https://github.com/${repository}`;
}

export default function CommunityRecordItem(props: CommunityRecordItemProps) {
  const { record, updatedLabel } = props;
  const pullRequest = record.kind === "pullRequest";
  const statusKind = pullRequest
    ? record.draft
      ? "draft"
      : record.state === "open"
        ? "open"
        : record.closedReason === "merged"
          ? "merged"
          : "closed"
    : record.state === "open"
      ? "open"
      : record.closedReason === "notPlanned"
        ? "notPlanned"
        : record.closedReason === "duplicate"
          ? "duplicate"
          : "closed";
  const statusLabel = statusKind === "open"
    ? "Open"
    : statusKind === "draft"
      ? "Draft"
      : statusKind === "merged"
        ? "Merged"
        : "Closed";
  const statusColor = {
    closed: pullRequest ? "#da3633" : "#8957e5",
    draft: "#656c76",
    duplicate: "#656c76",
    merged: "#8957e5",
    notPlanned: "#656c76",
    open: "#238636",
  }[statusKind];
  const statusIcon: ReactNode = statusKind === "open"
    ? pullRequest ? <GitPullRequestIcon size={18} /> : <IssueOpenedIcon size={18} />
    : statusKind === "draft"
      ? <GitPullRequestDraftIcon size={18} />
      : statusKind === "merged"
        ? <GitMergeIcon size={18} />
        : statusKind === "notPlanned" || statusKind === "duplicate"
          ? <SkipIcon size={18} />
          : pullRequest ? <GitPullRequestClosedIcon size={18} /> : <IssueClosedIcon size={18} />;
  const openRecord = () => {
    window.open(record.url, "_blank", "noopener,noreferrer");
  };
  const handleClick = (event: MouseEvent<HTMLElement>) => {
    if ((event.target as HTMLElement).closest("a,button")) return;
    openRecord();
  };
  const handleKeyDown = (event: KeyboardEvent<HTMLElement>) => {
    if (event.key !== "Enter" && event.key !== " ") return;
    event.preventDefault();
    openRecord();
  };

  return (
    <Box
      aria-label={record.title}
      component="article"
      onClick={handleClick}
      onKeyDown={handleKeyDown}
      role="link"
      sx={{
        borderTop: 1,
        borderColor: "divider",
        cursor: "pointer",
        display: "grid",
        gap: 1,
        gridTemplateColumns: "auto minmax(0, 1fr) auto",
        outline: "none",
        py: 1.5,
        "&:focus-visible": { bgcolor: "action.hover" },
        "&:hover": { bgcolor: "action.hover" },
      }}
      tabIndex={0}
    >
      <Box
        aria-label={statusLabel}
        component="span"
        sx={{ alignSelf: "center", color: statusColor, display: "inline-flex", ml: 1 }}
        title={statusLabel}
      >
        {statusIcon}
      </Box>
      <Box sx={{ minWidth: 0 }}>
        <Stack direction="row" sx={{ alignItems: "center" }}>
          <Typography
            component="a"
            href={record.url}
            onClick={(event) => event.stopPropagation()}
            rel="noreferrer"
            sx={{
              color: "inherit",
              display: "inline-block",
              fontSize: { xs: 16, sm: 17 },
              fontWeight: 700,
              lineHeight: 1.35,
              maxWidth: "100%",
              overflowWrap: "anywhere",
              textDecoration: "none",
              "&:hover": { color: "primary.main" },
            }}
            target="_blank"
          >
            {record.title}
          </Typography>
        </Stack>
        <Stack direction="row" sx={{ alignItems: "center", flexWrap: "wrap", gap: 0.75, mt: 0.45 }}>
          <Box
            component="a"
            href={repositoryUrl(record.repository)}
            onClick={(event) => event.stopPropagation()}
            rel="noreferrer"
            sx={{
              alignItems: "center",
              color: "primary.main",
              display: "inline-flex",
              minWidth: 0,
              textDecoration: "none",
              "&:hover": { color: "primary.light", textDecoration: "underline" },
            }}
            target="_blank"
          >
            <Typography className="mono" noWrap sx={{ fontSize: 12, fontWeight: 700 }}>
              {record.repository}
            </Typography>
          </Box>
          <Typography className="mono" color="text.secondary" sx={{ fontSize: 11.5 }}>
            #{record.number} · {updatedLabel}
          </Typography>
        </Stack>
      </Box>
      <Stack
        direction="row"
        spacing={0.4}
        sx={{ alignItems: "center", alignSelf: "stretch", color: "text.secondary", justifyContent: "center", mr: 1 }}
      >
        <CommentIcon size={14} />
        <Typography className="mono" component="span" sx={{ fontSize: 11.5 }}>
          {record.interactions ?? 0}
        </Typography>
      </Stack>
    </Box>
  );
}
