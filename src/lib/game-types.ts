export type GameId = "genshin" | "starRail";

export interface LocalizedGameText {
  en: string;
  zh: string;
}

export interface GameEquipment {
  icon: string;
  id: string;
  level: number;
  name: LocalizedGameText;
  rank?: number;
  rarity?: number;
  stats?: GameEquipmentStat[];
}

export interface GameEquipmentStat {
  key: string;
  percentage: boolean;
  value: number;
}

export interface GameSkill {
  icon: string;
  id: string;
  level: number;
  name: LocalizedGameText;
  type: LocalizedGameText;
}

export interface GameRelicStat {
  key: string;
  percentage: boolean;
  value: number;
}

export interface GameRelic {
  icon: string;
  id: string;
  level: number;
  mainStat: GameRelicStat;
  rarity: number;
  setId: string;
  slot: string;
  substats: GameRelicStat[];
}

export interface GameCharacterStat {
  key: string;
  percentage: boolean;
  value: number;
}

export type GameTraceKind = "core" | "extra" | "major" | "minor";

export interface GameTraceNode {
  icon: string;
  id: string;
  kind: GameTraceKind;
  level: number;
  maxLevel: number;
  name?: LocalizedGameText;
  parent?: string;
  type?: LocalizedGameText;
}

export interface GameCharacterDetails {
  attack?: number;
  critDamage?: number;
  critRate?: number;
  defense?: number;
  equipment?: GameEquipment;
  friendship?: number;
  hp?: number;
  rank: number;
  rankIcons?: string[];
  relics: GameRelic[];
  skills: GameSkill[];
  totalStats?: GameCharacterStat[];
  traceNodes?: GameTraceNode[];
}

export interface GameCharacter {
  details: GameCharacterDetails;
  id: string;
  image: string;
  level: number;
  name: LocalizedGameText;
  splashImage: string;
}

export interface GameProfile {
  achievementCount: number;
  avatar: string;
  extraMetrics: Array<{
    label: "books" | "characters" | "friendship" | "lightCones" | "music" | "relics";
    value: number;
  }>;
  game: GameId;
  level: number;
  nickname: string;
  showcase: GameCharacter[];
  uid: string;
  worldLevel: number;
}
