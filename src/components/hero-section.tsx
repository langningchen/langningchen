"use client";

import { useRef } from "react";
import ArrowDownwardRounded from "@mui/icons-material/ArrowDownwardRounded";
import GitHub from "@mui/icons-material/GitHub";
import LocationOnRounded from "@mui/icons-material/LocationOnRounded";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import Image from "./progressive-image";
import ScrollCue from "./scroll-cue";
import TerminalEffect from "./terminal-effect";

export default function HeroSection() {
  const t = useTranslations("hero");
  const theme = useTheme();
  const heroRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const lightMode = theme.palette.mode === "light";
  const { scrollYProgress } = useScroll({
    offset: ["start start", "end start"],
    target: heroRef,
  });
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65, 1], [1, 0.78, 0]);
  const contentY = useTransform(scrollYProgress, [0, 1], [0, -84]);
  const imageScale = useTransform(scrollYProgress, [0, 1], [1.02, 1.14]);
  const imageY = useTransform(scrollYProgress, [0, 1], [0, 92]);
  const overlayOpacity = useTransform(
    scrollYProgress,
    [0, 1],
    lightMode ? [0.78, 0.9] : [0.66, 0.86],
  );
  const overlayColor = lightMode ? "#f3f6f4" : "#07090a";

  return (
    <Box
      component="section"
      ref={heroRef}
      sx={{
        alignItems: "center",
        bgcolor: lightMode ? "#e9f0ec" : "#0a0b0d",
        color: lightMode ? "#17201b" : "#f5f6f0",
        display: "flex",
        minHeight: "100svh",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <motion.div
        className="hero-parallax-image"
        style={reduceMotion ? undefined : { scale: imageScale, y: imageY }}
      >
        <Image
          alt="Caoyang No. 2 High School campus in Shanghai"
          className="hero-image"
          fill
          priority
          sizes="100vw"
          src="/CYEZ-1.jpg"
        />
      </motion.div>
      <motion.div
        className="hero-parallax-overlay"
        style={reduceMotion
          ? { backgroundColor: overlayColor, opacity: lightMode ? 0.78 : 0.66 }
          : { backgroundColor: overlayColor, opacity: overlayOpacity }}
      />
      <motion.div
        className="hero-parallax-content"
        style={reduceMotion ? undefined : { opacity: contentOpacity, y: contentY }}
      >
        <Container maxWidth="xl" sx={{ py: { xs: 8, md: 9 }, position: "relative", zIndex: 1 }}>
        <Box sx={{ maxWidth: 820 }}>
          <Stack direction="row" spacing={1.5} sx={{ alignItems: "center", mb: 2.5 }}>
            <Box sx={{ bgcolor: lightMode ? "#287356" : "#87dbac", borderRadius: "50%", height: 9, width: 9 }} />
            <Typography className="mono" sx={{ fontWeight: 700 }} variant="overline">
              {t("eyebrow")}
            </Typography>
          </Stack>
          <Typography
            className="mono"
            component="h1"
            sx={{ fontSize: { xs: 48, sm: 64, md: 82 }, lineHeight: 0.96, mb: 2.5 }}
            variant="h1"
          >
            Langning Chen
          </Typography>
          <Typography
            component="p"
            sx={{ fontSize: { xs: 24, md: 34 }, fontWeight: 680, lineHeight: 1.18, mb: 2 }}
          >
            {t("role")}
          </Typography>
          <Typography
            sx={{
              color: lightMode ? "rgba(23,32,27,0.78)" : "rgba(245,246,240,0.76)",
              fontSize: { xs: 16, md: 19 },
              lineHeight: 1.7,
              maxWidth: 690,
            }}
          >
            {t("description")}
          </Typography>
          <Stack direction={{ xs: "column", sm: "row" }} spacing={1.5} sx={{ mt: 4 }}>
            <Button
              color="primary"
              endIcon={<ArrowDownwardRounded />}
              href="#work"
              size="large"
              sx={{ bgcolor: "#87dbac", color: "#102018", "&:hover": { bgcolor: "#9de5bd" } }}
              variant="contained"
            >
              {t("explore")}
            </Button>
            <Button
              color="inherit"
              href="https://github.com/langningchen"
              rel="noreferrer"
              size="large"
              startIcon={<GitHub />}
              target="_blank"
              variant="outlined"
            >
              {t("github")}
            </Button>
          </Stack>
          <Stack direction="row" spacing={1.5} sx={{ flexWrap: "wrap", gap: 1.5, mt: 4 }}>
            <Chip
              icon={<LocationOnRounded />}
              label={t("location")}
              sx={{
                bgcolor: lightMode ? "rgba(255,255,255,0.66)" : "rgba(255,255,255,0.1)",
                border: lightMode ? "1px solid rgba(40,115,86,0.2)" : "1px solid transparent",
                color: "inherit",
                "& .MuiChip-icon": { color: lightMode ? "#287356" : "#87dbac" },
              }}
            />
            <Chip
              color="primary"
              label={t("availability")}
              sx={{
                borderColor: lightMode ? "rgba(40,115,86,0.48)" : "rgba(135,219,172,0.6)",
                color: lightMode ? "#205f48" : "#b8f0d0",
              }}
              variant="outlined"
            />
          </Stack>
        </Box>
          <TerminalEffect lightMode={lightMode} />
        </Container>
      </motion.div>
      <motion.div
        className="hero-scroll-cue"
        style={reduceMotion ? undefined : { opacity: contentOpacity }}
      >
        <ScrollCue lightMode={lightMode} />
      </motion.div>
    </Box>
  );
}
