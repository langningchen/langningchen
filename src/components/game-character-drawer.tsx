import CloseRounded from "@mui/icons-material/CloseRounded";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { useLocale, useTranslations } from "next-intl";
import { GAME_GLYPH_COPY } from "@/data/game-glyph-copy";
import { useLenisScrollLock } from "@/hooks/use-lenis-scroll-lock";
import type { GameCharacter, GameId } from "@/lib/game-types";
import GameCharacterArt from "./game-character-art";
import GameCharacterMetrics from "./game-character-metrics";
import GameLoadout from "./game-loadout";
import GameRelicList from "./game-relic-list";

interface GameCharacterDrawerProps {
  character: GameCharacter | null;
  game: GameId;
  onClose: () => void;
}

export default function GameCharacterDrawer({ character, game, onClose }: GameCharacterDrawerProps) {
  const locale = useLocale() as "en" | "zh";
  const t = useTranslations("games");
  const theme = useTheme();
  useLenisScrollLock(character !== null);

  return (
    <Drawer
      anchor="right"
      className={`game-drawer--${game} game-drawer--${theme.palette.mode}`}
      onClose={onClose}
      open={character !== null}
      slotProps={{ paper: { sx: { bgcolor: "background.paper", p: { xs: 2, md: 3 }, width: "min(96vw, 780px)" } } }}
    >
      {character && (
        <Stack data-lenis-prevent spacing={2}>
          <Box
            sx={{
              borderBottom: "1px solid var(--game-line)",
              minHeight: { xs: 590, sm: 430 },
              overflow: "hidden",
              pb: 1.5,
              position: "relative",
            }}
          >
            <GameCharacterArt character={character} />
            <Stack sx={{ minHeight: "inherit", position: "relative", zIndex: 1 }}>
              <Stack direction="row" sx={{ alignItems: "flex-start", justifyContent: "space-between" }}>
                <Box>
                  <Typography aria-hidden="true" className="game-glyph" color="primary.main" sx={{ fontSize: 23 }}>
                    {GAME_GLYPH_COPY[game].characterArchive}
                  </Typography>
                  <Typography color="text.primary" component="h2" sx={{ fontSize: 23, mt: 0.5 }} variant="h2">
                    {character.name[locale]}
                  </Typography>
                  <Typography className="game-mono" color="text.secondary" sx={{ mt: 0.5 }} variant="body2">
                    {t("equipmentLevel", { level: character.level })}
                    {character.details.friendship === undefined
                      ? ""
                      : ` · ${t("friendshipValue", { level: character.details.friendship })}`}
                  </Typography>
                </Box>
                <Tooltip title={t("closeCharacterDetails")}>
                  <IconButton aria-label={t("closeCharacterDetails")} onClick={onClose}>
                    <CloseRounded />
                  </IconButton>
                </Tooltip>
              </Stack>
              <Box sx={{ maxWidth: { sm: 430 }, mt: { xs: 25, sm: 2.5 }, width: { xs: "100%", sm: "58%" } }}>
                <GameCharacterMetrics character={character} game={game} />
              </Box>
            </Stack>
          </Box>
          <GameLoadout details={character.details} game={game} />
          <GameRelicList game={game} relics={character.details.relics} />
        </Stack>
      )}
    </Drawer>
  );
}
