import KeyboardDoubleArrowDownRounded from "@mui/icons-material/KeyboardDoubleArrowDownRounded";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslations } from "next-intl";

export default function ScrollCue() {
  const t = useTranslations("hero");

  return (
    <Stack
      aria-label={t("scrollCue")}
      className="scroll-cue"
      component="a"
      href="#work"
      spacing={0.25}
      sx={{ alignItems: "center", color: "inherit", textDecoration: "none" }}
    >
      <Typography className="mono" sx={{ fontSize: 11, fontWeight: 700 }}>
        {t("scrollCue")}
      </Typography>
      <KeyboardDoubleArrowDownRounded />
    </Stack>
  );
}
