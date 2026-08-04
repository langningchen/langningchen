import StarRounded from "@mui/icons-material/StarRounded";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useFormatter, useMessages, useTranslations } from "next-intl";
import type { GameId, GameRelic, GameRelicStat } from "@/lib/game-types";
import GameStatIcon from "./game-stat-icon";
import Image from "./progressive-image";

interface GameRelicListProps {
  game: GameId;
  relics: GameRelic[];
}

function countRelicSets(relics: GameRelic[]): Array<[string, number]> {
  const counts = new Map<string, number>();
  relics.forEach((relic) => counts.set(relic.setId, (counts.get(relic.setId) ?? 0) + 1));
  return [...counts.entries()].sort((left, right) => right[1] - left[1]);
}

export default function GameRelicList({ game, relics }: GameRelicListProps) {
  const format = useFormatter();
  const messages = useMessages();
  const t = useTranslations("games");
  if (relics.length === 0) return null;

  const relicSets = messages.games.relicSets as Record<GameId, Record<string, string>>;
  const relicSlots = messages.games.relicSlots as Record<string, string>;
  const relicStats = messages.games.relicStats as Record<string, string>;
  const setName = (setId: string) => {
    return relicSets[game][setId] ?? t("relicSetFallback", { id: setId });
  };
  const statValue = (stat: GameRelicStat) => {
    const maximumFractionDigits = stat.percentage || stat.key === "speed" ? 1 : 0;
    return `${format.number(stat.value, { maximumFractionDigits })}${stat.percentage ? "%" : ""}`;
  };
  const setCounts = countRelicSets(relics);

  return (
    <Box>
      <Typography color="text.secondary" variant="overline">
        {t(game === "genshin" ? "artifacts" : "equippedRelics")}
      </Typography>
      <Stack direction="row" sx={{ flexWrap: "wrap", gap: 0.75, mt: 0.75 }}>
        {setCounts.map(([setId, count]) => (
          <Chip key={setId} label={`${setName(setId)} · ${t("pieceCount", { count })}`} size="small" variant="outlined" />
        ))}
      </Stack>
      <Box
        sx={{
          display: "grid",
          gap: 0.75,
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" },
          mt: 1,
        }}
      >
        {relics.map((relic) => (
          <Box
            key={`${relic.slot}-${relic.id}`}
            sx={{
              borderTop: "1px solid var(--game-line)",
              display: "grid",
              gridTemplateColumns: "88px minmax(0, 1fr)",
              minWidth: 0,
              py: 0.75,
            }}
          >
            <Box
              sx={{
                alignSelf: "start",
                bgcolor: "transparent",
                height: 82,
                overflow: "hidden",
                position: "relative",
                width: 82,
              }}
            >
              <Image
                alt=""
                fill
                sizes="82px"
                src={relic.icon}
                style={{ objectFit: "contain" }}
              />
              <Stack
                direction="row"
                sx={{
                  alignItems: "center",
                  bgcolor: "background.paper",
                  bottom: 0,
                  color: "var(--game-accent)",
                  gap: 0.1,
                  px: 0.35,
                  position: "absolute",
                  right: 0,
                }}
              >
                <StarRounded sx={{ fontSize: 12 }} />
                <Typography className="game-mono" sx={{ fontSize: 10 }}>{relic.rarity}</Typography>
              </Stack>
            </Box>
            <Box sx={{ minWidth: 0 }}>
              <Stack direction="row" spacing={1} sx={{ alignItems: "center", justifyContent: "space-between" }}>
                <Typography color="text.secondary" variant="caption">
                  {relicSlots[relic.slot] ?? relicSlots.other}
                </Typography>
                <Typography className="game-mono" color="text.secondary" variant="caption">
                  +{relic.level}
                </Typography>
              </Stack>
              <Typography noWrap sx={{ fontSize: 13, fontWeight: 750, mt: 0.25 }} title={setName(relic.setId)}>
                {setName(relic.setId)}
              </Typography>
              <Stack
                direction="row"
                spacing={0.45}
                sx={{ alignItems: "center", color: "text.primary", mt: 0.55 }}
                title={relicStats[relic.mainStat.key] ?? relicStats.other}
              >
                <GameStatIcon game={game} size={17} statKey={relic.mainStat.key} />
                <Typography className="game-mono" sx={{ fontSize: 17, fontWeight: 800 }}>
                  {statValue(relic.mainStat)}
                </Typography>
              </Stack>
              <Box sx={{ display: "grid", gap: 0.35, gridTemplateColumns: "repeat(2, minmax(0, 1fr))", mt: 0.55 }}>
                {relic.substats.map((stat, index) => (
                  <Stack
                    direction="row"
                    key={`${stat.key}-${index}`}
                    spacing={0.35}
                    sx={{ alignItems: "center", minWidth: 0 }}
                    title={relicStats[stat.key] ?? relicStats.other}
                  >
                    <GameStatIcon game={game} size={12} statKey={stat.key} />
                    <Typography className="game-mono" color="text.secondary" noWrap sx={{ fontSize: 11 }}>
                      {statValue(stat)}
                    </Typography>
                  </Stack>
                ))}
              </Box>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
