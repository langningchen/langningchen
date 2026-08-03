import ArrowOutwardRounded from "@mui/icons-material/ArrowOutwardRounded";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import type { EducationImage } from "./education-carousel";
import EducationCarousel from "./education-carousel";

interface EducationItemProps {
  description: string;
  images: EducationImage[];
  period: string;
  school: string;
  website: string;
  websiteLabel: string;
}

export default function EducationItem(props: EducationItemProps) {
  const { description, images, period, school, website, websiteLabel } = props;

  return (
    <Box
      component="article"
      sx={{
        borderTop: 1,
        borderColor: "divider",
        display: "grid",
        gap: { xs: 3, md: 5 },
        gridTemplateColumns: { xs: "1fr", md: "minmax(260px, 0.8fr) minmax(0, 1.2fr)" },
        py: { xs: 4, md: 5 },
      }}
    >
      <Box sx={{ borderRadius: 2, overflow: "hidden" }}>
        <EducationCarousel images={images} />
      </Box>
      <Box sx={{ alignSelf: "center" }}>
        <Typography className="mono" color="primary.main" sx={{ mb: 1.5 }} variant="overline">
          {period}
        </Typography>
        <Typography component="h3" sx={{ fontSize: { xs: 27, md: 34 }, mb: 2 }} variant="h3">
          {school}
        </Typography>
        <Typography color="text.secondary" sx={{ lineHeight: 1.75, maxWidth: 720, mb: 2.5 }}>
          {description}
        </Typography>
        <Button
          endIcon={<ArrowOutwardRounded />}
          href={website}
          rel="noreferrer"
          target="_blank"
          variant="text"
        >
          {websiteLabel}
        </Button>
      </Box>
    </Box>
  );
}
