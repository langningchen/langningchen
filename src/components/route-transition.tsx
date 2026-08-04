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
            ? { filter: "blur(0px)", opacity: 1, y: 0 }
            : { filter: "blur(5px)", opacity: 0, y: 20 }
        }
        exit={reduceMotion ? undefined : { filter: "blur(3px)", opacity: 0, y: -10 }}
        initial={reduceMotion ? false : { filter: "blur(2px)", opacity: 0.72, y: 12 }}
        key={pathname}
        transition={{ duration: ready ? 0.54 : 0.2, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}
