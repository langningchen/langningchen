import AlbumRounded from "@mui/icons-material/AlbumRounded";
import AutoAwesomeRounded from "@mui/icons-material/AutoAwesomeRounded";
import DiamondRounded from "@mui/icons-material/DiamondRounded";
import FavoriteRounded from "@mui/icons-material/FavoriteRounded";
import GroupsRounded from "@mui/icons-material/GroupsRounded";
import MenuBookRounded from "@mui/icons-material/MenuBookRounded";
import MilitaryTechRounded from "@mui/icons-material/MilitaryTechRounded";
import PublicRounded from "@mui/icons-material/PublicRounded";
import StyleRounded from "@mui/icons-material/StyleRounded";
import type { ReactNode } from "react";

type GameMetricKey =
  | "achievements"
  | "books"
  | "characters"
  | "friendship"
  | "level"
  | "lightCones"
  | "music"
  | "relics"
  | "worldLevel";

interface GameMetricIconProps {
  metric: GameMetricKey;
}

export default function GameMetricIcon({ metric }: GameMetricIconProps) {
  const icons = {
    achievements: <MilitaryTechRounded fontSize="small" />,
    books: <MenuBookRounded fontSize="small" />,
    characters: <GroupsRounded fontSize="small" />,
    friendship: <FavoriteRounded fontSize="small" />,
    level: <AutoAwesomeRounded fontSize="small" />,
    lightCones: <StyleRounded fontSize="small" />,
    music: <AlbumRounded fontSize="small" />,
    relics: <DiamondRounded fontSize="small" />,
    worldLevel: <PublicRounded fontSize="small" />,
  } satisfies Record<GameMetricKey, ReactNode>;

  return icons[metric];
}
