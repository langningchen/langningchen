import statIcons from "@/data/game-stat-icons.json";
import type { GameId } from "@/lib/game-types";

interface GameStatIconProps {
  game: GameId;
  size?: number;
  statKey: string;
}

const GENSHIN_STAT_ICONS: Record<string, keyof typeof statIcons> = {
  attack: "FIGHT_PROP_ATTACK",
  attackPercent: "FIGHT_PROP_ATTACK_PERCENT",
  baseAttack: "FIGHT_PROP_BASE_ATTACK",
  critDamage: "FIGHT_PROP_CRITICAL_HURT",
  critRate: "FIGHT_PROP_CRITICAL",
  defense: "FIGHT_PROP_DEFENSE",
  defensePercent: "FIGHT_PROP_DEFENSE_PERCENT",
  dendroDamage: "FIGHT_PROP_GRASS_ADD_HURT",
  elementalMastery: "FIGHT_PROP_ELEMENT_MASTERY",
  energyRecharge: "FIGHT_PROP_CHARGE_EFFICIENCY",
  fireDamage: "FIGHT_PROP_FIRE_ADD_HURT",
  geoDamage: "FIGHT_PROP_ROCK_ADD_HURT",
  healingBonus: "FIGHT_PROP_HEAL_ADD",
  hp: "FIGHT_PROP_HP",
  hpPercent: "FIGHT_PROP_HP_PERCENT",
  iceDamage: "FIGHT_PROP_ICE_ADD_HURT",
  lightningDamage: "FIGHT_PROP_ELEC_ADD_HURT",
  physicalDamage: "FIGHT_PROP_PHYSICAL_ADD_HURT",
  waterDamage: "FIGHT_PROP_WATER_ADD_HURT",
  windDamage: "FIGHT_PROP_WIND_ADD_HURT",
};

const STAR_RAIL_STAT_ICONS: Record<string, keyof typeof statIcons> = {
  attack: "IconAttack",
  attackPercent: "IconAttack",
  breakEffect: "IconBreakDamageAddedRatio",
  critDamage: "IconCriticalDamage",
  critRate: "IconCriticalChance",
  defense: "IconDefence",
  defensePercent: "IconDefence",
  effectHitRate: "IconStatusProbability",
  effectResistance: "IconStatusResistance",
  energyRegeneration: "IconSPRatio",
  fireDamage: "IconFireAddedRatio",
  healingBonus: "IconHealRatio",
  hp: "IconMaxHP",
  hpPercent: "IconMaxHP",
  iceDamage: "IconIceAddedRatio",
  imaginaryDamage: "IconImaginaryAddedRatio",
  lightningDamage: "IconThunderAddedRatio",
  physicalDamage: "IconPhysicalAddedRatio",
  quantumDamage: "IconQuantumAddedRatio",
  speed: "IconSpeed",
  windDamage: "IconWindAddedRatio",
};

export default function GameStatIcon({ game, size = 18, statKey }: GameStatIconProps) {
  const iconName = game === "genshin"
    ? GENSHIN_STAT_ICONS[statKey]
    : STAR_RAIL_STAT_ICONS[statKey];
  const icon = iconName ? statIcons[iconName] : undefined;

  if (!icon) return null;

  return (
    <svg
      aria-hidden="true"
      className="game-stat-icon"
      dangerouslySetInnerHTML={{ __html: icon.svg }}
      style={{ color: "var(--game-accent)", flexShrink: 0, height: size, width: size }}
      viewBox={icon.viewBox}
    />
  );
}
