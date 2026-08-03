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

  return (
    <Drawer
      anchor="right"
      className={`game-drawer--${game} game-drawer--${theme.palette.mode}`}
      onClose={onClose}
      open={character !== null}
      slotProps={{ paper: { sx: { bgcolor: "background.paper", p: { xs: 2.5, md: 4 }, width: "min(96vw, 760px)" } } }}
    >
      {character && (
        <Stack data-lenis-prevent spacing={3}>
          <Stack direction="row" sx={{ alignItems: "flex-start", justifyContent: "space-between" }}>
            <Box>
              <Typography aria-hidden="true" className="game-glyph" color="primary.main" sx={{ fontSize: 23 }}>
                {GAME_GLYPH_COPY[game].characterArchive}
              </Typography>
              <Typography color="text.secondary" component="h2" sx={{ fontSize: 25, mt: 0.75 }} variant="h2">
                {character.name[locale]}
              </Typography>
            </Box>
            <Tooltip title={t("closeCharacterDetails")}>
              <IconButton aria-label={t("closeCharacterDetails")} onClick={onClose}>
                <CloseRounded />
              </IconButton>
            </Tooltip>
          </Stack>
          <GameCharacterArt character={character} game={game} name={character.name[locale]} />
          <GameCharacterMetrics character={character} game={game} />
          <GameLoadout details={character.details} game={game} />
          <GameRelicList game={game} relics={character.details.relics} />
        </Stack>
      )}
    </Drawer>
  );
}
