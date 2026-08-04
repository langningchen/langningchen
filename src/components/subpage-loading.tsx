"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { useTranslations } from "next-intl";
import type { SubpageVariant } from "./subpage-entrance";

type LoadingVariant = SubpageVariant | "home";

interface SubpageLoadingProps {
  variant: LoadingVariant;
}

const ACCENTS: Record<LoadingVariant, string> = {
  community: "#87dbac",
  genshin: "#d6b96f",
  home: "#87dbac",
  projects: "#87dbac",
  starRail: "#78dcff",
};

export default function SubpageLoading({ variant }: SubpageLoadingProps) {
  const theme = useTheme();
  const tGames = useTranslations("games");
  const tCommunity = useTranslations("communityArchive");
  const tProjects = useTranslations("projectArchive");
  const title = variant === "home"
    ? "Langning Chen"
    : variant === "community"
      ? tCommunity("title")
    : variant === "projects"
      ? tProjects("title")
      : tGames(variant);
  const accent = ACCENTS[variant];
  const darkMode = theme.palette.mode === "dark";
  const technicalTheme = variant === "community" || variant === "home" || variant === "projects";
  const surface = technicalTheme
    ? theme.palette.background.default
    : variant === "genshin"
      ? darkMode ? "#101713" : "#edf3ef"
      : darkMode ? "#0b111a" : "#eef4f6";
  const foreground = technicalTheme
    ? theme.palette.text.primary
    : darkMode ? "#f4f7f6" : "#16221f";

  return (
    <Box
      aria-busy="true"
      aria-label={title}
      className={`subpage-loading subpage-loading--${variant}`}
      role="status"
      sx={{ bgcolor: surface, color: foreground }}
    >
      <Box className="subpage-loading__stage">
        <div
          className="subpage-loading__frame"
          style={{ borderColor: accent, borderRightColor: "transparent", color: accent }}
        />
        <Typography component="p" sx={{ fontSize: { xs: 24, md: 32 }, fontWeight: 800 }}>
          {title}
        </Typography>
        <Box className="subpage-loading__rail" sx={{ bgcolor: "action.selected" }}>
          <span style={{ backgroundColor: accent }} />
        </Box>
      </Box>
    </Box>
  );
}
