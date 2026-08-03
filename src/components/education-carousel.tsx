"use client";

import { useEffect, useState } from "react";
import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import ArrowForwardRounded from "@mui/icons-material/ArrowForwardRounded";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import { useTranslations } from "next-intl";

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

  useEffect(() => {
    if (paused || images.length < 2) return;
    const timer = window.setInterval(() => {
      setActiveIndex((current) => (current + 1) % images.length);
    }, 4800);
    return () => window.clearInterval(timer);
  }, [images.length, paused]);

  const move = (direction: number) => {
    setActiveIndex((current) => (current + direction + images.length) % images.length);
  };

  return (
    <Box
      onBlur={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      sx={{ aspectRatio: "16 / 9", bgcolor: "#111512", overflow: "hidden", position: "relative" }}
    >
      <Image
        alt={images[activeIndex].alt}
        className="carousel-image"
        fill
        key={images[activeIndex].src}
        sizes="(max-width: 900px) 100vw, 38vw"
        src={images[activeIndex].src}
      />
      <Stack
        direction="row"
        spacing={0.5}
        sx={{ alignItems: "center", bottom: 12, left: 12, position: "absolute" }}
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
        sx={{ bgcolor: "rgba(10,14,11,0.78)", bottom: 14, color: "#f0f0f0", fontSize: 12, px: 1, py: 0.5, position: "absolute", right: 14 }}
      >
        {String(activeIndex + 1).padStart(2, "0")} / {String(images.length).padStart(2, "0")}
      </Typography>
    </Box>
  );
}
