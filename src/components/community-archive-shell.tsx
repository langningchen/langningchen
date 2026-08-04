"use client";

import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useFormatter, useTranslations } from "next-intl";
import type { ContributionRecord } from "@/lib/contributions";
import CommunityRecordItem from "./community-record-item";
import ScrollReveal from "./scroll-reveal";
import SectionHeading from "./section-heading";
import SiteFooter from "./site-footer";
import SubpageBackLink from "./subpage-back-link";
import SubpageEntrance from "./subpage-entrance";

interface CommunityArchiveShellProps {
  records: ContributionRecord[];
}

export default function CommunityArchiveShell({ records }: CommunityArchiveShellProps) {
  const format = useFormatter();
  const t = useTranslations("communityArchive");
  const tNav = useTranslations("nav");

  return (
    <SubpageEntrance variant="community">
      <Box component="main" sx={{ pt: { xs: "64px", md: "72px" } }}>
        <Box className="reveal-section" component="section" sx={{ py: { xs: 9, md: 12 } }}>
          <ScrollReveal variant="slide-left">
            <Container maxWidth="xl">
              <SubpageBackLink label={tNav("backHome")} />
              <SectionHeading description={t("description")} eyebrow={t("eyebrow")} title={t("title")} />
              {records.length > 0 ? records.map((record) => (
                <CommunityRecordItem
                  closedLabel={t("closed")}
                  issueLabel={t("issue")}
                  key={`${record.kind}-${record.repository}-${record.number}`}
                  openGitHubLabel={t("openGitHub")}
                  openLabel={t("open")}
                  pullRequestLabel={t("pullRequest")}
                  record={record}
                  updatedLabel={t("updated", {
                    date: format.dateTime(new Date(record.updatedAt), {
                      day: "numeric",
                      month: "short",
                      year: "numeric",
                    }),
                  })}
                />
              )) : (
                <Typography color="text.secondary">{t("empty")}</Typography>
              )}
            </Container>
          </ScrollReveal>
        </Box>
      </Box>
      <SiteFooter />
    </SubpageEntrance>
  );
}
