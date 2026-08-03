import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { useLocale, useTranslations } from "next-intl";
import type { GameCharacterDetails, GameId } from "@/lib/game-types";

interface GameLoadoutProps {
  details: GameCharacterDetails;
  game: GameId;
}

export default function GameLoadout({ details, game }: GameLoadoutProps) {
  const locale = useLocale() as "en" | "zh";
  const t = useTranslations("games");
  const equipment = details.equipment;

  if (!equipment && details.skills.length === 0) return null;

  return (
    <Stack spacing={3}>
      {equipment && (
        <Box>
          <Typography color="text.secondary" variant="overline">
            {t(game === "genshin" ? "weapon" : "lightCone")}
          </Typography>
          <Stack
            direction="row"
            spacing={2}
            sx={{ alignItems: "center", borderTop: "1px solid var(--game-line)", mt: 1, pt: 2 }}
          >
            <Box sx={{ flex: "0 0 auto", height: 72, position: "relative", width: 72 }}>
              <Image
                alt=""
                fill
                sizes="72px"
                src={equipment.icon}
                style={{ objectFit: "contain" }}
              />
            </Box>
            <Box sx={{ minWidth: 0 }}>
              <Typography sx={{ fontSize: 18, fontWeight: 800, overflowWrap: "anywhere" }}>
                {equipment.name[locale]}
              </Typography>
              <Typography className="game-mono" color="text.secondary" sx={{ mt: 0.5 }} variant="body2">
                {t("equipmentLevel", { level: equipment.level })}
                {equipment.rank === undefined
                  ? ""
                  : ` · ${t(game === "genshin" ? "refinement" : "superimposition", { rank: equipment.rank })}`}
              </Typography>
            </Box>
          </Stack>
        </Box>
      )}

      {details.skills.length > 0 && (
        <Box>
          <Typography color="text.secondary" variant="overline">
            {t("skills")}
          </Typography>
          <Box sx={{ display: "grid", gridTemplateColumns: { xs: "1fr", sm: "repeat(2, minmax(0, 1fr))" }, mt: 1 }}>
            {details.skills.map((skill) => (
              <Stack
                direction="row"
                key={skill.id}
                spacing={1.5}
                sx={{ alignItems: "center", borderTop: "1px solid var(--game-line)", minWidth: 0, py: 1.5 }}
              >
                <Box
                  sx={{
                    bgcolor: game === "genshin" ? "#334b47" : "#142535",
                    border: "1px solid",
                    borderColor: game === "genshin" ? "rgba(214, 185, 111, 0.52)" : "rgba(120, 220, 255, 0.45)",
                    borderRadius: 1,
                    flex: "0 0 auto",
                    height: 52,
                    p: 0.75,
                    position: "relative",
                    width: 52,
                  }}
                >
                  <Image
                    alt=""
                    fill
                    sizes="52px"
                    src={skill.icon}
                    style={{ filter: "drop-shadow(0 1px 2px rgba(0, 0, 0, 0.55))", objectFit: "contain", padding: 6 }}
                  />
                </Box>
                <Box sx={{ minWidth: 0 }}>
                  <Typography sx={{ fontWeight: 800, lineHeight: 1.35, overflowWrap: "anywhere" }}>
                    {skill.name[locale]}
                  </Typography>
                  <Typography color="text.secondary" variant="caption">
                    {skill.type[locale]} · {t("skillLevel", { level: skill.level })}
                  </Typography>
                </Box>
              </Stack>
            ))}
          </Box>
        </Box>
      )}
    </Stack>
  );
}
