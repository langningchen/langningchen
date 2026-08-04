import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslations } from "next-intl";
import { getGameRankIcons } from "@/data/game-ranks";
import type { GameId } from "@/lib/game-types";
import Image from "./progressive-image";

interface GameRankTrackProps {
  characterId: string;
  game: GameId;
  icons?: string[];
  rank: number;
}

export default function GameRankTrack({ characterId, game, icons, rank }: GameRankTrackProps) {
  const t = useTranslations("games");
  const rankIcons = icons?.length === 6
    ? icons
    : getGameRankIcons(game, characterId);

  if (rankIcons.length !== 6) return null;

  return (
    <Box>
      <Stack direction="row" sx={{ alignItems: "baseline", justifyContent: "space-between" }}>
        <Typography color="text.primary" variant="overline">
          {t(game === "genshin" ? "constellation" : "eidolon")}
        </Typography>
        <Typography className="game-mono" color="text.secondary" variant="caption">
          {t("rankProgress", { rank })}
        </Typography>
      </Stack>
      <Box
        sx={{
          display: "grid",
          gap: 0.75,
          gridTemplateColumns: "repeat(6, minmax(0, 1fr))",
          mt: 0.75,
        }}
      >
        {rankIcons.map((icon, index) => {
          const unlocked = index < rank;
          return (
            <Box
              aria-label={t(unlocked ? "rankUnlocked" : "rankLocked", { rank: index + 1 })}
              key={icon}
              sx={{
                alignItems: "center",
                display: "flex",
                justifyContent: "center",
                minWidth: 0,
                position: "relative",
              }}
              title={t(unlocked ? "rankUnlocked" : "rankLocked", { rank: index + 1 })}
            >
              <Box
                sx={{
                  bgcolor: "var(--game-icon-surface)",
                  border: "1px solid",
                  borderColor: unlocked ? "var(--game-accent)" : "var(--game-line)",
                  borderRadius: "50%",
                  height: { xs: 42, sm: 46 },
                  overflow: "hidden",
                  position: "relative",
                  transition: "opacity 180ms ease, border-color 180ms ease",
                  width: { xs: 42, sm: 46 },
                  zIndex: 1,
                }}
              >
                <Image
                  alt=""
                  fill
                  sizes="52px"
                  src={icon}
                  style={{
                    filter: unlocked ? "none" : "grayscale(1)",
                    objectFit: "contain",
                    opacity: unlocked ? 1 : 0.48,
                    padding: 5,
                  }}
                />
              </Box>
              <Box
                sx={{
                  alignItems: "center",
                  bgcolor: unlocked ? "var(--game-accent)" : "background.paper",
                  border: "1px solid",
                  borderColor: unlocked ? "var(--game-accent)" : "var(--game-line)",
                  borderRadius: "50%",
                  bottom: -2,
                  color: unlocked ? "var(--game-accent-ink)" : "text.secondary",
                  display: "flex",
                  height: 17,
                  justifyContent: "center",
                  position: "absolute",
                  right: 0,
                  width: 17,
                  zIndex: 2,
                }}
              >
                {unlocked
                  ? <CheckRounded sx={{ fontSize: 12 }} />
                  : <LockRounded sx={{ fontSize: 10 }} />}
              </Box>
            </Box>
          );
        })}
      </Box>
    </Box>
  );
}
import CheckRounded from "@mui/icons-material/CheckRounded";
import LockRounded from "@mui/icons-material/LockRounded";
