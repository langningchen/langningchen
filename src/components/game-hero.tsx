import AutoAwesomeRounded from "@mui/icons-material/AutoAwesomeRounded";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { GAME_GLYPH_COPY } from "@/data/game-glyph-copy";
import type { GameProfile } from "@/lib/game-data";

interface GameHeroProps {
  profile: GameProfile;
}

export default function GameHero({ profile }: GameHeroProps) {
  const t = useTranslations("games");
  const theme = useTheme();
  const isGenshin = profile.game === "genshin";
  const usesLightForeground = isGenshin || theme.palette.mode === "dark";
  const tagline = isGenshin
    ? t("genshinTagline")
    : t("starRailTagline");
  const description = isGenshin
    ? t("genshinDescription")
    : t("starRailDescription");
  const background = isGenshin
    ? "/games/genshin-background.jpg"
    : "/games/starrail-background.jpg";
  const glyphCopy = GAME_GLYPH_COPY[profile.game];

  return (
    <Box
      component="section"
      sx={{
        bgcolor: "var(--game-hero)",
        color: usesLightForeground ? "#f4f7f6" : "text.primary",
        minHeight: "calc(100svh - 112px)",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Box
        aria-hidden="true"
        sx={{
          inset: 0,
          opacity: isGenshin ? 0.76 : theme.palette.mode === "dark" ? 0.62 : 0.18,
          position: "absolute",
        }}
      >
        <Image
          alt=""
          fill
          priority
          sizes="100vw"
          src={background}
          style={{
            filter: isGenshin ? "contrast(1.12) saturate(1.16)" : undefined,
            objectFit: "cover",
            objectPosition: "center",
          }}
        />
      </Box>
      {isGenshin && (
        <Box aria-hidden="true" sx={{ bgcolor: "rgba(5, 13, 20, 0.2)", inset: 0, position: "absolute" }} />
      )}
      <Container
        maxWidth="xl"
        sx={{
          alignItems: "center",
          display: "grid",
          minHeight: "inherit",
          position: "relative",
        }}
      >
        <Box sx={{ maxWidth: 780, py: { xs: 8, md: 10 }, position: "relative", zIndex: 2 }}>
          <Chip
            icon={<AutoAwesomeRounded />}
            label={t("profile")}
            sx={{ bgcolor: "var(--game-accent)", color: "var(--game-accent-ink)" }}
          />
          <Typography
            aria-hidden="true"
            className="game-glyph game-glyph--slogan"
            sx={{ color: isGenshin ? "#f2d88f" : "var(--game-glyph)", mt: 4 }}
          >
            {glyphCopy.slogan}
          </Typography>
          <Typography
            component="h1"
            sx={{ fontSize: { xs: 42, md: 66 }, mt: 1.5 }}
            variant="h1"
          >
            {t(profile.game)}
          </Typography>
          <Typography sx={{ fontSize: { xs: 21, md: 27 }, fontWeight: 700, mt: 2 }}>
            {tagline}
          </Typography>
          <Typography sx={{ color: usesLightForeground ? "rgba(244,247,246,0.78)" : "text.secondary", fontSize: 17, lineHeight: 1.75, maxWidth: 620, mt: 2.5 }}>
            {description}
          </Typography>
          <Stack direction="row" spacing={2} sx={{ alignItems: "center", mt: 5 }}>
            <Box sx={{ height: 96, position: "relative", width: 96 }}>
              <Image alt="" fill priority sizes="96px" src={profile.avatar} style={{ objectFit: "contain" }} />
            </Box>
            <Box>
              <Typography sx={{ fontSize: 30, fontWeight: 800 }}>
                {profile.nickname}
              </Typography>
              <Typography className="game-mono" sx={{ color: usesLightForeground ? "rgba(244,247,246,0.72)" : "text.secondary", fontWeight: 700, mt: 0.5 }}>
                UID {profile.uid}
              </Typography>
            </Box>
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
