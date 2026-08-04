import ArrowOutwardRounded from "@mui/icons-material/ArrowOutwardRounded";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Container from "@mui/material/Container";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslations } from "next-intl";
import SocialLinks from "./social-links";

export default function SiteFooter() {
  const t = useTranslations("footer");
  return (
    <Box
      component="footer"
      id="contact"
      sx={{
        alignItems: "center",
        bgcolor: "background.default",
        color: "text.primary",
        display: "flex",
        minHeight: { md: "calc(100svh - 72px)" },
        py: { xs: 8, md: 11 },
      }}
    >
      <Container maxWidth="xl">
        <Stack direction={{ xs: "column", md: "row" }} spacing={5} sx={{ alignItems: { xs: "flex-start", md: "flex-end" }, justifyContent: "space-between" }}>
          <Box sx={{ maxWidth: 760 }}>
            <Typography className="mono" color="primary.main" variant="overline">
              i@langningchen.com
            </Typography>
            <Typography
              component="h2"
              sx={{ fontSize: { xs: 38, md: 58 }, lineHeight: 1.05, my: 2 }}
              variant="h2"
            >
              {t("title")}
            </Typography>
            <Typography color="text.secondary" sx={{ fontSize: 17, lineHeight: 1.7, maxWidth: 650 }}>
              {t("description")}
            </Typography>
          </Box>
          <Button
            color="primary"
            endIcon={<ArrowOutwardRounded />}
            href="mailto:i@langningchen.com"
            size="large"
            sx={{ bgcolor: "#87dbac", color: "#102018", "&:hover": { bgcolor: "#9de5bd" } }}
            variant="contained"
          >
            {t("email")}
          </Button>
        </Stack>
        <Box sx={{ borderTop: 1, borderColor: "divider", mt: 8, pt: 3 }}>
          <Stack direction="row" spacing={2} sx={{ alignItems: "center", justifyContent: "space-between" }}>
            <Typography className="mono" color="text.secondary" sx={{ fontSize: 13 }}>
              © {new Date().getFullYear()} Langning Chen · {t("note")}
            </Typography>
            <SocialLinks />
          </Stack>
        </Box>
      </Container>
    </Box>
  );
}
