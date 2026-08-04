"use client";

import { useCallback, useEffect, useMemo, useState } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { AnimatePresence } from "motion/react";
import type { Route } from "next";
import { NextIntlClientProvider } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { usePreferences } from "@/hooks/use-preferences";
import { MESSAGES } from "@/i18n/config";
import { createSiteTheme } from "@/theme/create-site-theme";
import InitialLoadingScreen from "./initial-loading-screen";
import SiteHeader from "./site-header";
import RouteTransition from "./route-transition";
import SmoothScroll from "./smooth-scroll";

interface ClientAppShellProps {
  children: React.ReactNode;
}

export default function ClientAppShell({ children }: ClientAppShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const [appReady, setAppReady] = useState(false);
  const { language, mode, ready: preferencesReady, setLanguage, toggleMode } =
    usePreferences();
  const theme = useMemo(() => createSiteTheme(mode), [mode]);
  const handleReady = useCallback(() => setAppReady(true), []);

  useEffect(() => {
    router.prefetch("/");
    router.prefetch("/community" as Route);
    router.prefetch("/projects");
    router.prefetch("/games/genshin");
    router.prefetch("/games/star-rail");
  }, [router]);

  return (
    <NextIntlClientProvider locale={language} messages={MESSAGES[language]} timeZone="Asia/Shanghai">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SmoothScroll />
        <AnimatePresence>
          {!appReady && (
            <InitialLoadingScreen
              onReady={handleReady}
              preferencesReady={preferencesReady}
            />
          )}
        </AnimatePresence>
        <SiteHeader
          homeSections={pathname === "/"}
          language={language}
          mode={mode}
          onLanguageChange={setLanguage}
          onModeChange={toggleMode}
        />
        <RouteTransition ready={appReady}>{children}</RouteTransition>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
