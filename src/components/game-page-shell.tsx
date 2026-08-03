"use client";

import { useMemo } from "react";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { useTheme } from "@mui/material/styles";
import type { GameProfile } from "@/lib/game-data";
import { createGameTheme } from "@/theme/create-game-theme";
import GameHero from "./game-hero";
import GameShowcase from "./game-showcase";
import GameStats from "./game-stats";

interface GamePageShellProps {
  profile: GameProfile;
}

export default function GamePageShell({ profile }: GamePageShellProps) {
  const siteTheme = useTheme();
  const mode = siteTheme.palette.mode;
  const theme = useMemo(() => createGameTheme(profile.game, mode), [mode, profile.game]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <Box className={`game-page game-page--${profile.game} game-page--${mode}`}>
        <Box component="main" sx={{ pt: { xs: "64px", md: "72px" } }}>
          <GameHero profile={profile} />
          <GameStats profile={profile} />
          <GameShowcase profile={profile} />
        </Box>
      </Box>
    </ThemeProvider>
  );
}
