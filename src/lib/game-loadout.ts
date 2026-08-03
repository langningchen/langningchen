import { GENSHIN_SKILLS, GENSHIN_WEAPONS } from "@/data/genshin-loadout";
import { STAR_RAIL_LIGHT_CONES, STAR_RAIL_SKILLS } from "@/data/star-rail-loadout";
import type { GameEquipment, GameSkill } from "./game-types";

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
): GameEquipment | undefined {
  const weapon = id === undefined ? undefined : GENSHIN_WEAPONS[String(id)];
  return weapon && level !== undefined ? { ...weapon, level, rank } : undefined;
}

export function getStarRailSkills(
  levels: Array<{ level: number; pointId: number }>,
): GameSkill[] {
  return levels.flatMap(({ level, pointId }) => {
    const skill = STAR_RAIL_SKILLS[String(pointId)];
    return skill ? [{ ...skill, level }] : [];
  });
}

export function getStarRailLightCone(
  id: number | undefined,
  level: number | undefined,
  rank: number | undefined,
): GameEquipment | undefined {
  const lightCone = id === undefined ? undefined : STAR_RAIL_LIGHT_CONES[String(id)];
  return lightCone && level !== undefined ? { ...lightCone, level, rank } : undefined;
}
