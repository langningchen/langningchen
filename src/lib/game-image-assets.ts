import {
  GENSHIN_CHARACTERS,
  STAR_RAIL_CHARACTERS,
} from "@/data/game-characters";
import type { GameCharacter, GameId, GameProfile } from "./game-types";
import type { ImagePreloadAsset } from "./image-preloader";

const GAME_ROUTE_IMAGES: Record<GameId, ImagePreloadAsset[]> = {
  genshin: [
    { sizes: "100vw", src: "/games/genshin-background.jpg" },
    { sizes: "132px", src: "/games/genshin-portal.jpg" },
    { sizes: "30px", src: "/games/genshin-official.ico" },
  ],
  starRail: [
    { sizes: "100vw", src: "/games/starrail-background.jpg" },
    { sizes: "132px", src: "/games/starrail-portal.jpg" },
    { sizes: "30px", src: "/games/starrail-official.png" },
  ],
};

function uniqueAssets(assets: ImagePreloadAsset[]): ImagePreloadAsset[] {
  const seen = new Set<string>();
  return assets.filter((asset) => {
    const key = `${asset.src}|${asset.sizes ?? "100vw"}`;
    if (seen.has(key)) return false;
    seen.add(key);
    return true;
  });
}

export function getGameRouteImageAssets(
  game: GameId,
  includeCharacterArt = false,
): ImagePreloadAsset[] {
  const characters = Object.values(
    game === "genshin" ? GENSHIN_CHARACTERS : STAR_RAIL_CHARACTERS,
  );
  const characterAssets = characters.flatMap((character) => [
    { sizes: "112px", src: character.image },
    ...(includeCharacterArt
      ? [{ sizes: "(max-width: 600px) 94vw, 760px", src: character.splashImage }]
      : []),
  ]);

  return uniqueAssets([...GAME_ROUTE_IMAGES[game], ...characterAssets]);
}

export function getGameCharacterImageAssets(
  character: GameCharacter,
  includeDetails = true,
): ImagePreloadAsset[] {
  const details = character.details;
  return uniqueAssets([
    { sizes: "112px", src: character.image },
    { sizes: "(max-width: 600px) 94vw, 760px", src: character.splashImage },
    ...(includeDetails && details.equipment
      ? [{ sizes: "96px", src: details.equipment.icon }]
      : []),
    ...(includeDetails ? details.rankIcons ?? [] : []).map((src) => ({ sizes: "54px", src })),
    ...(includeDetails ? details.relics : []).map((relic) => ({ sizes: "82px", src: relic.icon })),
    ...(includeDetails ? details.skills : []).map((skill) => ({ sizes: "64px", src: skill.icon })),
    ...(includeDetails ? details.traceNodes ?? [] : []).map((node) => ({ sizes: "64px", src: node.icon })),
  ]);
}

export function getGameProfileImageAssets(
  profile: GameProfile,
  includeDetails = true,
): ImagePreloadAsset[] {
  const assets = profile.showcase.flatMap((character) => (
    getGameCharacterImageAssets(character, includeDetails)
  ));

  return uniqueAssets(assets);
}
