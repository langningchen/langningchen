import Box from "@mui/material/Box";
import Image from "next/image";
import type { GameCharacter, GameId } from "@/lib/game-types";

interface GameCharacterArtProps {
  character: GameCharacter;
  game: GameId;
  name: string;
}

export default function GameCharacterArt({ character, game, name }: GameCharacterArtProps) {
  return (
    <Box
      sx={{
        aspectRatio: game === "genshin" ? "2 / 1" : "16 / 10",
        bgcolor: "var(--game-portrait)",
        minHeight: { xs: 240, sm: game === "genshin" ? 320 : 400 },
        overflow: "hidden",
        position: "relative",
      }}
    >
      <Image
        alt={name}
        fill
        priority
        sizes="(max-width: 600px) 94vw, 760px"
        src={character.splashImage}
        style={{ objectFit: "contain", objectPosition: "center bottom" }}
      />
    </Box>
  );
}
