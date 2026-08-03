import type { GameCharacter } from "@/lib/game-types";

export type CharacterIdentity = Omit<GameCharacter, "details" | "level">;

export const GENSHIN_CHARACTERS: Record<string, CharacterIdentity> = {
  "10000069": { id: "10000069", image: "/games/genshin-10000069.png", name: { en: "Tighnari", zh: "提纳里" }, splashImage: "/games/characters/genshin-10000069.webp" },
  "10000074": { id: "10000074", image: "/games/genshin-10000074.png", name: { en: "Layla", zh: "莱依拉" }, splashImage: "/games/characters/genshin-10000074.webp" },
  "10000089": { id: "10000089", image: "/games/genshin-10000089.png", name: { en: "Furina", zh: "芙宁娜" }, splashImage: "/games/characters/genshin-10000089.webp" },
  "10000091": { id: "10000091", image: "/games/genshin-10000091.png", name: { en: "Navia", zh: "娜维娅" }, splashImage: "/games/characters/genshin-10000091.webp" },
  "10000096": { id: "10000096", image: "/games/genshin-10000096.png", name: { en: "Arlecchino", zh: "阿蕾奇诺" }, splashImage: "/games/characters/genshin-10000096.webp" },
  "10000114": { id: "10000114", image: "/games/genshin-10000114.png", name: { en: "Skirk", zh: "丝柯克" }, splashImage: "/games/characters/genshin-10000114.webp" },
};

export const STAR_RAIL_CHARACTERS: Record<string, CharacterIdentity> = {
  "1015": { id: "1015", image: "/games/starrail-1015.png", name: { en: "Archer", zh: "Archer" }, splashImage: "/games/characters/starrail-1015.webp" },
  "1306": { id: "1306", image: "/games/starrail-1306.png", name: { en: "Sparkle", zh: "花火" }, splashImage: "/games/characters/starrail-1306.webp" },
  "1409": { id: "1409", image: "/games/starrail-1409.png", name: { en: "Hyacine", zh: "风堇" }, splashImage: "/games/characters/starrail-1409.webp" },
  "1413": { id: "1413", image: "/games/starrail-1413.png", name: { en: "Evernight", zh: "长夜月" }, splashImage: "/games/characters/starrail-1413.webp" },
  "1414": { id: "1414", image: "/games/starrail-1414.png", name: { en: "Dan Heng - Permansor Terrae", zh: "丹恒·腾荒" }, splashImage: "/games/characters/starrail-1414.webp" },
  "1415": { id: "1415", image: "/games/starrail-1415.png", name: { en: "Cyrene", zh: "昔涟" }, splashImage: "/games/characters/starrail-1415.webp" },
  "1506": { id: "1506", image: "/games/starrail-1506.png", name: { en: "Silver Wolf LV.999", zh: "银狼LV.999" }, splashImage: "/games/characters/starrail-1506.webp" },
};

export const GENSHIN_FALLBACK_LEVELS = [
  ["10000096", 90],
  ["10000091", 86],
  ["10000089", 90],
  ["10000069", 80],
  ["10000114", 90],
  ["10000074", 80],
] as const;

export const STAR_RAIL_FALLBACK_IDS = [
  "1413",
  "1414",
  "1415",
  "1409",
  "1306",
  "1015",
  "1506",
] as const;
