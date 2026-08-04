import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useMessages, useTranslations } from "next-intl";
import type {
  GameCharacter,
  GameCharacterStat,
  GameId,
} from "@/lib/game-types";
import CountUpValue from "./count-up-value";
import GameRankTrack from "./game-rank-track";
import GameStatIcon from "./game-stat-icon";

interface GameCharacterMetricsProps {
  character: GameCharacter;
  game: GameId;
}

function getLegacyStats(character: GameCharacter): GameCharacterStat[] {
  const details = character.details;
  return [
    details.hp === undefined ? null : { key: "hp", percentage: false, value: details.hp },
    details.attack === undefined ? null : { key: "attack", percentage: false, value: details.attack },
    details.defense === undefined ? null : { key: "defense", percentage: false, value: details.defense },
    details.critRate === undefined ? null : { key: "critRate", percentage: true, value: details.critRate },
    details.critDamage === undefined ? null : { key: "critDamage", percentage: true, value: details.critDamage },
  ].filter((stat): stat is GameCharacterStat => stat !== null);
}

export default function GameCharacterMetrics({ character, game }: GameCharacterMetricsProps) {
  const messages = useMessages();
  const t = useTranslations("games");
  const details = character.details;
  const stats = details.totalStats?.length ? details.totalStats : getLegacyStats(character);
  const statLabels = messages.games.relicStats as Record<string, string>;

  return (
    <Stack spacing={1.5}>
      <GameRankTrack
        characterId={character.id}
        game={game}
        icons={details.rankIcons}
        rank={details.rank}
      />

      {stats.length > 0 && (
        <Box>
          <Typography color="text.secondary" variant="overline">
            {t("totalStats")}
          </Typography>
          <Box
            sx={{
              display: "grid",
              gridTemplateColumns: "repeat(2, minmax(0, 1fr))",
              mt: 0.5,
            }}
          >
            {stats.map((stat) => (
              <Box
                key={stat.key}
                sx={{ borderTop: "1px solid var(--game-line)", minWidth: 0, py: 0.65, pr: 1 }}
              >
                <Stack direction="row" spacing={0.6} sx={{ alignItems: "center", justifyContent: "space-between", minHeight: 24 }}>
                  <Stack direction="row" spacing={0.5} sx={{ alignItems: "center", minWidth: 0 }}>
                    <GameStatIcon game={game} size={16} statKey={stat.key} />
                    <Typography color="text.secondary" noWrap sx={{ lineHeight: 1.2 }} variant="caption">
                    {statLabels[stat.key] ?? statLabels.other}
                    </Typography>
                  </Stack>
                  <Typography className="game-mono" sx={{ fontSize: 15, fontWeight: 800, whiteSpace: "nowrap" }}>
                    <CountUpValue
                      decimals={stat.percentage || stat.key === "speed" ? 1 : 0}
                      suffix={stat.percentage ? "%" : undefined}
                      value={stat.value}
                    />
                  </Typography>
                </Stack>
              </Box>
            ))}
          </Box>
        </Box>
      )}
    </Stack>
  );
}
