import type { LanguageStat } from "./github";

interface WakaTimeItem {
  name: string;
  percent: number;
  text: string;
}

export interface WakaTimeResponse {
  data: {
    human_readable_daily_average: string;
    human_readable_range: string;
    human_readable_total: string;
    languages: WakaTimeItem[];
  };
}

export interface WakaTimeData {
  dailyAverage: string;
  languages: LanguageStat[];
  range: string;
  total: string;
}

const COLORS: Record<string, string> = {
  "C++": "#f05c82",
  JavaScript: "#d6b72c",
  PHP: "#777bb4",
  Python: "#4f8fc9",
  Rust: "#b65d2e",
  TypeScript: "#3178c6",
};

const PROGRAMMING_LANGUAGES = new Set([
  "C",
  "C++",
  "JavaScript",
  "PHP",
  "Python",
  "Rust",
  "TypeScript",
]);

export function normalizeWakaTime(response: WakaTimeResponse): WakaTimeData {
  return {
    dailyAverage: response.data.human_readable_daily_average,
    languages: response.data.languages
      .filter((language) => PROGRAMMING_LANGUAGES.has(language.name))
      .slice(0, 6)
      .map((language) => ({
        color: COLORS[language.name] ?? "#87dbac",
        name: language.name,
        value: language.percent,
      })),
    range: response.data.human_readable_range,
    total: response.data.human_readable_total,
  };
}
