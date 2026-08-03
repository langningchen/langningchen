import type { GameEquipment, GameSkill } from "@/lib/game-types";

type EquipmentMetadata = Omit<GameEquipment, "level" | "rank">;
type SkillMetadata = Omit<GameSkill, "level">;

export const STAR_RAIL_SKILLS: Record<string, SkillMetadata> = {
  "1015001": { icon: "/games/loadout/starrail-skill-1015001.png", id: "1015001", name: { en: "Kanshou and Bakuya", zh: "干将•莫邪" }, type: { en: "Basic ATK", zh: "普攻" } },
  "1015002": { icon: "/games/loadout/starrail-skill-1015002.png", id: "1015002", name: { en: "Caladbolg II: Fake Spiral Sword", zh: "伪•螺旋剑" }, type: { en: "Skill", zh: "战技" } },
  "1015003": { icon: "/games/loadout/starrail-skill-1015003.png", id: "1015003", name: { en: "Unlimited Blade Works", zh: "无限剑制" }, type: { en: "Ultimate", zh: "终结技" } },
  "1015004": { icon: "/games/loadout/starrail-skill-1015004.png", id: "1015004", name: { en: "Mind's Eye (True)", zh: "心眼（真）" }, type: { en: "Talent", zh: "天赋" } },
  "11306001": { icon: "/games/loadout/starrail-skill-11306001.png", id: "11306001", name: { en: "Monodrama", zh: "独角戏" }, type: { en: "Basic ATK", zh: "普攻" } },
  "11306002": { icon: "/games/loadout/starrail-skill-11306002.png", id: "11306002", name: { en: "Dreamdiver", zh: "梦游鱼" }, type: { en: "Skill", zh: "战技" } },
  "11306003": { icon: "/games/loadout/starrail-skill-11306003.png", id: "11306003", name: { en: "The Hero with a Thousand Faces", zh: "一人千役" }, type: { en: "Ultimate", zh: "终结技" } },
  "11306004": { icon: "/games/loadout/starrail-skill-11306004.png", id: "11306004", name: { en: "Red Herring", zh: "叙述性诡计" }, type: { en: "Talent", zh: "天赋" } },
  "1409001": { icon: "/games/loadout/starrail-skill-1409001.png", id: "1409001", name: { en: "When Breeze Kisses Cirrus", zh: "当微风轻吻云沫" }, type: { en: "Basic ATK", zh: "普攻" } },
  "1409002": { icon: "/games/loadout/starrail-skill-1409002.png", id: "1409002", name: { en: "Love Over the Rainbow", zh: "爱在虹光洒落时" }, type: { en: "Skill", zh: "战技" } },
  "1409003": { icon: "/games/loadout/starrail-skill-1409003.png", id: "1409003", name: { en: "We Who Fly Into Twilight", zh: "飞入晨昏的我们" }, type: { en: "Ultimate", zh: "终结技" } },
  "1409004": { icon: "/games/loadout/starrail-skill-1409004.png", id: "1409004", name: { en: "First Light Heals the World", zh: "疗愈世间的晨曦" }, type: { en: "Talent", zh: "天赋" } },
  "1413001": { icon: "/games/loadout/starrail-skill-1413001.png", id: "1413001", name: { en: "Time Thence Blurs", zh: "从此岁月朦胧" }, type: { en: "Basic ATK", zh: "普攻" } },
  "1413002": { icon: "/games/loadout/starrail-skill-1413002.png", id: "1413002", name: { en: "Day Gently Slips", zh: "白昼悄然离去" }, type: { en: "Skill", zh: "战技" } },
  "1413003": { icon: "/games/loadout/starrail-skill-1413003.png", id: "1413003", name: { en: "O Wakeful World, Goodnight", zh: "晚安，全世界无眠" }, type: { en: "Ultimate", zh: "终结技" } },
  "1413004": { icon: "/games/loadout/starrail-skill-1413004.png", id: "1413004", name: { en: "With Me, This Night", zh: "今夜与我同行" }, type: { en: "Talent", zh: "天赋" } },
  "1414001": { icon: "/games/loadout/starrail-skill-1414001.png", id: "1414001", name: { en: "Aegis Vitae", zh: "镇恶护生" }, type: { en: "Basic ATK", zh: "普攻" } },
  "1414002": { icon: "/games/loadout/starrail-skill-1414002.png", id: "1414002", name: { en: "Terra Omnibus", zh: "渊渟岳峙，地载八荒" }, type: { en: "Skill", zh: "战技" } },
  "1414003": { icon: "/games/loadout/starrail-skill-1414003.png", id: "1414003", name: { en: "A Dragon's Zenith Knows No Rue", zh: "亢龙无悔，移山辟世" }, type: { en: "Ultimate", zh: "终结技" } },
  "1414004": { icon: "/games/loadout/starrail-skill-1414004.png", id: "1414004", name: { en: "Of Virtue, Forms Unfold", zh: "生生之德，品物流形" }, type: { en: "Talent", zh: "天赋" } },
  "1415001": { icon: "/games/loadout/starrail-skill-1415001.png", id: "1415001", name: { en: "Lo, Hope Takes Flight!", zh: "看，希望的起始！" }, type: { en: "Basic ATK", zh: "普攻" } },
  "1415002": { icon: "/games/loadout/starrail-skill-1415002.png", id: "1415002", name: { en: "Bloom, Elysium of Beyond", zh: "盛放吧，来世的乐土" }, type: { en: "Skill", zh: "战技" } },
  "1415003": { icon: "/games/loadout/starrail-skill-1415003.png", id: "1415003", name: { en: "Verse ◦ Vow ∞", zh: "诗的「◦」誓约的「∞」" }, type: { en: "Ultimate", zh: "终结技" } },
  "1415004": { icon: "/games/loadout/starrail-skill-1415004.png", id: "1415004", name: { en: "Hearts Gather as One", zh: "众愿啊，汇流如歌" }, type: { en: "Talent", zh: "天赋" } },
  "1506001": { icon: "/games/loadout/starrail-skill-1506001.png", id: "1506001", name: { en: "One Punch!", zh: "拳头硬了！" }, type: { en: "Basic ATK", zh: "普攻" } },
  "1506002": { icon: "/games/loadout/starrail-skill-1506002.png", id: "1506002", name: { en: "Trigger Happy", zh: "Shoot属性大爆发" }, type: { en: "Skill", zh: "战技" } },
  "1506003": { icon: "/games/loadout/starrail-skill-1506003.png", id: "1506003", name: { en: "God Mode: ON!", zh: "无敌玩家，启动！" }, type: { en: "Ultimate", zh: "终结技" } },
  "1506004": { icon: "/games/loadout/starrail-skill-1506004.png", id: "1506004", name: { en: "I Carry, We Win", zh: "有我在，把把都是顺风局" }, type: { en: "Talent", zh: "天赋" } },
};

export const STAR_RAIL_LIGHT_CONES: Record<string, EquipmentMetadata> = {
  "20007": { icon: "/games/loadout/starrail-light-cone-20007.png", id: "20007", name: { en: "Darting Arrow", zh: "离弦" } },
  "21023": { icon: "/games/loadout/starrail-light-cone-21023.png", id: "21023", name: { en: "We Are Wildfire", zh: "我们是地火" } },
  "21025": { icon: "/games/loadout/starrail-light-cone-21025.png", id: "21025", name: { en: "Past and Future", zh: "过往未来" } },
  "21054": { icon: "/games/loadout/starrail-light-cone-21054.png", id: "21054", name: { en: "The Story's Next Page", zh: "故事的下一页" } },
  "22007": { icon: "/games/loadout/starrail-light-cone-22007.png", id: "22007", name: { en: "Tomorrow, Together", zh: "未来，有我们一起" } },
  "23049": { icon: "/games/loadout/starrail-light-cone-23049.png", id: "23049", name: { en: "To Evernight's Stars", zh: "致长夜的星光" } },
  "24005": { icon: "/games/loadout/starrail-light-cone-24005.png", id: "24005", name: { en: "Memory's Curtain Never Falls", zh: "记忆永不落幕" } },
};
