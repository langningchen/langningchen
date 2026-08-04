import { GENSHIN_SKILLS, GENSHIN_WEAPONS } from "@/data/genshin-loadout";
import { STAR_RAIL_LIGHT_CONES, STAR_RAIL_SKILLS } from "@/data/star-rail-loadout";
import { getLocalStarRailAsset } from "@/data/game-ranks";
import { GENSHIN_RELIC_STATS, PERCENTAGE_RELIC_STATS } from "@/data/game-relic-metadata";
import type { EnkaGenshinStat } from "./enka-types";
import type { GameEquipment, GameEquipmentStat, GameSkill, GameTraceKind, GameTraceNode } from "./game-types";
import type { MihomoStarRailLightCone, MihomoStarRailStatistic, MihomoStarRailTrace } from "./mihomo-types";

export function getGenshinSkills(levels: Record<string, number>): GameSkill[] {
  return Object.entries(levels).flatMap(([id, level]) => {
    const skill = GENSHIN_SKILLS[id];
    return skill ? [{ ...skill, level }] : [];
  });
}

export function getGenshinWeapon(
  id: number | undefined,
  level: number | undefined,
  rank: number | undefined,
  rarity: number | undefined,
  rawStats: EnkaGenshinStat[],
): GameEquipment | undefined {
  const weapon = id === undefined ? undefined : GENSHIN_WEAPONS[String(id)];
  const stats = rawStats.flatMap((stat) => {
    const key = stat.appendPropId ? GENSHIN_RELIC_STATS[stat.appendPropId] : undefined;
    if (!key) return [];
    return [{
      key,
      percentage: PERCENTAGE_RELIC_STATS.has(key),
      value: stat.statValue,
    }];
  });
  return weapon && level !== undefined
    ? { ...weapon, level, rank, rarity, stats }
    : undefined;
}

export function getStarRailSkills(
  levels: Array<{ level: number; pointId: number }>,
): GameSkill[] {
  return levels.flatMap(({ level, pointId }) => {
    const skill = STAR_RAIL_SKILLS[String(pointId)];
    return skill ? [{ ...skill, level }] : [];
  });
}

function getTraceKind(id: string): GameTraceKind {
  const suffix = Number(id.slice(-3));
  if (suffix <= 7) return "core";
  if (suffix < 200) return "major";
  if (suffix < 300) return "minor";
  return "extra";
}

export function getStarRailTraceNodes(traces: MihomoStarRailTrace[]): GameTraceNode[] {
  return traces.map((trace) => {
    const skill = STAR_RAIL_SKILLS[trace.id];
    return {
      icon: getLocalStarRailAsset(trace.icon),
      id: trace.id,
      kind: getTraceKind(trace.id),
      level: trace.level,
      maxLevel: trace.max_level,
      name: skill?.name,
      parent: trace.parent ?? undefined,
      type: skill?.type,
    };
  });
}

export function getStarRailLightCone(
  id: number | undefined,
  level: number | undefined,
  rank: number | undefined,
  parsedLightCone?: MihomoStarRailLightCone | null,
): GameEquipment | undefined {
  const normalizedId = parsedLightCone?.id ?? (id === undefined ? undefined : String(id));
  const lightCone = normalizedId === undefined ? undefined : STAR_RAIL_LIGHT_CONES[normalizedId];
  const normalizedLevel = parsedLightCone?.level ?? level;
  if (!lightCone || normalizedLevel === undefined) return undefined;

  return {
    ...lightCone,
    level: normalizedLevel,
    rank: parsedLightCone?.rank ?? rank,
    rarity: parsedLightCone?.rarity,
    stats: normalizeStarRailEquipmentStats([
      ...(parsedLightCone?.attributes ?? []),
      ...(parsedLightCone?.properties ?? []),
    ]),
  };
}

const STAR_RAIL_EQUIPMENT_STAT_KEYS: Record<string, string> = {
  atk: "attack",
  crit_dmg: "critDamage",
  crit_rate: "critRate",
  def: "defense",
  hp: "hp",
  spd: "speed",
};

function normalizeStarRailEquipmentStats(
  stats: MihomoStarRailStatistic[],
): GameEquipmentStat[] {
  return stats.flatMap((stat) => {
    const baseKey = STAR_RAIL_EQUIPMENT_STAT_KEYS[stat.field];
    if (!baseKey) return [];
    const key = stat.percent && ["attack", "defense", "hp"].includes(baseKey)
      ? `${baseKey}Percent`
      : baseKey;
    return [{
      key,
      percentage: stat.percent,
      value: stat.percent ? stat.value * 100 : stat.value,
    }];
  });
}
