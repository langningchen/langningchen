"use client";

import { useEffect, useRef, useState } from "react";
import Box from "@mui/material/Box";

interface CountUpValueProps {
  decimals?: number;
  suffix?: string;
  value: number;
}

function formatValue(value: number, decimals: number): string {
  return value.toLocaleString("en-US", {
    maximumFractionDigits: decimals,
    minimumFractionDigits: decimals,
  });
}

export default function CountUpValue({ decimals, suffix = "", value }: CountUpValueProps) {
  const elementRef = useRef<HTMLSpanElement>(null);
  const [displayValue, setDisplayValue] = useState(0);

  useEffect(() => {
    const element = elementRef.current;
    if (!element) return;

    let animationFrame = 0;
    const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        if (reduceMotion) {
          setDisplayValue(value);
          return;
        }

        const start = performance.now();
        const duration = 900;
        const animate = (time: number) => {
          const progress = Math.min((time - start) / duration, 1);
          const eased = 1 - (1 - progress) ** 3;
          setDisplayValue(value * eased);
          if (progress < 1) animationFrame = requestAnimationFrame(animate);
        };
        animationFrame = requestAnimationFrame(animate);
      },
      { threshold: 0.35 },
    );

    observer.observe(element);
    return () => {
      observer.disconnect();
      cancelAnimationFrame(animationFrame);
    };
  }, [value]);

  const decimalPlaces = decimals ?? (Number.isInteger(value) ? 0 : 2);
  return (
    <Box component="span" ref={elementRef}>
      {formatValue(displayValue, decimalPlaces)}{suffix}
    </Box>
  );
}
