import StarRounded from "@mui/icons-material/StarRounded";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useFormatter, useLocale, useTranslations } from "next-intl";
import type { GameCharacterDetails, GameEquipmentStat, GameId, GameTraceNode } from "@/lib/game-types";
import GameStatIcon from "./game-stat-icon";
import GameTraceTree from "./game-trace-tree";
import Image from "./progressive-image";

interface GameLoadoutProps {
  details: GameCharacterDetails;
  game: GameId;
}

export default function GameLoadout({ details, game }: GameLoadoutProps) {
  const locale = useLocale() as "en" | "zh";
  const format = useFormatter();
  const t = useTranslations("games");
  const equipment = details.equipment;
  const statValue = (stat: GameEquipmentStat) => {
    const maximumFractionDigits = stat.percentage || stat.key === "speed" ? 1 : 0;
    return `${format.number(stat.value, { maximumFractionDigits })}${stat.percentage ? "%" : ""}`;
  };

  const abilityNodes: GameTraceNode[] = game === "starRail"
    ? details.traceNodes ?? []
    : details.skills.map((skill) => ({
      icon: skill.icon,
      id: skill.id,
      kind: "core",
      level: skill.level,
      maxLevel: skill.level,
      name: skill.name,
      type: skill.type,
    }));
  if (!equipment && abilityNodes.length === 0) return null;

  return (
    <Stack spacing={2.25}>
      {equipment && (
        <Box>
          <Typography color="text.secondary" variant="overline">
            {t(game === "genshin" ? "weapon" : "lightCone")}
          </Typography>
          <Stack
            direction="row"
            spacing={1.75}
            sx={{ alignItems: "stretch", borderTop: "1px solid var(--game-line)", mt: 0.75, pt: 1.25 }}
          >
            <Box sx={{ alignSelf: "center", flex: "0 0 auto", height: { xs: 76, sm: 88 }, position: "relative", width: { xs: 76, sm: 88 } }}>
              <Image
                alt=""
                fill
                sizes="88px"
                src={equipment.icon}
                style={{ objectFit: "contain" }}
              />
            </Box>
            <Box sx={{ flexGrow: 1, minWidth: 0 }}>
              <Typography sx={{ fontSize: 17, fontWeight: 800, overflowWrap: "anywhere" }}>
                {equipment.name[locale]}
              </Typography>
              <Stack direction="row" sx={{ alignItems: "center", flexWrap: "wrap", gap: 0.75, mt: 0.35 }}>
                {equipment.rarity !== undefined && (
                  <Stack direction="row" spacing={0.05} sx={{ color: "var(--game-accent)" }}>
                    {Array.from({ length: equipment.rarity }, (_, index) => (
                      <StarRounded key={index} sx={{ fontSize: 15 }} />
                    ))}
                  </Stack>
                )}
                <Typography className="game-mono" color="text.secondary" variant="body2">
                  {t("equipmentLevel", { level: equipment.level })}
                  {equipment.rank === undefined
                    ? ""
                    : ` · ${t(game === "genshin" ? "refinement" : "superimposition", { rank: equipment.rank })}`}
                </Typography>
              </Stack>
              {Boolean(equipment.stats?.length) && (
                <Box sx={{ display: "grid", gap: 0.65, gridTemplateColumns: "repeat(auto-fit, minmax(76px, 1fr))", mt: 1 }}>
                  {equipment.stats?.map((stat, index) => (
                    <Stack
                      direction="row"
                      key={`${stat.key}-${index}`}
                      spacing={0.55}
                      sx={{ alignItems: "center", borderTop: "1px solid var(--game-line)", minWidth: 0, pt: 0.5 }}
                    >
                      <GameStatIcon game={game} size={15} statKey={stat.key} />
                      <Typography className="game-mono" sx={{ fontSize: 14, fontWeight: 800, whiteSpace: "nowrap" }}>
                        {statValue(stat)}
                      </Typography>
                    </Stack>
                  ))}
                </Box>
              )}
            </Box>
          </Stack>
        </Box>
      )}

      {abilityNodes.length > 0 && (
        <GameTraceTree
          nodes={abilityNodes}
          title={t(game === "genshin" ? "talents" : "traces")}
        />
      )}
    </Stack>
  );
}
