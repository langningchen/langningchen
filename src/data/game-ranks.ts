import type { GameId } from "@/lib/game-types";

const STAR_RAIL_RANK_ICONS: Record<string, string[]> = {
  "1015": ["rank1", "rank2", "skill", "rank4", "ultimate", "rank6"],
  "1306": ["rank1", "rank2", "skill", "rank4", "ultimate", "rank6"],
  "1409": ["rank1", "rank2", "ultimate", "rank4", "skill", "rank6"],
  "1413": ["rank1", "rank2", "skill", "rank4", "ultimate", "rank6"],
  "1414": ["rank1", "rank2", "ultimate", "rank4", "skill", "rank6"],
  "1415": ["rank1", "rank2", "ultimate", "rank4", "skill", "rank6"],
  "1506": ["rank1", "rank2", "skill", "rank4", "ultimate", "rank6"],
};

function localStarRailIcon(path: string): string {
  return `/games/starrail-assets/${path}`;
}

export function getGameRankIcons(
  game: GameId,
  characterId: string,
  apiIcons: string[] = [],
): string[] {
  if (game === "genshin") {
    return Array.from(
      { length: 6 },
      (_, index) => `/games/constellations/genshin-${characterId}-${String(index + 1).padStart(2, "0")}.png`,
    );
  }

  if (apiIcons.length === 6) return apiIcons.map(localStarRailIcon);
  return (STAR_RAIL_RANK_ICONS[characterId] ?? []).map(
    (name) => localStarRailIcon(`icon/skill/${characterId}_${name}.png`),
  );
}

export function getLocalStarRailAsset(path: string): string {
  return localStarRailIcon(path);
}
