import StarRounded from "@mui/icons-material/StarRounded";
import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { useFormatter, useMessages, useTranslations } from "next-intl";
import type { GameId, GameRelic, GameRelicStat } from "@/lib/game-types";

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
  const statLabel = (stat: GameRelicStat) => {
    return relicStats[stat.key] ?? relicStats.other;
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
      <Stack direction="row" sx={{ flexWrap: "wrap", gap: 0.75, mt: 1.25 }}>
        {setCounts.map(([setId, count]) => (
          <Chip key={setId} label={`${setName(setId)} · ${t("pieceCount", { count })}`} size="small" variant="outlined" />
        ))}
      </Stack>
      <Box
        sx={{
          display: "grid",
          gap: 1.5,
          gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" },
          mt: 2,
        }}
      >
        {relics.map((relic) => (
          <Box
            key={`${relic.slot}-${relic.id}`}
            sx={{
              border: "1px solid var(--game-line)",
              display: "grid",
              gridTemplateColumns: "72px minmax(0, 1fr)",
              minWidth: 0,
              p: 1.5,
            }}
          >
            <Box
              sx={{
                alignSelf: "start",
                bgcolor: game === "genshin" ? "#334b47" : "#142535",
                height: 64,
                position: "relative",
                width: 64,
              }}
            >
              <Image alt="" fill sizes="64px" src={relic.icon} style={{ objectFit: "contain", padding: 4 }} />
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
              <Stack direction="row" sx={{ alignItems: "center", color: "primary.main", mt: 1 }}>
                <Typography sx={{ fontSize: 12, flexGrow: 1 }}>{statLabel(relic.mainStat)}</Typography>
                <Typography className="game-mono" sx={{ fontSize: 18, fontWeight: 800 }}>
                  {statValue(relic.mainStat)}
                </Typography>
              </Stack>
              <Stack spacing={0.3} sx={{ borderTop: "1px solid var(--game-line)", mt: 1, pt: 1 }}>
                {relic.substats.map((stat, index) => (
                  <Stack direction="row" key={`${stat.key}-${index}`} sx={{ justifyContent: "space-between" }}>
                    <Typography color="text.secondary" variant="caption">{statLabel(stat)}</Typography>
                    <Typography className="game-mono" color="text.secondary" variant="caption">
                      {statValue(stat)}
                    </Typography>
                  </Stack>
                ))}
              </Stack>
              <Stack direction="row" spacing={0.25} sx={{ alignItems: "center", color: "primary.main", mt: 1 }}>
                <StarRounded sx={{ fontSize: 14 }} />
                <Typography className="game-mono" variant="caption">{relic.rarity}</Typography>
              </Stack>
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
