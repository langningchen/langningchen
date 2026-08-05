"use client";

import { useEffect } from "react";
import type { ImagePreloadAsset } from "@/lib/image-preloader";
import { preloadImages } from "@/lib/image-preloader";

interface ImagePreloaderProps {
  assets: readonly ImagePreloadAsset[];
  batchDelayMs?: number;
  batchSize?: number;
  delayMs?: number;
  enabled?: boolean;
}

export default function ImagePreloader({
  assets,
  batchDelayMs,
  batchSize,
  delayMs,
  enabled = true,
}: ImagePreloaderProps) {
  useEffect(() => {
    if (!enabled) return;
    preloadImages(assets, { batchDelayMs, batchSize, delayMs });
  }, [assets, batchDelayMs, batchSize, delayMs, enabled]);

  return null;
}
