"use client";

import { useEffect, useMemo } from "react";
import CssBaseline from "@mui/material/CssBaseline";
import { ThemeProvider } from "@mui/material/styles";
import { NextIntlClientProvider } from "next-intl";
import { usePathname, useRouter } from "next/navigation";
import { usePreferences } from "@/hooks/use-preferences";
import { MESSAGES } from "@/i18n/config";
import { createSiteTheme } from "@/theme/create-site-theme";
import SiteHeader from "./site-header";
import RouteTransition from "./route-transition";
import SmoothScroll from "./smooth-scroll";

interface ClientAppShellProps {
  children: React.ReactNode;
}

export default function ClientAppShell({ children }: ClientAppShellProps) {
  const pathname = usePathname();
  const router = useRouter();
  const { language, mode, setLanguage, toggleMode } = usePreferences();
  const theme = useMemo(() => createSiteTheme(mode), [mode]);

  useEffect(() => {
    router.prefetch("/games/genshin");
    router.prefetch("/games/star-rail");
  }, [router]);

  return (
    <NextIntlClientProvider locale={language} messages={MESSAGES[language]} timeZone="Asia/Shanghai">
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <SmoothScroll />
        <SiteHeader
          homeSections={pathname === "/"}
          language={language}
          mode={mode}
          onLanguageChange={setLanguage}
          onModeChange={toggleMode}
        />
        <RouteTransition>{children}</RouteTransition>
      </ThemeProvider>
    </NextIntlClientProvider>
  );
}
