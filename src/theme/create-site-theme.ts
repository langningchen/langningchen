import { createTheme } from "@mui/material/styles";
import type { PaletteMode } from "@mui/material";

export function createSiteTheme(mode: PaletteMode) {
  const isDark = mode === "dark";

  return createTheme({
    cssVariables: true,
    palette: {
      mode,
      background: {
        default: isDark ? "#0b0e0c" : "#f3f6f4",
        paper: isDark ? "#141816" : "#ffffff",
      },
      primary: {
        contrastText: isDark ? "#102018" : "#ffffff",
        main: isDark ? "#87dbac" : "#287356",
      },
      secondary: {
        contrastText: isDark ? "#111513" : "#ffffff",
        main: isDark ? "#f0f0f0" : "#425149",
      },
      info: {
        main: isDark ? "#61d5ff" : "#0078a4",
      },
      text: {
        primary: isDark ? "#f0f0f0" : "#17201b",
        secondary: isDark ? "#aab5af" : "#56635c",
      },
      divider: isDark ? "rgba(255,255,255,0.13)" : "rgba(20,22,18,0.16)",
    },
    shape: {
      borderRadius: 8,
    },
    typography: {
      fontFamily:
        'Inter, "Noto Sans SC", "PingFang SC", "Microsoft YaHei", Arial, sans-serif',
      h1: { fontWeight: 760, letterSpacing: 0 },
      h2: { fontWeight: 720, letterSpacing: 0 },
      h3: { fontWeight: 700, letterSpacing: 0 },
      button: { fontWeight: 700, letterSpacing: 0, textTransform: "none" },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            minHeight: 42,
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            backgroundImage: "none",
            borderRadius: 8,
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            borderRadius: 6,
            fontWeight: 650,
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            fontSize: 12,
          },
        },
      },
    },
  });
}
