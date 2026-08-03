import {
  CACHED_GENSHIN_RELIC_SETS,
  CACHED_STAR_RAIL_RELIC_SETS,
  GENSHIN_RELIC_SLOTS,
  GENSHIN_RELIC_STATS,
  PERCENTAGE_RELIC_STATS,
  STAR_RAIL_RELIC_SLOTS,
  STAR_RAIL_RELIC_STATS,
} from "@/data/game-relic-metadata";
import type { EnkaGenshinEquipItem, EnkaGenshinStat, EnkaStarRailRelic } from "./enka-types";
import type { GameRelic, GameRelicStat } from "./game-types";

function normalizeGenshinStat(stat: EnkaGenshinStat): GameRelicStat | null {
  const sourceKey = stat.mainPropId ?? stat.appendPropId;
  if (!sourceKey) return null;
  const key = GENSHIN_RELIC_STATS[sourceKey] ?? "other";
  return {
    key,
    percentage: PERCENTAGE_RELIC_STATS.has(key),
    value: stat.statValue,
  };
}

function genshinRelicIcon(icon: string, setId: string): string {
  return CACHED_GENSHIN_RELIC_SETS.has(setId)
    ? `/games/relics/genshin-${icon}.webp`
    : `https://enka.network/ui/${icon}.png`;
}

function starRailRelicIcon(setId: string, slot: number): string {
  return CACHED_STAR_RAIL_RELIC_SETS.has(setId)
    ? `/games/relics/starrail-${setId}-${slot}.webp`
    : `https://enka.network/ui/hsr/SpriteOutput/ItemIcon/RelicIcons/IconRelic_${setId}_${slot}.png`;
}

function normalizeStarRailStat(stat: { type: string; value: number }): GameRelicStat {
  const key = STAR_RAIL_RELIC_STATS[stat.type] ?? "other";
  const percentage = PERCENTAGE_RELIC_STATS.has(key);
  return {
    key,
    percentage,
    value: percentage ? stat.value * 100 : stat.value,
  };
}

export function getGenshinRelics(equipment: EnkaGenshinEquipItem[]): GameRelic[] {
  return equipment.flatMap((item) => {
    const flat = item.flat;
    const mainStat = flat?.reliquaryMainstat
      ? normalizeGenshinStat(flat.reliquaryMainstat)
      : null;
    if (!item.reliquary || !flat?.icon || !flat.setId || !flat.equipType || !mainStat) return [];

    const setId = String(flat.setId);
    return [{
      icon: genshinRelicIcon(flat.icon, setId),
      id: String(item.itemId ?? flat.icon),
      level: Math.max(0, (item.reliquary.level ?? 1) - 1),
      mainStat,
      rarity: flat.rankLevel ?? 0,
      setId,
      slot: GENSHIN_RELIC_SLOTS[flat.equipType] ?? "other",
      substats: (flat.reliquarySubstats ?? []).flatMap((stat) => {
        const normalized = normalizeGenshinStat(stat);
        return normalized ? [normalized] : [];
      }),
    }];
  });
}

export function getStarRailRelics(relics: EnkaStarRailRelic[]): GameRelic[] {
  return relics.flatMap((relic) => {
    const props = relic._flat?.props ?? [];
    const mainStat = props[0];
    const setId = relic._flat?.setID;
    if (!mainStat || setId === undefined) return [];

    const normalizedSetId = String(setId);
    return [{
      icon: starRailRelicIcon(normalizedSetId, relic.type),
      id: String(relic.tid),
      level: relic.level,
      mainStat: normalizeStarRailStat(mainStat),
      rarity: Math.max(1, Number(String(relic.tid)[0]) - 1),
      setId: normalizedSetId,
      slot: STAR_RAIL_RELIC_SLOTS[relic.type] ?? "other",
      substats: props.slice(1).map(normalizeStarRailStat),
    }];
  });
}
