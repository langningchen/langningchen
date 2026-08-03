"use client";

import { useEffect, useState } from "react";
import type { PaletteMode } from "@mui/material";
import type { Language } from "@/i18n/config";

const LANGUAGE_KEY = "portfolio-language";
const THEME_KEY = "portfolio-theme";

export function usePreferences() {
  const [language, setLanguage] = useState<Language>("en");
  const [mode, setMode] = useState<PaletteMode>("dark");
  const [preferencesLoaded, setPreferencesLoaded] = useState(false);

  useEffect(() => {
    const loadPreferences = () => {
      const storedLanguage = window.localStorage.getItem(LANGUAGE_KEY);
      const storedMode = window.localStorage.getItem(THEME_KEY);

      if (storedLanguage === "en" || storedLanguage === "zh") {
        setLanguage(storedLanguage);
      } else if (navigator.language.toLowerCase().startsWith("zh")) {
        setLanguage("zh");
      }

      if (storedMode === "light" || storedMode === "dark") {
        setMode(storedMode);
      }
      setPreferencesLoaded(true);
    };
    const syncPreferences = (event: StorageEvent) => {
      if (event.key === LANGUAGE_KEY && (event.newValue === "en" || event.newValue === "zh")) {
        setLanguage(event.newValue);
      }
      if (event.key === THEME_KEY && (event.newValue === "light" || event.newValue === "dark")) {
        setMode(event.newValue);
      }
    };

    loadPreferences();
    window.addEventListener("storage", syncPreferences);
    return () => window.removeEventListener("storage", syncPreferences);
  }, []);

  useEffect(() => {
    if (!preferencesLoaded) return;
    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
    document.documentElement.style.colorScheme = mode;
    window.localStorage.setItem(LANGUAGE_KEY, language);
    window.localStorage.setItem(THEME_KEY, mode);
  }, [language, mode, preferencesLoaded]);

  return {
    language,
    mode,
    setLanguage,
    toggleMode: () => setMode((current) => (current === "dark" ? "light" : "dark")),
  };
}
