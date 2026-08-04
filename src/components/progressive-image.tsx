import Image from "next/image";
import type { ImageProps } from "next/image";

const DEFAULT_BLUR_DATA_URL =
  "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAgAAAAICAIAAABLbSncAAAACXBIWXMAAAPoAAAD6AG1e1JrAAAAEUlEQVR4nGO49/QhVsQwtCQAB+apAWWyZ+kAAAAASUVORK5CYII=";

export default function ProgressiveImage({
  alt,
  blurDataURL = DEFAULT_BLUR_DATA_URL,
  placeholder = "blur",
  ...props
}: ImageProps) {
  return (
    <Image
      {...props}
      alt={alt}
      blurDataURL={blurDataURL}
      placeholder={placeholder}
    />
  );
}
