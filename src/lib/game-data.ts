import { GENSHIN_CHARACTERS, STAR_RAIL_CHARACTERS } from "@/data/game-characters";
import type { CharacterIdentity } from "@/data/game-characters";
import { getGameRankIcons } from "@/data/game-ranks";
import type { GenshinResponse, StarRailResponse } from "./enka-types";
import { getGenshinTotalStats, getStarRailTotalStats } from "./game-character-stats";
import {
  getGenshinSkills,
  getGenshinWeapon,
  getStarRailLightCone,
  getStarRailSkills,
  getStarRailTraceNodes,
} from "./game-loadout";
import { getGenshinRelics, getStarRailRelics } from "./game-relics";
import type { GameCharacter, GameProfile } from "./game-types";
import type { MihomoStarRailResponse } from "./mihomo-types";
import { RUNTIME_FALLBACK } from "./runtime-fallback";
import { fetchFromServer } from "./server-fetch";

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

const REQUEST_OPTIONS = {
  headers: { "User-Agent": "Langning Chen portfolio" },
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
          weaponItem?.flat?.rankLevel,
          weaponItem?.flat?.weaponStats ?? [],
        ),
        friendship: avatar.fetterInfo?.expLevel,
        hp: fight["2000"],
        rank: avatar.talentIdList?.length ?? 0,
        rankIcons: getGameRankIcons("genshin", String(avatar.avatarId)),
        relics: getGenshinRelics(avatar.equipList ?? []),
        skills: getGenshinSkills(avatar.skillLevelMap ?? {}),
        totalStats: getGenshinTotalStats(fight),
      },
    );
  }));
  return {
    achievementCount: player.finishAchievementNum,
    avatar: showcase[0]?.image ?? RUNTIME_FALLBACK.games.genshin.avatar,
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

function normalizeStarRail(
  response: StarRailResponse,
  parsedResponse: MihomoStarRailResponse | null,
): GameProfile {
  const player = response.detailInfo;
  const parsedCharacters = new Map(
    (parsedResponse?.characters ?? []).map((character) => [character.id, character]),
  );
  const showcase = compactCharacters((player.avatarDetailList ?? []).map((avatar) => {
    const parsedCharacter = parsedCharacters.get(String(avatar.avatarId));
    return buildCharacter(
      STAR_RAIL_CHARACTERS,
      String(avatar.avatarId),
      avatar.level,
      {
        equipment: getStarRailLightCone(
          avatar.equipment?.tid,
          avatar.equipment?.level,
          avatar.equipment?.rank,
          parsedCharacter?.light_cone,
        ),
        rank: avatar.rank ?? 0,
        rankIcons: getGameRankIcons(
          "starRail",
          String(avatar.avatarId),
          parsedCharacter?.rank_icons,
        ),
        relics: getStarRailRelics(avatar.relicList ?? []),
        skills: getStarRailSkills(avatar.skillTreeList ?? []),
        totalStats: getStarRailTotalStats(
          parsedCharacter?.statistics ?? [],
        ),
        traceNodes: getStarRailTraceNodes(parsedCharacter?.skill_trees ?? []),
      },
    );
  }));
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

function mergeStarRailDetails(
  profile: GameProfile,
  parsedResponse: MihomoStarRailResponse | null,
): GameProfile {
  if (!parsedResponse) return profile;
  const parsedCharacters = new Map(
    parsedResponse.characters.map((character) => [character.id, character]),
  );
  return {
    ...profile,
    showcase: profile.showcase.map((character) => {
      const parsedCharacter = parsedCharacters.get(character.id);
      const equipment = character.details.equipment;
      return {
        ...character,
        details: {
          ...character.details,
          equipment: getStarRailLightCone(
            equipment === undefined ? undefined : Number(equipment.id),
            equipment?.level,
            equipment?.rank,
            parsedCharacter?.light_cone,
          ) ?? equipment,
          rank: parsedCharacter?.rank ?? character.details.rank,
          rankIcons: getGameRankIcons(
            "starRail",
            character.id,
            parsedCharacter?.rank_icons,
          ),
          totalStats: getStarRailTotalStats(parsedCharacter?.statistics ?? []),
          traceNodes: getStarRailTraceNodes(parsedCharacter?.skill_trees ?? []),
        },
      };
    }),
  };
}

async function requestProfile<T>(url: string): Promise<T | null> {
  try {
    const response = await fetchFromServer(
      url,
      REQUEST_OPTIONS,
      { bypassCache: true },
    );
    return response.ok ? (await response.json()) as T : null;
  } catch {
    return null;
  }
}

export async function getGenshinProfile(): Promise<GameProfile> {
  const response = await requestProfile<GenshinResponse>(
    "https://enka.network/api/uid/302368983/",
  );
  return response ? normalizeGenshin(response) : RUNTIME_FALLBACK.games.genshin;
}

export async function getStarRailProfile(): Promise<GameProfile> {
  const [response, parsedResponse] = await Promise.all([
    requestProfile<StarRailResponse>(
      "https://enka.network/api/hsr/uid/161319930/",
    ),
    requestProfile<MihomoStarRailResponse>(
      "https://api.mihomo.me/sr_info_parsed/161319930?lang=cn",
    ),
  ]);
  return response
    ? normalizeStarRail(response, parsedResponse)
    : mergeStarRailDetails(RUNTIME_FALLBACK.games.starRail, parsedResponse);
}
