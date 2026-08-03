import type { GameEquipment, GameSkill } from "@/lib/game-types";

type EquipmentMetadata = Omit<GameEquipment, "level" | "rank">;
type SkillMetadata = Omit<GameSkill, "level">;

export const GENSHIN_SKILLS: Record<string, SkillMetadata> = {
  "10691": { icon: "/games/loadout/genshin-skill-10691.png", id: "10691", name: { en: "Khanda Barrier-Buster", zh: "藏蕴破障" }, type: { en: "Normal Attack", zh: "普通攻击" } },
  "10692": { icon: "/games/loadout/genshin-skill-10692.png", id: "10692", name: { en: "Vijnana-Phala Mine", zh: "识果种雷" }, type: { en: "Elemental Skill", zh: "元素战技" } },
  "10695": { icon: "/games/loadout/genshin-skill-10695.png", id: "10695", name: { en: "Fashioner's Tanglevine Shaft", zh: "造生缠藤箭" }, type: { en: "Elemental Burst", zh: "元素爆发" } },
  "10741": { icon: "/games/loadout/genshin-skill-10741.png", id: "10741", name: { en: "Sword of the Radiant Path", zh: "熠辉轨度剑" }, type: { en: "Normal Attack", zh: "普通攻击" } },
  "10742": { icon: "/games/loadout/genshin-skill-10742.png", id: "10742", name: { en: "Nights of Formal Focus", zh: "垂裳端凝之夜" }, type: { en: "Elemental Skill", zh: "元素战技" } },
  "10745": { icon: "/games/loadout/genshin-skill-10745.png", id: "10745", name: { en: "Dream of the Star-Stream Shaker", zh: "星流摇床之梦" }, type: { en: "Elemental Burst", zh: "元素爆发" } },
  "10891": { icon: "/games/loadout/genshin-skill-10891.png", id: "10891", name: { en: "Soloist's Solicitation", zh: "独舞之邀" }, type: { en: "Normal Attack", zh: "普通攻击" } },
  "10892": { icon: "/games/loadout/genshin-skill-10892.png", id: "10892", name: { en: "Salon Solitaire", zh: "孤心沙龙" }, type: { en: "Elemental Skill", zh: "元素战技" } },
  "10895": { icon: "/games/loadout/genshin-skill-10895.png", id: "10895", name: { en: "Let the People Rejoice", zh: "万众狂欢" }, type: { en: "Elemental Burst", zh: "元素爆发" } },
  "10911": { icon: "/games/loadout/genshin-skill-10911.png", id: "10911", name: { en: "Blunt Refusal", zh: "直率的辞绝" }, type: { en: "Normal Attack", zh: "普通攻击" } },
  "10912": { icon: "/games/loadout/genshin-skill-10912.png", id: "10912", name: { en: "Ceremonial Crystalshot", zh: "典仪式晶火" }, type: { en: "Elemental Skill", zh: "元素战技" } },
  "10915": { icon: "/games/loadout/genshin-skill-10915.png", id: "10915", name: { en: "As the Sunlit Sky's Singing Salute", zh: "如霰澄天的鸣礼" }, type: { en: "Elemental Burst", zh: "元素爆发" } },
  "10961": { icon: "/games/loadout/genshin-skill-10961.png", id: "10961", name: { en: "Invitation to a Beheading", zh: "斩首之邀" }, type: { en: "Normal Attack", zh: "普通攻击" } },
  "10962": { icon: "/games/loadout/genshin-skill-10962.png", id: "10962", name: { en: "All Is Ash", zh: "万相化灰" }, type: { en: "Elemental Skill", zh: "元素战技" } },
  "10965": { icon: "/games/loadout/genshin-skill-10965.png", id: "10965", name: { en: "Balemoon Rising", zh: "厄月将升" }, type: { en: "Elemental Burst", zh: "元素爆发" } },
  "11141": { icon: "/games/loadout/genshin-skill-11141.png", id: "11141", name: { en: "Havoc: Sunder", zh: "极恶技·断" }, type: { en: "Normal Attack", zh: "普通攻击" } },
  "11142": { icon: "/games/loadout/genshin-skill-11142.png", id: "11142", name: { en: "Havoc: Warp", zh: "极恶技·闪" }, type: { en: "Elemental Skill", zh: "元素战技" } },
  "11145": { icon: "/games/loadout/genshin-skill-11145.png", id: "11145", name: { en: "Havoc: Ruin", zh: "极恶技·灭" }, type: { en: "Elemental Burst", zh: "元素爆发" } },
};

export const GENSHIN_WEAPONS: Record<string, EquipmentMetadata> = {
  "11403": { icon: "/games/loadout/genshin-weapon-11403.png", id: "11403", name: { en: "Sacrificial Sword", zh: "祭礼剑" } },
  "11407": { icon: "/games/loadout/genshin-weapon-11407.png", id: "11407", name: { en: "Iron Sting", zh: "铁蜂刺" } },
  "11426": { icon: "/games/loadout/genshin-weapon-11426.png", id: "11426", name: { en: "Fleuve Cendre Ferryman", zh: "灰河渡手" } },
  "12431": { icon: "/games/loadout/genshin-weapon-12431.png", id: "12431", name: { en: "Earth Shaker", zh: "撼地者" } },
  "13401": { icon: "/games/loadout/genshin-weapon-13401.png", id: "13401", name: { en: "Dragon's Bane", zh: "匣里灭辰" } },
  "15402": { icon: "/games/loadout/genshin-weapon-15402.png", id: "15402", name: { en: "The Stringless", zh: "绝弦" } },
};
