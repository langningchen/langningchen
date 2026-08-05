"use client";

import {
  ClockIcon,
  CommentDiscussionIcon,
  FilterIcon,
  GitPullRequestIcon,
  IssueClosedIcon,
  IssueOpenedIcon,
} from "@primer/octicons-react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useFormatter, useTranslations } from "next-intl";
import { useMemo, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import Avatar from "@mui/material/Avatar";
import FormControl from "@mui/material/FormControl";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import Stack from "@mui/material/Stack";
import TextField from "@mui/material/TextField";
import { motion, useReducedMotion } from "motion/react";
import type { ContributionRecord } from "@/lib/contributions";
import CommunityRecordItem from "./community-record-item";
import ScrollReveal from "./scroll-reveal";
import SectionHeading from "./section-heading";
import SiteFooter from "./site-footer";
import SubpageBackLink from "./subpage-back-link";
import SubpageEntrance from "./subpage-entrance";

const filterControlSx = {
  minWidth: { sm: 150 },
  width: { xs: "100%", sm: "auto" },
  "& .MuiOutlinedInput-root": { minHeight: 40, height: 40 },
  "& .MuiSelect-select": { alignItems: "center", display: "flex", gap: 0.75, py: 0 },
};

const filterOptionSx = { gap: 1 };

interface CommunityArchiveShellProps {
  records: ContributionRecord[];
}

function repositoryOwner(repository: string): string {
  return repository.split("/")[0] ?? repository;
}

export default function CommunityArchiveShell({ records }: CommunityArchiveShellProps) {
  const format = useFormatter();
  const t = useTranslations("communityArchive");
  const tNav = useTranslations("nav");
  const reduceMotion = useReducedMotion();
  const [kind, setKind] = useState<"all" | "pullRequest" | "issue">("all");
  const [state, setState] = useState<"all" | "open" | "closed">("all");
  const [repository, setRepository] = useState("all");
  const [sort, setSort] = useState<"updated" | "interactions">("updated");
  const repositories = useMemo(
    () => [...new Set(records.map((record) => record.repository))].sort((left, right) => left.localeCompare(right)),
    [records],
  );
  const repositoryOptions = useMemo(() => ["all", ...repositories], [repositories]);
  const filteredRecords = useMemo(() => {
    const filtered = records.filter((record) => {
      return (kind === "all" || record.kind === kind)
        && (state === "all" || record.state === state)
        && (repository === "all" || record.repository === repository);
    });

    return filtered.sort((left, right) => {
      const updatedDifference = Date.parse(right.updatedAt) - Date.parse(left.updatedAt);
      if (sort === "updated") return updatedDifference;
      return (right.interactions ?? 0) - (left.interactions ?? 0) || updatedDifference;
    });
  }, [kind, records, repository, sort, state]);

  return (
    <SubpageEntrance variant="community">
      <Box component="main" sx={{ pt: { xs: "64px", md: "72px" } }}>
        <Box className="reveal-section" component="section" sx={{ py: { xs: 9, md: 12 } }}>
          <ScrollReveal variant="slide-left">
            <Container maxWidth="xl">
              <SubpageBackLink label={tNav("backHome")} />
              <SectionHeading description={t("description")} eyebrow={t("eyebrow")} title={t("title")} />
              <Box
                component="section"
                aria-label={t("filters")}
                sx={{
                  alignItems: { xs: "stretch", sm: "center" },
                  borderBottom: 1,
                  borderColor: "divider",
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 1.25,
                  justifyContent: "space-between",
                  mb: 1,
                  pb: 2,
                }}
              >
                <Stack
                  direction={{ xs: "column", sm: "row" }}
                  spacing={1.25}
                  sx={{ flex: 1, flexWrap: { sm: "wrap" }, minWidth: 0 }}
                  useFlexGap
                >
                  <FormControl size="small" sx={filterControlSx}>
                    <InputLabel id="community-kind-label">{t("type")}</InputLabel>
                    <Select
                      label={t("type")}
                      labelId="community-kind-label"
                      onChange={(event) => setKind(event.target.value as typeof kind)}
                      value={kind}
                    >
                      <MenuItem sx={filterOptionSx} value="all">
                        <Box component="span" sx={{ color: "#656c76", display: "inline-flex" }}><FilterIcon size={14} /></Box>
                        {t("all")}
                      </MenuItem>
                      <MenuItem sx={filterOptionSx} value="pullRequest">
                        <Box component="span" sx={{ color: "#8957e5", display: "inline-flex" }}><GitPullRequestIcon size={14} /></Box>
                        {t("pullRequest")}
                      </MenuItem>
                      <MenuItem sx={filterOptionSx} value="issue">
                        <Box component="span" sx={{ color: "#238636", display: "inline-flex" }}><IssueOpenedIcon size={14} /></Box>
                        {t("issue")}
                      </MenuItem>
                    </Select>
                  </FormControl>
                  <FormControl size="small" sx={filterControlSx}>
                    <InputLabel id="community-state-label">{t("result")}</InputLabel>
                    <Select
                      label={t("result")}
                      labelId="community-state-label"
                      onChange={(event) => setState(event.target.value as typeof state)}
                      value={state}
                    >
                      <MenuItem sx={filterOptionSx} value="all">
                        <Box component="span" sx={{ color: "#656c76", display: "inline-flex" }}><FilterIcon size={14} /></Box>
                        {t("all")}
                      </MenuItem>
                      <MenuItem sx={filterOptionSx} value="open">
                        <Box component="span" sx={{ color: "#238636", display: "inline-flex" }}><IssueOpenedIcon size={14} /></Box>
                        {t("open")}
                      </MenuItem>
                      <MenuItem sx={filterOptionSx} value="closed">
                        <Box component="span" sx={{ color: "#8957e5", display: "inline-flex" }}><IssueClosedIcon size={14} /></Box>
                        {t("closed")}
                      </MenuItem>
                    </Select>
                  </FormControl>
                  <Autocomplete
                    disableClearable
                    getOptionLabel={(option) => option === "all" ? t("all") : option}
                    isOptionEqualToValue={(option, value) => option === value}
                    onChange={(_event, value) => setRepository(value)}
                    options={repositoryOptions}
                    renderInput={(params) => (
                      <TextField
                        {...params}
                        label={t("repository")}
                        size="small"
                      />
                    )}
                    renderOption={(props, option) => {
                      const { key, ...optionProps } = props;

                      return (
                        <Box component="li" {...optionProps} key={key ?? option} sx={{ alignItems: "center", display: "flex", gap: 1 }}>
                          {option !== "all" && (
                            <Avatar
                              alt=""
                              src={`https://github.com/${repositoryOwner(option)}.png?size=48`}
                              sx={{ height: 24, width: 24 }}
                            />
                          )}
                          {option === "all" ? t("all") : option}
                        </Box>
                      );
                    }}
                    slotProps={{
                      listbox: {
                        ...({ "data-lenis-prevent": true } as Record<string, unknown>),
                        sx: { maxHeight: 320 },
                      },
                    }}
                    sx={{
                      flex: { sm: 1 },
                      minWidth: { sm: 230 },
                      "& .MuiOutlinedInput-root": { height: 40, minHeight: 40, py: 0 },
                    }}
                    value={repositoryOptions.includes(repository) ? repository : "all"}
                  />
                  <FormControl size="small" sx={{ ...filterControlSx, minWidth: { sm: 180 } }}>
                    <InputLabel id="community-sort-label">{t("sortBy")}</InputLabel>
                    <Select
                      label={t("sortBy")}
                      labelId="community-sort-label"
                      onChange={(event) => setSort(event.target.value as typeof sort)}
                      value={sort}
                    >
                      <MenuItem sx={filterOptionSx} value="updated">
                        <ClockIcon size={14} />
                        {t("sortUpdated")}
                      </MenuItem>
                      <MenuItem sx={filterOptionSx} value="interactions">
                        <CommentDiscussionIcon size={14} />
                        {t("sortInteractions")}
                      </MenuItem>
                    </Select>
                  </FormControl>
                </Stack>
                <Typography className="mono" color="text.secondary" sx={{ fontSize: 12, whiteSpace: "nowrap" }}>
                  {t("showing", { count: filteredRecords.length })}
                </Typography>
              </Box>
              {filteredRecords.length > 0 ? filteredRecords.map((record, index) => (
                <motion.div
                  initial={reduceMotion ? false : { opacity: 0, y: 16 }}
                  key={`${record.kind}-${record.repository}-${record.number}`}
                  transition={{ delay: (index % 3) * 0.025, duration: 0.38, ease: [0.22, 1, 0.36, 1] }}
                  viewport={{ amount: 0.16, margin: "0px 0px -5% 0px", once: true }}
                  whileInView={reduceMotion ? undefined : { opacity: 1, y: 0 }}
                >
                  <CommunityRecordItem
                    record={record}
                    updatedLabel={t("updated", {
                      date: format.dateTime(new Date(record.updatedAt), {
                        day: "numeric",
                        month: "short",
                        year: "numeric",
                      }),
                    })}
                  />
                </motion.div>
              )) : (
                <Typography color="text.secondary" sx={{ py: 4 }}>
                  {records.length === 0 ? t("empty") : t("noMatches")}
                </Typography>
              )}
            </Container>
          </ScrollReveal>
        </Box>
      </Box>
      <SiteFooter />
    </SubpageEntrance>
  );
}
