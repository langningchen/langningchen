import ArrowOutwardRounded from "@mui/icons-material/ArrowOutwardRounded";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useFormatter, useTranslations } from "next-intl";
import type { ContributionCalendarData } from "@/lib/contribution-calendar";
import { groupContributionsByMonth } from "@/lib/contribution-months";
import ScrollReveal from "./scroll-reveal";

const LEVELS = [
  "rgba(135,219,172,0.10)",
  "rgba(135,219,172,0.34)",
  "rgba(135,219,172,0.55)",
  "rgba(135,219,172,0.76)",
  "#87dbac",
];

interface ContributionCalendarSectionProps {
  data: ContributionCalendarData;
}

export default function ContributionCalendarSection({
  data,
}: ContributionCalendarSectionProps) {
  const t = useTranslations("calendar");
  const format = useFormatter();
  const months = groupContributionsByMonth(data.contributions);
  const weekdays = Array.from({ length: 7 }, (_, index) =>
    format.dateTime(new Date(Date.UTC(2024, 0, 7 + index)), { weekday: "narrow" }),
  );

  return (
    <Box
      className="reveal-section"
      component="section"
      sx={{ bgcolor: "#101412", color: "#f0f0f0", py: { xs: 8, md: 11 } }}
    >
      <ScrollReveal variant="wipe">
        <Container maxWidth="xl">
        <Stack direction={{ xs: "column", md: "row" }} spacing={3} sx={{ alignItems: { xs: "flex-start", md: "flex-end" }, justifyContent: "space-between", mb: 4 }}>
          <Box>
            <Typography className="mono" sx={{ color: "#87dbac" }} variant="overline">
              {t("eyebrow")}
            </Typography>
            <Typography component="h2" sx={{ fontSize: { xs: 34, md: 48 }, mt: 1 }} variant="h2">
              {data.total > 0 ? t("title", { count: data.total }) : t("empty")}
            </Typography>
          </Box>
          <Button
            color="inherit"
            endIcon={<ArrowOutwardRounded />}
            href="https://github.com/langningchen"
            rel="noreferrer"
            target="_blank"
            variant="text"
          >
            {t("profile")}
          </Button>
        </Stack>
        <Box sx={{ overflowX: "auto", pb: 1 }}>
          <Box aria-label={t("gridLabel")} role="group" sx={{ display: "flex", gap: "10px", width: "max-content" }}>
            <Box aria-hidden="true" sx={{ pt: "25px" }}>
              {weekdays.map((weekday, index) => (
                <Typography className="mono" key={`${weekday}-${index}`} sx={{ color: "rgba(240,240,240,0.48)", fontSize: 9, height: 16, lineHeight: "12px" }}>
                  {weekday}
                </Typography>
              ))}
            </Box>
            <Box sx={{ display: "flex", gap: "26px" }}>
              {months.map((month) => (
                <Box key={month.key}>
                  <Typography className="mono" sx={{ color: "rgba(240,240,240,0.58)", fontSize: 10, mb: 1.25 }}>
                    {format.dateTime(month.date, { month: "short", year: "numeric" })}
                  </Typography>
                  <Box sx={{ display: "flex", gap: "4px" }}>
                    {month.weeks.map((week, weekIndex) => (
                      <Box key={weekIndex} sx={{ display: "grid", gap: "4px", gridTemplateRows: "repeat(7, 12px)", width: 12 }}>
                        {week.map((day, dayIndex) => {
                    const title = day.date
                      ? `${format.dateTime(new Date(`${day.date}T00:00:00Z`), { dateStyle: "medium" })}: ${t("count", { count: day.count })}`
                      : undefined;
                    return (
                      <Box
                        aria-label={title}
                        component="span"
                        key={`${weekIndex}-${dayIndex}-${day.date}`}
                        title={title}
                        sx={{
                          bgcolor: day.date ? LEVELS[Number(day.intensity)] ?? LEVELS[0] : "transparent",
                          borderRadius: "2px",
                          display: "block",
                          height: 12,
                          width: 12,
                        }}
                      />
                    );
                        })}
                      </Box>
                    ))}
                  </Box>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
        </Container>
      </ScrollReveal>
    </Box>
  );
}
