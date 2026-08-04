export interface MihomoStarRailStatistic {
  field: string;
  icon: string;
  percent: boolean;
  value: number;
}

export interface MihomoStarRailLightCone {
  attributes: MihomoStarRailStatistic[];
  id: string;
  level: number;
  properties: MihomoStarRailStatistic[];
  rank: number;
  rarity: number;
}

export interface MihomoStarRailTrace {
  icon: string;
  id: string;
  level: number;
  max_level: number;
  parent: string | null;
}

export interface MihomoStarRailCharacter {
  id: string;
  light_cone: MihomoStarRailLightCone | null;
  rank: number;
  rank_icons: string[];
  skill_trees: MihomoStarRailTrace[];
  statistics: MihomoStarRailStatistic[];
}

export interface MihomoStarRailResponse {
  characters: MihomoStarRailCharacter[];
}
