"use client";

import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material/styles";
import { motion, useReducedMotion } from "motion/react";
import { useInitialLoadProgress } from "@/hooks/use-initial-load-progress";
import ProgressiveImage from "./progressive-image";

interface InitialLoadingScreenProps {
  onReady: () => void;
  preferencesReady: boolean;
}

const MINIMUM_VISIBLE_MS = 420;

export default function InitialLoadingScreen({
  onReady,
  preferencesReady,
}: InitialLoadingScreenProps) {
  const reduceMotion = useReducedMotion();
  const theme = useTheme();
  const progress = useInitialLoadProgress({
    enabled: preferencesReady,
    minimumVisibleMs: reduceMotion ? 0 : MINIMUM_VISIBLE_MS,
    onReady,
  });
  const percentage = Math.round(progress * 100);

  return (
    <motion.div
      aria-label="Loading Langning Chen"
      aria-live="polite"
      className="initial-loader"
      exit={
        reduceMotion
          ? { opacity: 0 }
          : { clipPath: "inset(0 0 100% 0)", opacity: 0.96 }
      }
      role="status"
      style={{
        background: theme.palette.background.default,
        color: theme.palette.text.primary,
      }}
      transition={{ duration: reduceMotion ? 0.12 : 0.66, ease: [0.76, 0, 0.24, 1] }}
    >
      <Box className="initial-loader__content">
        <Box className="initial-loader__avatar-frame">
          <ProgressiveImage
            alt=""
            className="initial-loader__avatar"
            height={72}
            priority
            src="/avatar.jpg"
            width={72}
          />
          <span
            className="initial-loader__pulse"
            style={{ borderColor: theme.palette.primary.main }}
          />
        </Box>
        <Typography
          className="mono"
          component="p"
          sx={{ fontSize: { xs: 22, sm: 26 }, fontWeight: 800 }}
        >
          Langning Chen
        </Typography>
        <Box
          aria-label={`${percentage}%`}
          aria-valuemax={100}
          aria-valuemin={0}
          aria-valuenow={percentage}
          className="initial-loader__progress"
          role="progressbar"
          sx={{ bgcolor: "action.selected" }}
        >
          <span
            style={{
              backgroundColor: theme.palette.primary.main,
              transform: `scaleX(${progress})`,
            }}
          />
        </Box>
        <Typography className="mono" color="text.secondary" sx={{ fontSize: 12 }}>
          {percentage}%
        </Typography>
      </Box>
    </motion.div>
  );
}
