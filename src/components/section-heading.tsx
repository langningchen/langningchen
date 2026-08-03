import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

interface SectionHeadingProps {
  compact?: boolean;
  description: string;
  eyebrow: string;
  title: string;
}

export default function SectionHeading({
  compact = false,
  description,
  eyebrow,
  title,
}: SectionHeadingProps) {
  return (
    <Box sx={{ maxWidth: 1040, mb: compact ? { xs: 4, md: 5 } : { xs: 5, md: 7 } }}>
      <Typography
        className="mono"
        color="primary.main"
        component="p"
        sx={{ fontWeight: 700, mb: 1.5 }}
        variant="overline"
      >
        {eyebrow}
      </Typography>
      <Typography
        component="h2"
        sx={{
          fontSize: compact ? { xs: 32, md: 42 } : { xs: 36, md: 54 },
          lineHeight: 1.08,
          mb: compact ? 2 : 2.5,
        }}
        variant="h2"
      >
        {title}
      </Typography>
      <Typography color="text.secondary" sx={{ fontSize: 18, lineHeight: 1.75, maxWidth: 760 }}>
        {description}
      </Typography>
    </Box>
  );
}
