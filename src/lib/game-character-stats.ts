import type { GameCharacterStat } from "./game-types";
import type { MihomoStarRailStatistic } from "./mihomo-types";

interface GenshinFightProperty {
  id: string;
  key: string;
  percentage?: boolean;
}

const GENSHIN_FIGHT_PROPERTIES: GenshinFightProperty[] = [
  { id: "2000", key: "hp" },
  { id: "2001", key: "attack" },
  { id: "2002", key: "defense" },
  { id: "28", key: "elementalMastery" },
  { id: "20", key: "critRate", percentage: true },
  { id: "22", key: "critDamage", percentage: true },
  { id: "23", key: "energyRecharge", percentage: true },
  { id: "26", key: "healingBonus", percentage: true },
  { id: "30", key: "physicalDamage", percentage: true },
  { id: "40", key: "fireDamage", percentage: true },
  { id: "41", key: "lightningDamage", percentage: true },
  { id: "42", key: "waterDamage", percentage: true },
  { id: "43", key: "dendroDamage", percentage: true },
  { id: "44", key: "windDamage", percentage: true },
  { id: "45", key: "geoDamage", percentage: true },
  { id: "46", key: "iceDamage", percentage: true },
];

const STAR_RAIL_STAT_KEYS: Record<string, string> = {
  atk: "attack",
  break_dmg: "breakEffect",
  crit_dmg: "critDamage",
  crit_rate: "critRate",
  def: "defense",
  effect_hit: "effectHitRate",
  effect_res: "effectResistance",
  fire_dmg: "fireDamage",
  heal_rate: "healingBonus",
  hp: "hp",
  ice_dmg: "iceDamage",
  imaginary_dmg: "imaginaryDamage",
  lightning_dmg: "lightningDamage",
  physical_dmg: "physicalDamage",
  quantum_dmg: "quantumDamage",
  sp_rate: "energyRegeneration",
  spd: "speed",
  wind_dmg: "windDamage",
};

export function getGenshinTotalStats(
  fightProperties: Record<string, number>,
): GameCharacterStat[] {
  return GENSHIN_FIGHT_PROPERTIES.flatMap((property) => {
    const value = fightProperties[property.id];
    if (value === undefined || (value === 0 && Number(property.id) < 2000)) return [];
    return [{
      key: property.key,
      percentage: property.percentage ?? false,
      value: property.percentage ? value * 100 : value,
    }];
  });
}

export function getStarRailTotalStats(
  statistics: MihomoStarRailStatistic[],
): GameCharacterStat[] {
  return statistics.flatMap((statistic) => {
    const key = STAR_RAIL_STAT_KEYS[statistic.field];
    if (!key) return [];
    return [{
      key,
      percentage: statistic.percent,
      value: statistic.percent ? statistic.value * 100 : statistic.value,
    }];
  });
}
