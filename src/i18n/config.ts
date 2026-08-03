import englishMessages from "@/messages/en.json";
import chineseMessages from "@/messages/zh.json";

export const LOCALES = ["en", "zh"] as const;
export type Language = (typeof LOCALES)[number];

export const MESSAGES = {
  en: englishMessages,
  zh: chineseMessages,
};
