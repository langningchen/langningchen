import type { SimpleIcon } from "simple-icons";

export interface Skill {
  color: string;
  icon: SimpleIcon;
  label: string;
}

export interface SkillGroup {
  items: Skill[];
  label: "infrastructure" | "languages" | "product";
}
