import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslations } from "next-intl";
import { GAME_GLYPH_COPY } from "@/data/game-glyph-copy";
import type { GameProfile } from "@/lib/game-data";
import CountUpValue from "./count-up-value";
import GameMetricIcon from "./game-metric-icon";
import ScrollReveal from "./scroll-reveal";

interface GameStatsProps {
  profile: GameProfile;
}

export default function GameStats({ profile }: GameStatsProps) {
  const t = useTranslations("games");
  const glyphCopy = GAME_GLYPH_COPY[profile.game];
  const isGenshin = profile.game === "genshin";
  const metrics = [
    { key: "level" as const, label: t(isGenshin ? "adventureRank" : "trailblazeLevel"), value: profile.level },
    { key: "worldLevel" as const, label: t(isGenshin ? "genshinWorldLevel" : "equilibriumLevel"), value: profile.worldLevel },
    { key: "achievements" as const, label: t("achievements"), value: profile.achievementCount },
    ...profile.extraMetrics.map((metric) => ({
      key: metric.label,
      label: t(metric.label),
      value: metric.value,
    })),
  ];

  return (
    <Box component="section" sx={{ bgcolor: "var(--game-stats)", py: { xs: 6, md: 8 } }}>
      <ScrollReveal variant="slide-left">
        <Container maxWidth="xl">
        <Typography aria-hidden="true" className="game-glyph" color="primary.main" sx={{ fontSize: { xs: 25, md: 32 } }}>
          {glyphCopy.records}
        </Typography>
        <Typography className="game-mono" color="text.secondary" sx={{ mt: 0.5 }} variant="overline">
          {t("records")}
        </Typography>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: { xs: "repeat(2, 1fr)", md: "repeat(auto-fit, minmax(140px, 1fr))" },
            mt: 2,
          }}
        >
          {metrics.map((metric, index) => (
            <Box
              key={metric.label}
              sx={{
                borderLeft: index > 0 ? { md: "1px solid var(--game-line)" } : 0,
                borderTop: index > 1 ? { xs: "1px solid var(--game-line)", md: 0 } : 0,
                minWidth: 0,
                px: { xs: 1.5, md: 2.5 },
                py: 2,
              }}
            >
              <Stack direction="row" spacing={0.75} sx={{ alignItems: "center", color: "text.secondary" }}>
                <GameMetricIcon metric={metric.key} />
                <Typography sx={{ overflowWrap: "anywhere" }} variant="body2">
                  {metric.label}
                </Typography>
              </Stack>
              <Typography className="game-mono" sx={{ fontSize: { xs: 30, md: 36 }, fontWeight: 800, mt: 1 }}>
                <CountUpValue value={metric.value} />
              </Typography>
            </Box>
          ))}
        </Box>
        </Container>
      </ScrollReveal>
    </Box>
  );
}
