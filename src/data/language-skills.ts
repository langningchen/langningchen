import { siC, siCplusplus, siJavascript, siPython, siRust, siTypescript } from "simple-icons";
import type { Skill } from "./skill-types";

export const LANGUAGE_SKILLS: Skill[] = [
  { color: "#3178c6", icon: siTypescript, label: "TypeScript" },
  { color: "#00599c", icon: siCplusplus, label: "C++" },
  { color: "#f7df1e", icon: siJavascript, label: "JavaScript" },
  { color: "#3776ab", icon: siPython, label: "Python" },
  { color: "#b7410e", icon: siRust, label: "Rust" },
  { color: "#7b8ca8", icon: siC, label: "C" },
];
