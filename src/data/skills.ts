import { INFRASTRUCTURE_SKILLS } from "./infrastructure-skills";
import { LANGUAGE_SKILLS } from "./language-skills";
import { PRODUCT_SKILLS } from "./product-skills";
import type { SkillGroup } from "./skill-types";

export const SKILL_GROUPS: SkillGroup[] = [
  { items: LANGUAGE_SKILLS, label: "languages" },
  { items: PRODUCT_SKILLS, label: "product" },
  { items: INFRASTRUCTURE_SKILLS, label: "infrastructure" },
];
