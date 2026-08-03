"use client";

import { useEffect, useState } from "react";
import ArrowUpwardRounded from "@mui/icons-material/ArrowUpwardRounded";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useLenis } from "lenis/react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";
import { useTranslations } from "next-intl";

export default function BackToTopButton() {
  const lenis = useLenis();
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();
  const t = useTranslations("nav");
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const updateVisibility = () => {
      setVisible(window.scrollY > Math.min(window.innerHeight * 0.7, 720));
    };

    updateVisibility();
    window.addEventListener("scroll", updateVisibility, { passive: true });
    window.addEventListener("resize", updateVisibility, { passive: true });
    return () => {
      window.removeEventListener("scroll", updateVisibility);
      window.removeEventListener("resize", updateVisibility);
    };
  }, [pathname]);

  const scrollToTop = () => {
    if (lenis && !reduceMotion) {
      lenis.scrollTo(0, { duration: 1.05 });
      return;
    }
    window.scrollTo({ behavior: reduceMotion ? "auto" : "smooth", top: 0 });
  };

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 8 }}
          initial={reduceMotion ? false : { opacity: 0, scale: 0.9, y: 12 }}
          style={{ bottom: 24, position: "fixed", right: 24, zIndex: 1150 }}
          transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
        >
          <Tooltip placement="left" title={t("backToTop")}>
            <IconButton
              aria-label={t("backToTop")}
              onClick={scrollToTop}
              sx={{
                backdropFilter: "blur(12px)",
                bgcolor: "background.paper",
                border: "1px solid",
                borderColor: "divider",
                boxShadow: 4,
                color: "primary.main",
                height: 48,
                width: 48,
                "&:hover": { bgcolor: "background.paper", color: "primary.main" },
              }}
            >
              <ArrowUpwardRounded />
            </IconButton>
          </Tooltip>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
