import {
  GENSHIN_CHARACTERS,
  GENSHIN_FALLBACK_LEVELS,
  STAR_RAIL_CHARACTERS,
  STAR_RAIL_FALLBACK_IDS,
} from "@/data/game-characters";
import type { CharacterIdentity } from "@/data/game-characters";
import type { GenshinResponse, StarRailResponse } from "./enka-types";
import {
  getGenshinSkills,
  getGenshinWeapon,
  getStarRailLightCone,
  getStarRailSkills,
} from "./game-loadout";
import { getGenshinRelics, getStarRailRelics } from "./game-relics";
import type { GameCharacter, GameProfile } from "./game-types";

export type { GameProfile } from "./game-types";

function buildCharacter(
  identities: Record<string, CharacterIdentity>,
  id: string,
  level: number,
  details: GameCharacter["details"] = { rank: 0, relics: [], skills: [] },
): GameCharacter | null {
  const identity = identities[id];
  return identity ? { ...identity, details, level } : null;
}

function compactCharacters(characters: Array<GameCharacter | null>): GameCharacter[] {
  return characters.filter((character): character is GameCharacter => character !== null);
}

const GENSHIN_FALLBACK_LOADOUTS = {
  "10000069": { friendship: 5, rank: 2, skills: { "10691": 6, "10692": 6, "10695": 6 }, weapon: [15402, 80, 1] },
  "10000074": { friendship: 10, rank: 0, skills: { "10741": 6, "10742": 8, "10745": 6 }, weapon: [11403, 80, 1] },
  "10000089": { friendship: 10, rank: 2, skills: { "10891": 6, "10892": 10, "10895": 7 }, weapon: [11426, 90, 1] },
  "10000091": { friendship: 10, rank: 0, skills: { "10911": 5, "10912": 6, "10915": 5 }, weapon: [12431, 90, 1] },
  "10000096": { friendship: 10, rank: 0, skills: { "10961": 10, "10962": 8, "10965": 7 }, weapon: [13401, 90, 1] },
  "10000114": { friendship: 7, rank: 0, skills: { "11141": 6, "11142": 7, "11145": 8 }, weapon: [11407, 80, 1] },
} as const;

const STAR_RAIL_FALLBACK_LOADOUTS = {
  "1015": { lightCone: [20007, 80, 1], skills: [[1015001, 6], [1015002, 10], [1015003, 10], [1015004, 10]] },
  "1306": { lightCone: [21025, 80, 1], skills: [[11306001, 6], [11306002, 10], [11306003, 10], [11306004, 10]] },
  "1409": { lightCone: [21054, 80, 1], skills: [[1409001, 6], [1409002, 10], [1409003, 10], [1409004, 10]] },
  "1413": { lightCone: [23049, 80, 1], rank: 2, skills: [[1413001, 6], [1413002, 10], [1413003, 10], [1413004, 10]] },
  "1414": { lightCone: [21023, 80, 1], skills: [[1414001, 5], [1414002, 10], [1414003, 9], [1414004, 8]] },
  "1415": { lightCone: [24005, 80, 5], skills: [[1415001, 6], [1415002, 10], [1415003, 10], [1415004, 10]] },
  "1506": { lightCone: [22007, 80, 5], skills: [[1506001, 6], [1506002, 5], [1506003, 10], [1506004, 9]] },
} as const;

function getGenshinFallbackDetails(id: keyof typeof GENSHIN_FALLBACK_LOADOUTS) {
  const loadout = GENSHIN_FALLBACK_LOADOUTS[id];
  const [weaponId, weaponLevel, weaponRank] = loadout.weapon;
  return {
    equipment: getGenshinWeapon(weaponId, weaponLevel, weaponRank),
    friendship: loadout.friendship,
    rank: loadout.rank,
    relics: [],
    skills: getGenshinSkills(loadout.skills),
  };
}

function getStarRailFallbackDetails(id: keyof typeof STAR_RAIL_FALLBACK_LOADOUTS) {
  const loadout = STAR_RAIL_FALLBACK_LOADOUTS[id];
  const [lightConeId, lightConeLevel, lightConeRank] = loadout.lightCone;
  return {
    equipment: getStarRailLightCone(lightConeId, lightConeLevel, lightConeRank),
    rank: "rank" in loadout ? loadout.rank : 0,
    relics: [],
    skills: getStarRailSkills(loadout.skills.map(([pointId, level]) => ({ level, pointId }))),
  };
}

const GENSHIN_FALLBACK: GameProfile = {
  achievementCount: 424,
  avatar: "/games/genshin-10000096.png",
  extraMetrics: [
    { label: "characters", value: 6 },
    { label: "friendship", value: 5 },
  ],
  game: "genshin",
  level: 56,
  nickname: "LangningChen",
  showcase: compactCharacters(
    GENSHIN_FALLBACK_LEVELS.map(([id, level]) =>
      buildCharacter(GENSHIN_CHARACTERS, id, level, getGenshinFallbackDetails(id)),
    ),
  ),
  uid: "302368983",
  worldLevel: 8,
};

const STAR_RAIL_FALLBACK: GameProfile = {
  achievementCount: 608,
  avatar: "/games/starrail-1506.png",
  extraMetrics: [
    { label: "characters", value: 36 },
    { label: "lightCones", value: 67 },
    { label: "music", value: 28 },
  ],
  game: "starRail",
  level: 70,
  nickname: "LangningChen",
  showcase: STAR_RAIL_FALLBACK_IDS.map((id) => ({
    ...STAR_RAIL_CHARACTERS[id],
    details: getStarRailFallbackDetails(id),
    level: 80,
  })),
  uid: "161319930",
  worldLevel: 6,
};

const REQUEST_OPTIONS = {
  headers: { "User-Agent": "Langning Chen portfolio" },
  next: { revalidate: 300 },
} as const;

function normalizeGenshin(response: GenshinResponse): GameProfile {
  const player = response.playerInfo;
  const showcase = compactCharacters((response.avatarInfoList ?? []).map((avatar) => {
    const fight = avatar.fightPropMap ?? {};
    const weaponItem = avatar.equipList?.find((item) => item.weapon);
    const weapon = weaponItem?.weapon;
    const refinement = Object.values(weapon?.affixMap ?? {})[0];
    return buildCharacter(
      GENSHIN_CHARACTERS,
      String(avatar.avatarId),
      Number(avatar.propMap?.["4001"]?.ival ?? 0),
      {
        attack: fight["2001"],
        critDamage: fight["22"] === undefined ? undefined : fight["22"] * 100,
        critRate: fight["20"] === undefined ? undefined : fight["20"] * 100,
        defense: fight["2002"],
        equipment: getGenshinWeapon(
          weaponItem?.itemId,
          weapon?.level,
          refinement === undefined ? undefined : refinement + 1,
        ),
        friendship: avatar.fetterInfo?.expLevel,
        hp: fight["2000"],
        rank: avatar.talentIdList?.length ?? 0,
        relics: getGenshinRelics(avatar.equipList ?? []),
        skills: getGenshinSkills(avatar.skillLevelMap ?? {}),
      },
    );
  }));
  return {
    achievementCount: player.finishAchievementNum,
    avatar: showcase[0]?.image ?? GENSHIN_FALLBACK.avatar,
    extraMetrics: [
      { label: "characters", value: showcase.length },
      { label: "friendship", value: player.fetterCount },
    ],
    game: "genshin",
    level: player.level,
    nickname: player.nickname,
    showcase,
    uid: response.uid,
    worldLevel: player.worldLevel,
  };
}

function normalizeStarRail(response: StarRailResponse): GameProfile {
  const player = response.detailInfo;
  const showcase = compactCharacters((player.avatarDetailList ?? []).map((avatar) =>
    buildCharacter(
      STAR_RAIL_CHARACTERS,
      String(avatar.avatarId),
      avatar.level,
      {
        equipment: getStarRailLightCone(
          avatar.equipment?.tid,
          avatar.equipment?.level,
          avatar.equipment?.rank,
        ),
        rank: avatar.rank ?? 0,
        relics: getStarRailRelics(avatar.relicList ?? []),
        skills: getStarRailSkills(avatar.skillTreeList ?? []),
      },
    ),
  ));
  return {
    achievementCount: player.recordInfo.achievementCount,
    avatar: "/games/starrail-1506.png",
    extraMetrics: [
      { label: "characters", value: player.recordInfo.avatarCount },
      { label: "lightCones", value: player.recordInfo.equipmentCount },
      { label: "music", value: player.recordInfo.musicCount },
      { label: "books", value: player.recordInfo.bookCount ?? 0 },
      { label: "relics", value: player.recordInfo.relicCount ?? 0 },
    ],
    game: "starRail",
    level: player.level,
    nickname: player.nickname,
    showcase,
    uid: response.uid,
    worldLevel: player.worldLevel,
  };
}

async function requestProfile<T>(url: string): Promise<T | null> {
  try {
    const response = await fetch(url, REQUEST_OPTIONS);
    return response.ok ? (await response.json()) as T : null;
  } catch {
    return null;
  }
}

export async function getGenshinProfile(): Promise<GameProfile> {
  const response = await requestProfile<GenshinResponse>(
    "https://enka.network/api/uid/302368983/",
  );
  return response ? normalizeGenshin(response) : GENSHIN_FALLBACK;
}

export async function getStarRailProfile(): Promise<GameProfile> {
  const response = await requestProfile<StarRailResponse>(
    "https://enka.network/api/hsr/uid/161319930/",
  );
  return response ? normalizeStarRail(response) : STAR_RAIL_FALLBACK;
}
