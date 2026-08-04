import KeyboardDoubleArrowDownRounded from "@mui/icons-material/KeyboardDoubleArrowDownRounded";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslations } from "next-intl";

interface ScrollCueProps {
  lightMode: boolean;
}

export default function ScrollCue({ lightMode }: ScrollCueProps) {
  const t = useTranslations("hero");

  return (
    <Stack
      aria-label={t("scrollCue")}
      className="scroll-cue"
      component="a"
      href="#work"
      spacing={0.25}
      sx={{
        alignItems: "center",
        color: lightMode ? "rgba(23,32,27,0.76)" : "rgba(245,246,240,0.78)",
        textDecoration: "none",
        "&:hover": { color: lightMode ? "#205f48" : "#87dbac" },
      }}
    >
      <Typography className="mono" sx={{ fontSize: 11, fontWeight: 700 }}>
        {t("scrollCue")}
      </Typography>
      <KeyboardDoubleArrowDownRounded />
    </Stack>
  );
}
