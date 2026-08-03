"use client";

import { useRef } from "react";
import type { ReactNode } from "react";
import {
  motion,
  useReducedMotion,
  useScroll,
  useSpring,
  useTransform,
} from "motion/react";

interface ScrollRevealProps {
  children: ReactNode;
  variant?: RevealVariant;
}

type RevealVariant =
  | "depth"
  | "focus"
  | "rise"
  | "scale"
  | "settle"
  | "slide-left"
  | "slide-right"
  | "wipe";

export default function ScrollReveal({ children, variant = "rise" }: ScrollRevealProps) {
  const reduceMotion = useReducedMotion();
  const targetRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    offset: ["start 94%", "start 28%"],
    target: targetRef,
  });
  const progress = useSpring(scrollYProgress, {
    damping: 24,
    mass: 0.35,
    stiffness: 125,
  });
  const opacity = useTransform(progress, [0, 0.22, 1], [0, 0.4, 1]);
  const riseY = useTransform(progress, [0, 1], [88, 0]);
  const settleY = useTransform(progress, [0, 1], [-54, 0]);
  const depthY = useTransform(progress, [0, 1], [36, 0]);
  const leftX = useTransform(progress, [0, 1], [-76, 0]);
  const rightX = useTransform(progress, [0, 1], [76, 0]);
  const wipeX = useTransform(progress, [0, 1], [42, 0]);
  const scale = useTransform(progress, [0, 1], [0.93, 1]);
  const depthScale = useTransform(progress, [0, 1], [1.035, 1]);
  const focusScale = useTransform(progress, [0, 1], [0.985, 1]);
  const blur = useTransform(progress, [0, 0.75, 1], ["blur(9px)", "blur(1px)", "blur(0px)"]);
  const clipPath = useTransform(
    progress,
    [0, 1],
    ["inset(0 0 0 18%)", "inset(0 0 0 0%)"],
  );
  const revealStyle = {
    depth: { opacity, scale: depthScale, y: depthY },
    focus: { filter: blur, opacity, scale: focusScale },
    rise: { opacity, y: riseY },
    scale: { opacity, scale },
    settle: { opacity, y: settleY },
    "slide-left": { opacity, x: leftX },
    "slide-right": { opacity, x: rightX },
    wipe: { clipPath, opacity, x: wipeX },
  }[variant];

  return (
    <motion.div
      ref={targetRef}
      style={reduceMotion ? undefined : { ...revealStyle, willChange: "transform, opacity" }}
    >
      {children}
    </motion.div>
  );
}
