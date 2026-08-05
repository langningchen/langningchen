"use client";

import { useMemo } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import type { GameProfile } from "@/lib/game-data";
import { getGameProfileImageAssets } from "@/lib/game-image-assets";
import { createGameTheme } from "@/theme/create-game-theme";
import GameHero from "./game-hero";
import GameShowcase from "./game-showcase";
import GameStats from "./game-stats";
import SubpageEntrance from "./subpage-entrance";
import ImagePreloader from "./image-preloader";

interface GamePageShellProps {
  profile: GameProfile;
}

export default function GamePageShell({ profile }: GamePageShellProps) {
  const siteTheme = useTheme();
  const mode = siteTheme.palette.mode;
  const theme = useMemo(() => createGameTheme(profile.game, mode), [mode, profile.game]);
  const primaryImageAssets = useMemo(() => getGameProfileImageAssets(profile, false), [profile]);
  const detailImageAssets = useMemo(() => getGameProfileImageAssets(profile), [profile]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <ImagePreloader assets={primaryImageAssets} batchSize={3} delayMs={220} />
      <ImagePreloader
        assets={detailImageAssets}
        batchDelayMs={140}
        batchSize={2}
        delayMs={2000}
      />
      <SubpageEntrance variant={profile.game}>
        <Box className={`game-page game-page--${profile.game} game-page--${mode}`}>
          <Box component="main" sx={{ pt: { xs: "64px", md: "72px" } }}>
            <GameHero profile={profile} />
            <GameStats profile={profile} />
            <GameShowcase profile={profile} />
          </Box>
        </Box>
      </SubpageEntrance>
    </ThemeProvider>
  );
}
