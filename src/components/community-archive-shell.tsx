"use client";

import {
  GitMergeIcon,
  GitPullRequestClosedIcon,
  GitPullRequestIcon,
  IssueClosedIcon,
  IssueOpenedIcon,
  SkipIcon,
} from "@primer/octicons-react";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useFormatter, useTranslations } from "next-intl";
import type { ReactNode } from "react";
import { useMemo, useState } from "react";
import Autocomplete from "@mui/material/Autocomplete";
import Avatar from "@mui/material/Avatar";
import Checkbox from "@mui/material/Checkbox";
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

const filterOptionSx = { minHeight: 36, py: 0.25 };
const filterCheckboxSx = { ml: -0.5, mr: 0.5, p: 0.5 };

interface CommunityArchiveShellProps {
  records: ContributionRecord[];
}

type ContributionTypeFilter =
  | "issueOpen"
  | "issueClosed"
  | "issueNotPlanned"
  | "issueDuplicate"
  | "pullRequestOpen"
  | "pullRequestMerged"
  | "pullRequestClosed";

function contributionType(record: ContributionRecord): ContributionTypeFilter {
  if (record.kind === "pullRequest") {
    if (record.state === "open") return "pullRequestOpen";
    return record.closedReason === "merged"
      ? "pullRequestMerged"
      : "pullRequestClosed";
  }

  if (record.state === "open") return "issueOpen";
  if (record.closedReason === "notPlanned") return "issueNotPlanned";
  if (record.closedReason === "duplicate") return "issueDuplicate";
  return "issueClosed";
}

function repositoryOwner(repository: string): string {
  return repository.split("/")[0] ?? repository;
}

export default function CommunityArchiveShell({ records }: CommunityArchiveShellProps) {
  const format = useFormatter();
  const t = useTranslations("communityArchive");
  const tNav = useTranslations("nav");
  const reduceMotion = useReducedMotion();
  const [typeFilters, setTypeFilters] = useState<ContributionTypeFilter[]>([]);
  const [repository, setRepository] = useState("all");
  const [sort, setSort] = useState<"updated" | "interactions">("updated");
  const typeOptions = [
    { color: "#238636", icon: <IssueOpenedIcon size={16} />, label: t("types.issueOpen"), value: "issueOpen" },
    { color: "#8957e5", icon: <IssueClosedIcon size={16} />, label: t("types.issueClosed"), value: "issueClosed" },
    { color: "#656c76", icon: <SkipIcon size={16} />, label: t("types.issueNotPlanned"), value: "issueNotPlanned" },
    { color: "#656c76", icon: <SkipIcon size={16} />, label: t("types.issueDuplicate"), value: "issueDuplicate" },
    { color: "#238636", icon: <GitPullRequestIcon size={16} />, label: t("types.pullRequestOpen"), value: "pullRequestOpen" },
    { color: "#8957e5", icon: <GitMergeIcon size={16} />, label: t("types.pullRequestMerged"), value: "pullRequestMerged" },
    { color: "#da3633", icon: <GitPullRequestClosedIcon size={16} />, label: t("types.pullRequestClosed"), value: "pullRequestClosed" },
  ] satisfies Array<{
    color: string;
    icon: ReactNode;
    label: string;
    value: ContributionTypeFilter;
  }>;
  const repositories = useMemo(
    () => [...new Set(records.map((record) => record.repository))].sort((left, right) => left.localeCompare(right)),
    [records],
  );
  const repositoryOptions = useMemo(() => ["all", ...repositories], [repositories]);
  const filteredRecords = useMemo(() => {
    const filtered = records.filter((record) => {
      return (typeFilters.length === 0 || typeFilters.includes(contributionType(record)))
        && (repository === "all" || record.repository === repository);
    });

    return filtered.sort((left, right) => {
      const updatedDifference = Date.parse(right.updatedAt) - Date.parse(left.updatedAt);
      if (sort === "updated") return updatedDifference;
      return (right.interactions ?? 0) - (left.interactions ?? 0) || updatedDifference;
    });
  }, [records, repository, sort, typeFilters]);

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
                  <FormControl size="small" sx={{ ...filterControlSx, minWidth: { sm: 210 } }}>
                    <InputLabel id="community-type-label" shrink>{t("type")}</InputLabel>
                    <Select
                      displayEmpty
                      multiple
                      label={t("type")}
                      labelId="community-type-label"
                      MenuProps={{ slotProps: { list: { dense: true } } }}
                      onChange={(event) => {
                        const value = typeof event.target.value === "string"
                          ? event.target.value.split(",")
                          : event.target.value;
                        setTypeFilters(value.includes("all")
                          ? []
                          : value as ContributionTypeFilter[]);
                      }}
                      renderValue={(selected) => {
                        if (selected.length === 0) return t("all");
                        if (selected.length === 1) {
                          return typeOptions.find((option) => option.value === selected[0])?.label;
                        }
                        return t("selectedTypes", { count: selected.length });
                      }}
                      value={typeFilters}
                    >
                      <MenuItem sx={filterOptionSx} value="all">
                        <Checkbox checked={typeFilters.length === 0} size="small" sx={filterCheckboxSx} />
                        {t("all")}
                      </MenuItem>
                      {typeOptions.map((option) => (
                        <MenuItem key={option.value} sx={filterOptionSx} value={option.value}>
                          <Checkbox
                            checked={typeFilters.includes(option.value)}
                            size="small"
                            sx={filterCheckboxSx}
                          />
                          <Box
                            component="span"
                            sx={{ color: option.color, display: "inline-flex", justifyContent: "center", mr: 0.75, width: 20 }}
                          >
                            {option.icon}
                          </Box>
                          {option.label}
                        </MenuItem>
                      ))}
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
                      <MenuItem value="updated">{t("sortUpdated")}</MenuItem>
                      <MenuItem value="interactions">{t("sortInteractions")}</MenuItem>
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
