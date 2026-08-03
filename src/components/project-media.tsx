import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Image from "next/image";
import type { ProjectMedia as ProjectMediaData } from "@/lib/github";

interface ProjectMediaProps {
  accent: string;
  featured: boolean;
  label: string;
  media?: ProjectMediaData;
}

export default function ProjectMedia({
  accent,
  featured,
  label,
  media,
}: ProjectMediaProps) {
  if (!media || !featured) {
    return <Box sx={{ bgcolor: accent, height: 7 }} />;
  }

  return (
    <Box sx={{ aspectRatio: "16 / 9", bgcolor: "#101216", overflow: "hidden", position: "relative" }}>
      <Box sx={{ height: "100%", overflow: "hidden", position: "relative" }}>
        <Image
          alt={media.alt}
          className={`project-image project-image--${media.presentation}`}
          fill
          sizes="(max-width: 900px) 100vw, 50vw"
          src={media.image}
        />
      </Box>
      <Stack
        direction="row"
        spacing={1}
        sx={{
          alignItems: "center",
          bgcolor: "rgba(8,9,11,0.88)",
          border: "1px solid rgba(255,255,255,0.18)",
          bottom: 14,
          color: "#f0f0f0",
          left: 14,
          px: 1.25,
          py: 0.75,
          position: "absolute",
        }}
      >
        <Box sx={{ height: 24, position: "relative", width: 24 }}>
          <Image alt="" fill sizes="24px" src={media.icon} style={{ objectFit: "contain" }} />
        </Box>
        <Typography className="mono" sx={{ fontSize: 11 }}>
          {label}
        </Typography>
      </Stack>
    </Box>
  );
}
