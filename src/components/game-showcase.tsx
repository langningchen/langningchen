"use client";

import { useState } from "react";
import StarRounded from "@mui/icons-material/StarRounded";
import Box from "@mui/material/Box";
import Card from "@mui/material/Card";
import CardActionArea from "@mui/material/CardActionArea";
import CardContent from "@mui/material/CardContent";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useLocale, useTranslations } from "next-intl";
import { GAME_GLYPH_COPY } from "@/data/game-glyph-copy";
import type { GameProfile } from "@/lib/game-data";
import { getGameCharacterImageAssets } from "@/lib/game-image-assets";
import { preloadImages } from "@/lib/image-preloader";
import type { GameCharacter } from "@/lib/game-types";
import GameCharacterDrawer from "./game-character-drawer";
import Image from "./progressive-image";
import ScrollReveal from "./scroll-reveal";

interface GameShowcaseProps {
  profile: GameProfile;
}

export default function GameShowcase({ profile }: GameShowcaseProps) {
  const locale = useLocale() as "en" | "zh";
  const t = useTranslations("games");
  const glyphCopy = GAME_GLYPH_COPY[profile.game];
  const [selectedCharacter, setSelectedCharacter] = useState<GameCharacter | null>(null);
  const preloadCharacter = (character: GameCharacter) => {
    preloadImages(getGameCharacterImageAssets(character), {
      batchDelayMs: 60,
      batchSize: 4,
      immediate: true,
    });
  };

  return (
    <Box component="section" sx={{ bgcolor: "var(--game-showcase)", py: { xs: 9, md: 13 } }}>
      <ScrollReveal variant="scale">
        <Container maxWidth="xl">
        <Typography aria-hidden="true" className="game-glyph" color="primary.main" sx={{ fontSize: { xs: 34, md: 50 } }}>
          {glyphCopy.showcase}
        </Typography>
        <Typography color="text.secondary" component="h2" sx={{ fontSize: { xs: 21, md: 25 }, mt: 0.75 }} variant="h2">
          {t("showcase")}
        </Typography>
        <Typography color="text.secondary" sx={{ fontSize: 16, lineHeight: 1.7, maxWidth: 720, mt: 2 }}>
          {t("showcaseDescription")}
        </Typography>
        <Box
          sx={{
            display: "grid",
            gap: 2,
            gridTemplateColumns: { xs: "repeat(2, 1fr)", sm: "repeat(3, 1fr)", lg: "repeat(auto-fit, minmax(150px, 1fr))" },
            mt: 5,
          }}
        >
          {profile.showcase.map((character) => (
            <Card className="game-character-card" key={character.id} variant="outlined">
              <CardActionArea
                aria-label={t("openCharacterDetails", { name: character.name[locale] })}
                onClick={() => setSelectedCharacter(character)}
                onFocus={() => preloadCharacter(character)}
                onPointerEnter={() => preloadCharacter(character)}
                onTouchStart={() => preloadCharacter(character)}
              >
                <Box sx={{ alignItems: "center", aspectRatio: "1 / 1", bgcolor: "var(--game-portrait)", display: "flex", justifyContent: "center" }}>
                  <Box sx={{ height: { xs: 88, sm: 112 }, position: "relative", width: { xs: 88, sm: 112 } }}>
                    <Image
                      alt={character.name[locale]}
                      fill
                      sizes="112px"
                      src={character.image}
                      style={{ objectFit: "contain" }}
                    />
                  </Box>
                </Box>
                <CardContent sx={{ p: 2, "&:last-child": { pb: 2 } }}>
                  <Typography sx={{ fontWeight: 800, overflowWrap: "anywhere" }}>
                    {character.name[locale]}
                  </Typography>
                  <Stack direction="row" spacing={0.5} sx={{ alignItems: "center", color: "primary.main", mt: 0.75 }}>
                    <StarRounded sx={{ fontSize: 16 }} />
                    <Typography className="game-mono" variant="body2">
                      {t("levelShort")} {character.level}
                    </Typography>
                  </Stack>
                </CardContent>
              </CardActionArea>
            </Card>
          ))}
        </Box>
        <Typography color="text.secondary" sx={{ fontSize: 12, mt: 4 }}>
          {t("source")}
        </Typography>
        </Container>
      </ScrollReveal>
      <GameCharacterDrawer character={selectedCharacter} game={profile.game} onClose={() => setSelectedCharacter(null)} />
    </Box>
  );
}
