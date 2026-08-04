"use client";

import type { ReactNode } from "react";
import { motion, useReducedMotion } from "motion/react";
import { useTheme } from "@mui/material/styles";
import type { GameId } from "@/lib/game-types";

export type SubpageVariant = GameId | "community" | "projects";

interface SubpageEntranceProps {
  children: ReactNode;
  variant: SubpageVariant;
}

const ACCENTS: Record<SubpageVariant, string> = {
  community: "#87dbac",
  genshin: "#d6b96f",
  projects: "#87dbac",
  starRail: "#78dcff",
};

export default function SubpageEntrance({ children, variant }: SubpageEntranceProps) {
  const reduceMotion = useReducedMotion();
  const theme = useTheme();
  const accent = ACCENTS[variant];
  const originX = variant === "genshin" ? 0 : 1;

  return (
    <motion.div
      animate={{ clipPath: "inset(0 0 0 0)", opacity: 1 }}
      className={`subpage-entrance subpage-entrance--${variant}`}
      initial={reduceMotion ? false : { clipPath: "inset(0 0 5% 0)", opacity: 0.72 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
    >
      {!reduceMotion && (
        <motion.div
          aria-hidden="true"
          animate={{ scaleX: 0 }}
          className="subpage-entrance__veil"
          initial={{ scaleX: 1 }}
          style={{ backgroundColor: theme.palette.background.default, originX }}
          transition={{ delay: 0.08, duration: 0.72, ease: [0.76, 0, 0.24, 1] }}
        >
          <motion.span
            animate={{ x: variant === "genshin" ? "42vw" : "-42vw" }}
            className="subpage-entrance__frame"
            style={{ borderColor: accent, rotate: 45 }}
            transition={{ duration: 0.62, ease: [0.22, 1, 0.36, 1] }}
          />
          <span className="subpage-entrance__line" style={{ backgroundColor: accent }} />
        </motion.div>
      )}
      {children}
    </motion.div>
  );
}
