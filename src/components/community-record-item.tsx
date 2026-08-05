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
        : statusKind === "notPlanned"
          ? "Closed as not planned"
          : statusKind === "duplicate" && record.duplicateOf
            ? `Closed as duplicate of #${record.duplicateOf}`
            : "Closed";
  const statusColor = {
    closed: "#8957e5",
    draft: "#656c76",
    duplicate: "#656c76",
    merged: "#8957e5",
    notPlanned: "#656c76",
    open: "#238636",
  }[statusKind];
  const statusIcon: ReactNode = statusKind === "open"
    ? pullRequest ? <GitPullRequestIcon size={14} /> : <IssueOpenedIcon size={14} />
    : statusKind === "draft"
      ? <GitPullRequestDraftIcon size={14} />
      : statusKind === "merged"
        ? <GitMergeIcon size={14} />
        : statusKind === "notPlanned" || statusKind === "duplicate"
          ? <SkipIcon size={14} />
          : pullRequest ? <GitPullRequestClosedIcon size={14} /> : <IssueClosedIcon size={14} />;
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
        alignItems: { md: "center" },
        borderTop: 1,
        borderColor: "divider",
        cursor: "pointer",
        display: "grid",
        gap: 1.25,
        gridTemplateColumns: "minmax(0, 1fr)",
        outline: "none",
        py: 1.5,
        "&:focus-visible": { bgcolor: "action.hover" },
        "&:hover": { bgcolor: "action.hover" },
      }}
      tabIndex={0}
    >
      <Stack direction="row" spacing={1} sx={{ alignItems: "flex-start", minWidth: 0 }}>
        <Box
          aria-label={statusLabel}
          component="span"
          sx={{ color: statusColor, display: "inline-flex", flex: "0 0 auto", mt: "4px" }}
          title={statusLabel}
        >
          {statusIcon}
        </Box>
        <Box sx={{ flex: 1, minWidth: 0 }}>
          <Stack direction="row" sx={{ alignItems: "baseline", flexWrap: "wrap", gap: 0.75 }}>
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
            <Typography className="mono" component="span" sx={{ color: statusColor, fontSize: 11.5, fontWeight: 700 }}>
              {statusLabel}
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
                gap: 0.45,
                minWidth: 0,
                textDecoration: "none",
                "&:hover": { color: "primary.light", textDecoration: "underline" },
              }}
              target="_blank"
            >
              {pullRequest ? <GitPullRequestIcon size={13} /> : <IssueOpenedIcon size={13} />}
              <Typography className="mono" noWrap sx={{ fontSize: 12, fontWeight: 700 }}>
                {record.repository}
              </Typography>
            </Box>
            <Typography className="mono" color="text.secondary" sx={{ fontSize: 11.5 }}>
              #{record.number} · {updatedLabel}
            </Typography>
            {(record.interactions ?? 0) > 0 && (
              <Stack direction="row" spacing={0.4} sx={{ alignItems: "center", color: "text.secondary" }}>
                <CommentIcon size={12} />
                <Typography className="mono" component="span" sx={{ fontSize: 11.5 }}>
                  {record.interactions}
                </Typography>
              </Stack>
            )}
          </Stack>
        </Box>
      </Stack>
    </Box>
  );
}
