"use client";

import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Toolbar from "@mui/material/Toolbar";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import DarkModeRounded from "@mui/icons-material/DarkModeRounded";
import LightModeRounded from "@mui/icons-material/LightModeRounded";
import MenuRounded from "@mui/icons-material/MenuRounded";
import type { PaletteMode } from "@mui/material";
import Link from "next/link";
import { useTranslations } from "next-intl";
import type { Language } from "@/i18n/config";
import LanguageToggle from "./language-toggle";
import NavigationLinks from "./navigation-links";

interface SiteHeaderProps {
  homeSections?: boolean;
  language: Language;
  mode: PaletteMode;
  onLanguageChange: (language: Language) => void;
  onModeChange: () => void;
}

export default function SiteHeader(props: SiteHeaderProps) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const tNav = useTranslations("nav");
  const tTheme = useTranslations("theme");
  const { homeSections = true, language, mode, onLanguageChange, onModeChange } = props;

  return (
    <AppBar
      className="site-header"
      elevation={0}
      position="fixed"
      sx={{
        bgcolor: "rgba(10,11,13,0.78)",
        borderBottom: "1px solid rgba(255,255,255,0.13)",
        color: "#f5f6f0",
        backdropFilter: "blur(18px)",
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ minHeight: { xs: 64, md: 72 } }}>
          <Typography
            className="mono"
            component={Link}
            href="/"
            sx={{ color: "inherit", fontSize: { xs: 17, sm: 20 }, fontWeight: 800, textDecoration: "none" }}
          >
            Langning <Box component="span" sx={{ color: "#87dbac" }}>Chen</Box>
          </Typography>
          <Box sx={{ flexGrow: 1 }} />
          <Box sx={{ display: { xs: "none", lg: "block" } }}>
            <NavigationLinks homeSections={homeSections} />
          </Box>
          <Stack direction="row" spacing={1} sx={{ alignItems: "center", ml: { xs: 1, lg: 2 } }}>
            <Box sx={{ display: { xs: "none", sm: "block" } }}>
              <LanguageToggle language={language} onChange={onLanguageChange} />
            </Box>
            <Tooltip title={mode === "dark" ? tTheme("light") : tTheme("dark")}>
              <IconButton
                aria-label={mode === "dark" ? tTheme("light") : tTheme("dark")}
                color="inherit"
                onClick={onModeChange}
              >
                {mode === "dark" ? <LightModeRounded /> : <DarkModeRounded />}
              </IconButton>
            </Tooltip>
            <Tooltip title={tNav("menu")}>
              <IconButton
                aria-label={tNav("menu")}
                color="inherit"
                onClick={() => setDrawerOpen(true)}
                sx={{ display: { lg: "none" } }}
              >
                <MenuRounded />
              </IconButton>
            </Tooltip>
          </Stack>
        </Toolbar>
      </Container>
      <Drawer
        anchor="right"
        onClose={() => setDrawerOpen(false)}
        open={drawerOpen}
        slotProps={{ paper: { sx: { p: 3, pt: 5, width: "min(84vw, 340px)" } } }}
      >
        <Stack spacing={3}>
          <Typography className="mono" variant="h5">
            Langning Chen
          </Typography>
          <NavigationLinks direction="column" homeSections={homeSections} onNavigate={() => setDrawerOpen(false)} />
          <LanguageToggle language={language} onChange={onLanguageChange} />
        </Stack>
      </Drawer>
    </AppBar>
  );
}
