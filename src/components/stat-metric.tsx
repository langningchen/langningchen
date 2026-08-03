import ArrowOutwardRounded from "@mui/icons-material/ArrowOutwardRounded";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import CountUpValue from "./count-up-value";

interface StatMetricProps {
  href: string;
  label: string;
  value: number;
}

export default function StatMetric({ href, label, value }: StatMetricProps) {
  return (
    <Box
      component="a"
      href={href}
      rel="noreferrer"
      target="_blank"
      sx={{
        borderLeft: 3,
        borderColor: "primary.main",
        color: "inherit",
        pl: 2.5,
        pr: 3,
        py: 0.5,
        position: "relative",
        textDecoration: "none",
        transition: "border-color 160ms ease, transform 160ms ease",
        "&:hover": {
          borderColor: "secondary.main",
          transform: "translateX(4px)",
        },
        "&:focus-visible": {
          outline: "2px solid",
          outlineColor: "primary.main",
          outlineOffset: 4,
        },
      }}
    >
      <ArrowOutwardRounded
        aria-hidden="true"
        sx={{ color: "text.secondary", fontSize: 18, position: "absolute", right: 0, top: 2 }}
      />
      <Typography className="mono" sx={{ fontSize: { xs: 32, md: 42 }, fontWeight: 750, lineHeight: 1.1 }}>
        <CountUpValue value={value} />
      </Typography>
      <Typography color="text.secondary" sx={{ mt: 0.75 }}>
        {label}
      </Typography>
    </Box>
  );
}
