import type { GameId } from "@/lib/game-types";
import type { PaletteMode } from "@mui/material";
import { createTheme } from "@mui/material/styles";

const GAME_PALETTES = {
  genshin: {
    dark: {
      accent: "#d6b96f",
      background: "#101713",
      contrastText: "#1a160c",
      divider: "rgba(214, 185, 111, 0.2)",
      ink: "#f1f6f3",
      paper: "#18211d",
      secondary: "#79aeb4",
      secondaryText: "#a9b9b1",
    },
    light: {
      accent: "#94742f",
      background: "#eaf2ef",
      contrastText: "#ffffff",
      divider: "rgba(44, 72, 67, 0.18)",
      ink: "#243c39",
      paper: "#f7faf8",
      secondary: "#4c7880",
      secondaryText: "#60716d",
    },
  },
  starRail: {
    dark: {
      accent: "#78dcff",
      background: "#0d131d",
      contrastText: "#10212a",
      divider: "rgba(120, 220, 255, 0.2)",
      ink: "#f1f7fa",
      paper: "#151f2b",
      secondary: "#f1ca68",
      secondaryText: "#9eb1bd",
    },
    light: {
      accent: "#287f9d",
      background: "#edf3f5",
      contrastText: "#ffffff",
      divider: "rgba(40, 127, 157, 0.2)",
      ink: "#17242b",
      paper: "#f8fafb",
      secondary: "#98731d",
      secondaryText: "#526a75",
    },
  },
} as const;

export function createGameTheme(game: GameId, mode: PaletteMode) {
  const colors = GAME_PALETTES[game][mode];
  const isStarRail = game === "starRail";

  return createTheme({
    cssVariables: true,
    palette: {
      mode,
      background: {
        default: colors.background,
        paper: colors.paper,
      },
      primary: {
        contrastText: colors.contrastText,
        main: colors.accent,
      },
      secondary: {
        contrastText: mode === "dark" ? "#17130a" : "#ffffff",
        main: colors.secondary,
      },
      text: {
        primary: colors.ink,
        secondary: colors.secondaryText,
      },
      divider: colors.divider,
    },
    shape: { borderRadius: 6 },
    typography: {
      fontFamily: isStarRail
        ? '"Star Rail UI", "Noto Sans SC", "Microsoft YaHei", sans-serif'
        : '"Genshin UI", "Noto Sans SC", "Microsoft YaHei", sans-serif',
      h1: { fontWeight: 700, letterSpacing: 0 },
      h2: { fontWeight: 700, letterSpacing: 0 },
      h3: { fontWeight: 700, letterSpacing: 0 },
      button: { fontWeight: 700, letterSpacing: 0, textTransform: "none" },
    },
    components: {
      MuiButton: {
        styleOverrides: { root: { borderRadius: 6, minHeight: 42 } },
      },
      MuiCard: {
        styleOverrides: {
          root: { backgroundImage: "none", borderRadius: 6 },
        },
      },
      MuiChip: {
        styleOverrides: { root: { borderRadius: 4, fontWeight: 700 } },
      },
    },
  });
}
