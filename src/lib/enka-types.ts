export interface EnkaGenshinStat {
  appendPropId?: string;
  mainPropId?: string;
  statValue: number;
}

export interface EnkaGenshinEquipItem {
  flat?: {
    equipType?: string;
    icon?: string;
    rankLevel?: number;
    reliquaryMainstat?: EnkaGenshinStat;
    reliquarySubstats?: EnkaGenshinStat[];
    setId?: number;
  };
  itemId?: number;
  reliquary?: { level?: number };
  weapon?: { affixMap?: Record<string, number>; level?: number };
}

export interface GenshinResponse {
  avatarInfoList?: Array<{
    avatarId: number;
    equipList?: EnkaGenshinEquipItem[];
    fetterInfo?: { expLevel?: number };
    fightPropMap?: Record<string, number>;
    propMap?: Record<string, { ival?: string }>;
    skillLevelMap?: Record<string, number>;
    talentIdList?: number[];
  }>;
  playerInfo: {
    fetterCount: number;
    finishAchievementNum: number;
    level: number;
    nickname: string;
    showAvatarInfoList?: Array<{ avatarId: number; level: number }>;
    worldLevel: number;
  };
  uid: string;
}

export interface EnkaStarRailRelic {
  _flat?: {
    props?: Array<{ type: string; value: number }>;
    setID?: number;
  };
  level: number;
  tid: number;
  type: number;
}

export interface StarRailResponse {
  detailInfo: {
    avatarDetailList?: Array<{
      avatarId: number;
      equipment?: { level?: number; rank?: number; tid?: number };
      level: number;
      rank?: number | null;
      relicList?: EnkaStarRailRelic[];
      skillTreeList?: Array<{ level: number; pointId: number }>;
    }>;
    level: number;
    nickname: string;
    recordInfo: {
      achievementCount: number;
      avatarCount: number;
      bookCount?: number;
      equipmentCount: number;
      musicCount: number;
      relicCount?: number;
    };
    worldLevel: number;
  };
  uid: string;
}
