"use client";

import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { Route } from "next";
import Link from "next/link";
import { useTranslations } from "next-intl";
import type { GameId } from "@/lib/game-types";
import { getGameRouteImageAssets } from "@/lib/game-image-assets";
import { preloadImages } from "@/lib/image-preloader";
import Image from "./progressive-image";

interface GamePortalPanelProps {
  game: GameId;
}

export default function GamePortalPanel({ game }: GamePortalPanelProps) {
  const t = useTranslations("games");
  const isGenshin = game === "genshin";
  const href = isGenshin ? "/games/genshin/" : "/games/star-rail/";
  const image = isGenshin ? "/games/genshin-portal.jpg" : "/games/starrail-portal.jpg";
  const accent = isGenshin ? "#b99a58" : "#5aa9c4";
  const description = isGenshin ? t("genshinDescription") : t("starRailDescription");
  const uid = isGenshin ? "302368983" : "161319930";
  const preloadCharacterArt = () => {
    preloadImages(getGameRouteImageAssets(game, true), {
      batchSize: 3,
      immediate: true,
    });
  };

  return (
    <Box
      component={Link}
      href={href as Route}
      onFocus={preloadCharacterArt}
      onPointerEnter={preloadCharacterArt}
      onTouchStart={preloadCharacterArt}
      prefetch
      sx={{
        bgcolor: "background.default",
        border: 1,
        borderColor: "divider",
        borderRadius: 1,
        color: "text.primary",
        display: "grid",
        gridTemplateColumns: { xs: "1fr", sm: "156px minmax(0, 1fr)", lg: "180px minmax(0, 1fr)" },
        minHeight: { xs: 360, sm: 330 },
        overflow: "hidden",
        position: "relative",
        textDecoration: "none",
        transition: "border-color 180ms ease, transform 180ms ease",
        "&:hover": {
          borderColor: "primary.main",
          transform: "translateY(-3px)",
        },
        "&:hover .game-portal-arrow": { transform: "translateX(4px)" },
      }}
    >
      <Box sx={{ bgcolor: "action.hover", display: "grid", minHeight: { xs: 150, sm: "100%" }, placeItems: "center", p: 2.5 }}>
        <Box sx={{ aspectRatio: "1 / 1", borderRadius: 1, maxWidth: 132, overflow: "hidden", position: "relative", width: "100%" }}>
          <Image alt="" fill sizes="132px" src={image} style={{ objectFit: "cover" }} />
        </Box>
      </Box>
      <Box sx={{ display: "flex", flexDirection: "column", minWidth: 0, p: { xs: 3, lg: 4 } }}>
        <Typography className="mono" sx={{ color: accent, fontWeight: 750 }} variant="overline">
          UID {uid}
        </Typography>
        <Typography component="h3" sx={{ fontSize: { xs: 28, lg: 34 }, mt: 1 }} variant="h3">
          {t(game)}
        </Typography>
        <Typography color="text.secondary" sx={{ lineHeight: 1.7, mt: 1.5 }}>
          {description}
        </Typography>
        <Stack direction="row" spacing={1} sx={{ alignItems: "center", color: "primary.main", mt: "auto", pt: 3 }}>
          <Typography sx={{ fontWeight: 750 }}>{t("openProfile")}</Typography>
          <ArrowForwardRounded className="game-portal-arrow" sx={{ transition: "transform 180ms ease" }} />
        </Stack>
      </Box>
      <Box sx={{ bgcolor: accent, height: 4, left: 0, position: "absolute", right: 0, top: 0 }} />
    </Box>
  );
}
