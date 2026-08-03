type ProjectDescriptionKey =
  | "cphNg"
  | "hydroHelper"
  | "luoguCaptcha"
  | "math"
  | "miniapp"
  | "oj"
  | "shanghaiTextbook"
  | "xmojScript";

export function getProjectDescriptionKey(name: string): ProjectDescriptionKey | null {
  const normalized = name.toLowerCase();
  if (normalized === "cph-ng") return "cphNg";
  if (normalized === "xmoj-script") return "xmojScript";
  if (normalized === "oj") return "oj";
  if (normalized === "hydro-helper") return "hydroHelper";
  if (normalized === "shanghai-textbook-server") return "shanghaiTextbook";
  if (normalized === "miniapp") return "miniapp";
  if (normalized === "luogucaptcha") return "luoguCaptcha";
  if (normalized === "math") return "math";
  return null;
}

export function getProjectName(name: string): string {
  const normalized = name.toLowerCase();
  if (normalized === "cph-ng") return "CPH-NG";
  if (normalized === "xmoj-script") return "XMOJ Script";
  return name;
}
