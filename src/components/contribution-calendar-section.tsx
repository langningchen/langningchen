import ArrowOutwardRounded from "@mui/icons-material/ArrowOutwardRounded";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { alpha, useTheme } from "@mui/material/styles";
import { useFormatter, useTranslations } from "next-intl";
import type { ContributionCalendarData } from "@/lib/contribution-calendar";
import { groupContributionsByMonth } from "@/lib/contribution-months";
import ScrollReveal from "./scroll-reveal";

const LEVEL_OPACITIES = [0.1, 0.3, 0.5, 0.72, 1];

interface ContributionCalendarSectionProps {
  data: ContributionCalendarData;
}

interface ContributionCellProps {
  color: string;
  title?: string;
}

function ContributionCell({ color, title }: ContributionCellProps) {
  const cell = (
    <Box
      aria-label={title}
      component="span"
      sx={{
        bgcolor: color,
        borderRadius: "2px",
        display: "block",
        height: 12,
        width: 12,
      }}
    />
  );

  if (!title) return cell;

  return (
    <Tooltip
      describeChild
      disableInteractive
      enterDelay={0}
      enterNextDelay={0}
      placement="top"
      slotProps={{ transition: { timeout: 0 } }}
      title={title}
    >
      {cell}
    </Tooltip>
  );
}

export default function ContributionCalendarSection({
  data,
}: ContributionCalendarSectionProps) {
  const t = useTranslations("calendar");
  const format = useFormatter();
  const theme = useTheme();
  const levels = LEVEL_OPACITIES.map((opacity) => alpha(theme.palette.primary.main, opacity));
  const months = groupContributionsByMonth(data.contributions);
  const weekdays = Array.from({ length: 7 }, (_, index) =>
    format.dateTime(new Date(Date.UTC(2024, 0, 7 + index)), { weekday: "narrow" }),
  );

  return (
    <Box
      className="reveal-section"
      component="section"
      sx={{ bgcolor: "background.paper", borderBlock: 1, borderColor: "divider", color: "text.primary", py: { xs: 8, md: 11 } }}
    >
      <ScrollReveal variant="wipe">
        <Container maxWidth="xl">
        <Stack direction={{ xs: "column", md: "row" }} spacing={3} sx={{ alignItems: { xs: "flex-start", md: "flex-end" }, justifyContent: "space-between", mb: 4 }}>
          <Box>
            <Typography className="mono" color="primary.main" variant="overline">
              {t("eyebrow")}
            </Typography>
            <Typography component="h2" sx={{ fontSize: { xs: 34, md: 48 }, mt: 1 }} variant="h2">
              {data.total > 0 ? t("title", { count: data.total }) : t("empty")}
            </Typography>
          </Box>
          <Button
            color="primary"
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
                <Typography className="mono" color="text.secondary" key={`${weekday}-${index}`} sx={{ fontSize: 9, height: 16, lineHeight: "12px" }}>
                  {weekday}
                </Typography>
              ))}
            </Box>
            <Box sx={{ display: "flex", gap: "26px" }}>
              {months.map((month) => (
                <Box key={month.key}>
                  <Typography className="mono" color="text.secondary" sx={{ fontSize: 10, mb: 1.25 }}>
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
                            <ContributionCell
                              color={day.date ? levels[Number(day.intensity)] ?? levels[0] : "transparent"}
                              key={`${weekIndex}-${dayIndex}-${day.date}`}
                              title={title}
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
