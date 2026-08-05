import { getImageProps } from "next/image";

export interface ImagePreloadAsset {
  sizes?: string;
  src: string;
}

interface ImagePreloadOptions {
  batchDelayMs?: number;
  batchSize?: number;
  delayMs?: number;
  immediate?: boolean;
}

interface NetworkInformation {
  effectiveType?: string;
  saveData?: boolean;
}

const requestedImages = new Set<string>();
const activeImages = new Set<HTMLImageElement>();

function allowsSpeculativeLoading(): boolean {
  const connection = (navigator as Navigator & { connection?: NetworkInformation }).connection;
  if (connection?.saveData) return false;
  return connection?.effectiveType !== "slow-2g" && connection?.effectiveType !== "2g";
}

function loadImage(asset: ImagePreloadAsset) {
  const image = new window.Image();
  image.alt = "";
  image.decoding = "async";
  image.fetchPriority = "low";
  image.loading = "eager";

  try {
    const { props } = getImageProps({
      alt: "",
      height: 1200,
      sizes: asset.sizes ?? "100vw",
      src: asset.src,
      unoptimized: true,
      width: 1200,
    });

    if (typeof props.sizes === "string") image.sizes = props.sizes;
    if (typeof props.srcSet === "string") image.srcset = props.srcSet;
    image.src = typeof props.src === "string" ? props.src : asset.src;
  } catch {
    image.src = asset.src;
  }

  const release = () => activeImages.delete(image);
  image.addEventListener("load", release, { once: true });
  image.addEventListener("error", release, { once: true });
  activeImages.add(image);
}

export function preloadImages(
  assets: readonly ImagePreloadAsset[],
  options: ImagePreloadOptions = {},
) {
  if (typeof window === "undefined" || assets.length === 0 || !allowsSpeculativeLoading()) return;

  const uniqueKeys = new Set<string>();
  const queue = assets.filter((asset) => {
    const key = `${asset.src}|${asset.sizes ?? "100vw"}`;
    if (uniqueKeys.has(key)) return false;
    uniqueKeys.add(key);
    return true;
  });
  if (queue.length === 0) return;

  const batchSize = options.batchSize ?? 2;
  const batchDelayMs = options.batchDelayMs ?? 90;
  let cursor = 0;
  const loadBatch = () => {
    queue.slice(cursor, cursor + batchSize).forEach((asset) => {
      const key = `${asset.src}|${asset.sizes ?? "100vw"}`;
      if (requestedImages.has(key)) return;
      requestedImages.add(key);
      loadImage(asset);
    });
    cursor += batchSize;
    if (cursor < queue.length) window.setTimeout(loadBatch, batchDelayMs);
  };
  const begin = () => {
    if (options.immediate || !("requestIdleCallback" in window)) {
      loadBatch();
      return;
    }

    window.requestIdleCallback(loadBatch, { timeout: 1800 });
  };

  if (options.immediate) begin();
  else window.setTimeout(begin, options.delayMs ?? 500);
}
