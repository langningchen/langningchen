"use client";

import { useEffect } from "react";
import { useLenis } from "lenis/react";

export function useLenisScrollLock(locked: boolean) {
  const lenis = useLenis();

  useEffect(() => {
    if (!locked || !lenis) return;

    lenis.stop();
    return () => lenis.start();
  }, [lenis, locked]);
}
