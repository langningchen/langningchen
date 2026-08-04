"use client";

import { useEffect, useState } from "react";
import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useTranslations } from "next-intl";
import Image from "./progressive-image";

export interface EducationImage {
  alt: string;
  src: string;
}

interface EducationCarouselProps {
  images: EducationImage[];
}

export default function EducationCarousel({ images }: EducationCarouselProps) {
  const t = useTranslations("journey");
  const [activeIndex, setActiveIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [previousIndex, setPreviousIndex] = useState<number | null>(null);

  useEffect(() => {
    if (paused || images.length < 2) return;
    const timer = window.setTimeout(() => {
      setPreviousIndex(activeIndex);
      setActiveIndex((activeIndex + 1) % images.length);
    }, 4800);
    return () => window.clearTimeout(timer);
  }, [activeIndex, images.length, paused]);

  useEffect(() => {
    if (previousIndex === null) return;
    const timer = window.setTimeout(() => setPreviousIndex(null), 560);
    return () => window.clearTimeout(timer);
  }, [activeIndex, previousIndex]);

  const move = (direction: number) => {
    setPreviousIndex(activeIndex);
    setActiveIndex((activeIndex + direction + images.length) % images.length);
  };

  return (
    <Box
      onBlur={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      sx={{ aspectRatio: "16 / 9", bgcolor: "#111512", overflow: "hidden", position: "relative" }}
    >
      {images.map((image, index) => {
        const isActive = index === activeIndex;
        const isPrevious = index === previousIndex;

        return (
          <Image
            alt={isActive ? image.alt : ""}
            aria-hidden={!isActive}
            className={`carousel-image${isActive ? " carousel-image--active" : ""}${isPrevious ? " carousel-image--previous" : ""}`}
            fill
            key={image.src}
            sizes="(max-width: 900px) 100vw, 38vw"
            src={image.src}
          />
        );
      })}
      <Stack
        direction="row"
        spacing={0.5}
        sx={{ alignItems: "center", bottom: 12, left: 12, position: "absolute", zIndex: 3 }}
      >
        <Tooltip title={t("previousImage")}>
          <IconButton
            aria-label={t("previousImage")}
            onClick={() => move(-1)}
            size="small"
            sx={{ bgcolor: "rgba(10,14,11,0.78)", color: "#f0f0f0", "&:hover": { bgcolor: "rgba(10,14,11,0.94)" } }}
          >
            <ArrowBackRounded fontSize="small" />
          </IconButton>
        </Tooltip>
        <Tooltip title={t("nextImage")}>
          <IconButton
            aria-label={t("nextImage")}
            onClick={() => move(1)}
            size="small"
            sx={{ bgcolor: "rgba(10,14,11,0.78)", color: "#f0f0f0", "&:hover": { bgcolor: "rgba(10,14,11,0.94)" } }}
          >
            <ArrowForwardRounded fontSize="small" />
          </IconButton>
        </Tooltip>
      </Stack>
      <Typography
        className="mono"
        sx={{ bgcolor: "rgba(10,14,11,0.78)", bottom: 14, color: "#f0f0f0", fontSize: 12, px: 1, py: 0.5, position: "absolute", right: 14, zIndex: 3 }}
      >
        {String(activeIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
      </Typography>
    </Box>
  );
}
