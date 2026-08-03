import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useTranslations } from "next-intl";
import type { GitHubProfile, LanguageStat } from "@/lib/github";
import type { WakaTimeData } from "@/lib/wakatime";
import DataChartPanel from "./data-chart-panel";
import GitHubProfileCard from "./github-profile-card";
import ScrollReveal from "./scroll-reveal";
import SectionHeading from "./section-heading";
import StatMetric from "./stat-metric";

interface GitHubPulseSectionProps {
  languages: LanguageStat[];
  profile: GitHubProfile;
  totalStars: number;
  wakaTime: WakaTimeData;
}

export default function GitHubPulseSection({
  languages,
  profile,
  totalStars,
  wakaTime,
}: GitHubPulseSectionProps) {
  const t = useTranslations("pulse");
  const startYear = new Date(profile.created_at).getUTCFullYear();
  const profileUrl = profile.html_url;

  return (
    <Box
      className="reveal-section"
      component="section"
      id="open-source"
      sx={{ bgcolor: "background.paper", borderBlock: 1, borderColor: "divider", py: { xs: 9, md: 14 } }}
    >
      <ScrollReveal variant="scale">
        <Container maxWidth="xl">
        <SectionHeading description={t("description")} eyebrow={t("eyebrow")} title={t("title")} />
        <Box
          sx={{
            display: "grid",
            gap: { xs: 3, md: 4 },
            gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(3, 1fr)", xl: "repeat(5, 1fr)" },
            mb: { xs: 5, md: 7 },
          }}
        >
          <StatMetric href={`${profileUrl}?tab=repositories`} label={t("repositories")} value={profile.public_repos} />
          <StatMetric href="https://github.com/search?q=user%3Alangningchen&type=repositories&s=stars&o=desc" label={t("stars")} value={totalStars} />
          <StatMetric href={`${profileUrl}?tab=followers`} label={t("followers")} value={profile.followers} />
          <StatMetric href="https://gist.github.com/langningchen" label={t("gists")} value={profile.public_gists} />
          <StatMetric href={profileUrl} label={t("since")} value={startYear} />
        </Box>
        <GitHubProfileCard profile={profile} />
        <Box sx={{ display: "grid", gap: { xs: 5, md: 4 }, gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" } }}>
          <DataChartPanel
            data={languages}
            label={t("languages")}
            meta={[t("githubApi"), t("selectedRepositories")]}
          />
          <DataChartPanel
            data={wakaTime.languages}
            label={t("focus")}
            meta={[wakaTime.total, `${t("dailyAverage")} ${wakaTime.dailyAverage}`]}
            valuesArePercentages
          />
        </Box>
        </Container>
      </ScrollReveal>
    </Box>
  );
}
