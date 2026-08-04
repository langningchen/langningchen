"use client";

import { useEffect, useState } from "react";

interface InitialLoadProgressOptions {
  enabled: boolean;
  minimumVisibleMs: number;
  onReady: () => void;
}

const FONT_WAIT_LIMIT_MS = 2_500;
const LOAD_RECOVERY_LIMIT_MS = 8_000;

function getCriticalImages(): HTMLImageElement[] {
  return Array.from(
    document.querySelectorAll<HTMLImageElement>(
      'img[fetchpriority="high"], img[loading="eager"]',
    ),
  ).filter((image, index, images) => {
    const source = image.currentSrc || image.src;
    return images.findIndex((candidate) => (candidate.currentSrc || candidate.src) === source) === index;
  });
}

export function useInitialLoadProgress({
  enabled,
  minimumVisibleMs,
  onReady,
}: InitialLoadProgressOptions): number {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!enabled) return;

    const startedAt = performance.now();
    const criticalImages = getCriticalImages();
    const totalTasks = criticalImages.length + 1;
    const completedTasks = new Set<number>();
    const cleanups: Array<() => void> = [];
    let active = true;
    let finishTimer = 0;
    let finished = false;

    const finish = () => {
      if (finished) return;
      finished = true;
      const remaining = Math.max(0, minimumVisibleMs - (performance.now() - startedAt));
      finishTimer = window.setTimeout(() => {
        if (active) onReady();
      }, remaining);
    };

    const markComplete = (task: number) => {
      if (!active || completedTasks.has(task)) return;
      completedTasks.add(task);
      const nextProgress = completedTasks.size / totalTasks;
      setProgress(nextProgress);
      if (completedTasks.size === totalTasks) finish();
    };

    criticalImages.forEach((image, index) => {
      const task = index + 1;
      if (image.complete) {
        markComplete(task);
        return;
      }

      const complete = () => markComplete(task);
      image.addEventListener("load", complete, { once: true });
      image.addEventListener("error", complete, { once: true });
      cleanups.push(() => {
        image.removeEventListener("load", complete);
        image.removeEventListener("error", complete);
      });
    });

    let fontTimer = window.setTimeout(() => markComplete(0), FONT_WAIT_LIMIT_MS);
    void (document.fonts?.ready ?? Promise.resolve()).then(() => {
      window.clearTimeout(fontTimer);
      fontTimer = 0;
      markComplete(0);
    });

    const recoveryTimer = window.setTimeout(() => {
      if (!active) return;
      setProgress(1);
      finish();
    }, LOAD_RECOVERY_LIMIT_MS);

    return () => {
      active = false;
      cleanups.forEach((cleanup) => cleanup());
      window.clearTimeout(finishTimer);
      window.clearTimeout(fontTimer);
      window.clearTimeout(recoveryTimer);
    };
  }, [enabled, minimumVisibleMs, onReady]);

  return progress;
}
