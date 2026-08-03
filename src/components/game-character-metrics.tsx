import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTranslations } from "next-intl";
import type { GameCharacter, GameId } from "@/lib/game-types";
import CountUpValue from "./count-up-value";

interface GameCharacterMetricsProps {
  character: GameCharacter;
  game: GameId;
}

export default function GameCharacterMetrics({ character, game }: GameCharacterMetricsProps) {
  const t = useTranslations("games");
  const details = character.details;
  const metrics = [
    { label: t("levelShort"), value: character.level },
    { label: t(game === "genshin" ? "constellation" : "eidolon"), value: details.rank },
    details.friendship === undefined ? null : { label: t("friendshipLevel"), value: details.friendship },
    details.hp === undefined ? null : { label: t("hp"), value: Math.round(details.hp) },
    details.attack === undefined ? null : { label: t("attack"), value: Math.round(details.attack) },
    details.defense === undefined ? null : { label: t("defense"), value: Math.round(details.defense) },
    details.critRate === undefined ? null : { decimals: 1, label: t("critRate"), suffix: "%", value: details.critRate },
    details.critDamage === undefined ? null : { decimals: 1, label: t("critDamage"), suffix: "%", value: details.critDamage },
  ].filter((metric): metric is NonNullable<typeof metric> => metric !== null);

  return (
    <Box sx={{ borderBlock: "1px solid var(--game-line)", display: "grid", gridTemplateColumns: "repeat(2, minmax(0, 1fr))" }}>
      {metrics.map((metric) => (
        <Box key={metric.label} sx={{ minWidth: 0, py: 1.75 }}>
          <Typography color="text.secondary" variant="caption">{metric.label}</Typography>
          <Typography className="game-mono" sx={{ fontSize: 22, fontWeight: 800, mt: 0.25 }}>
            <CountUpValue decimals={metric.decimals} suffix={metric.suffix} value={metric.value} />
          </Typography>
        </Box>
      ))}
    </Box>
  );
}
