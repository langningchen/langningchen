import type { GameId } from "@/lib/game-types";

interface GameGlyphCopy {
  characterArchive: string;
  records: string;
  showcase: string;
  slogan: string;
}

export const GAME_GLYPH_COPY: Record<GameId, GameGlyphCopy> = {
  genshin: {
    characterArchive: "Character Archive",
    records: "Travel Archive",
    showcase: "Companions",
    slogan: "Ad Astra Abyssosque",
  },
  starRail: {
    characterArchive: "Passenger Record",
    records: "Trailblaze Archive",
    showcase: "Express Archives",
    slogan: "May This Journey Lead Us Starward",
  },
};
