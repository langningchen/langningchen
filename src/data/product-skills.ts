import { siMui, siNextdotjs, siNodedotjs, siReact, siTampermonkey, siVscodium } from "simple-icons";
import type { Skill } from "./skill-types";

export const PRODUCT_SKILLS: Skill[] = [
  { color: "#4b5a53", icon: siNextdotjs, label: "Next.js" },
  { color: "#61dafb", icon: siReact, label: "React" },
  { color: "#339933", icon: siNodedotjs, label: "Node.js" },
  { color: "#007fff", icon: siMui, label: "MUI" },
  { color: "#007acc", icon: siVscodium, label: "VS Code Extensions" },
  { color: "#00485b", icon: siTampermonkey, label: "Userscripts" },
];
