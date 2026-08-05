"use client";

import type { ReactNode } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { usePathname } from "next/navigation";

interface RouteTransitionProps {
  children: ReactNode;
  ready?: boolean;
}

export default function RouteTransition({
  children,
  ready = true,
}: RouteTransitionProps) {
  const pathname = usePathname();
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence initial={false} mode="wait">
      <motion.div
        animate={
          ready
            ? { filter: "blur(0px)", opacity: 1, scale: 1 }
            : { filter: "blur(5px)", opacity: 0, scale: 0.985 }
        }
        exit={reduceMotion ? undefined : { opacity: 0 }}
        initial={reduceMotion ? false : { filter: "blur(6px)", opacity: 0.72, scale: 0.985 }}
        key={pathname}
        suppressHydrationWarning
        style={{ minHeight: "100vh", transformOrigin: "50% 0%", width: "100%" }}
        transition={{ delay: ready ? 0.04 : 0, duration: ready ? 0.62 : 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
