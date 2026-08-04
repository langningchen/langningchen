import Box from "@mui/material/Box";
import type { GameCharacter } from "@/lib/game-types";
import Image from "./progressive-image";

interface GameCharacterArtProps {
  character: GameCharacter;
}

export default function GameCharacterArt({ character }: GameCharacterArtProps) {
  return (
    <Box
      aria-hidden="true"
      sx={{
        bgcolor: "transparent",
        inset: 0,
        opacity: 0.72,
        overflow: "hidden",
        pointerEvents: "none",
        position: "absolute",
      }}
    >
      <Box
        sx={{
          bottom: 0,
          left: { xs: "18%", sm: "29%" },
          position: "absolute",
          right: { xs: "-18%", sm: "-29%" },
          top: 0,
        }}
      >
        <Image
          alt=""
          fill
          priority
          sizes="(max-width: 600px) 94vw, 760px"
          src={character.splashImage}
          style={{
            objectFit: "contain",
            objectPosition: "center bottom",
            transform: "scale(1.08)",
            transformOrigin: "center bottom",
          }}
        />
      </Box>
    </Box>
  );
}
