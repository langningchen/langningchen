import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useTranslations } from "next-intl";
import GamePortalPanel from "./game-portal-panel";
import ScrollReveal from "./scroll-reveal";
import SectionHeading from "./section-heading";

export default function GamePortalSection() {
  const t = useTranslations("games");

  return (
    <Box
      className="reveal-section"
      component="section"
      id="games"
      sx={{ bgcolor: "background.paper", borderTop: 1, borderColor: "divider", py: { xs: 9, md: 12 } }}
    >
      <ScrollReveal variant="settle">
        <Container maxWidth="xl">
          <SectionHeading
            description={t("portalDescription")}
            eyebrow={t("eyebrow")}
            title={t("portalTitle")}
          />
          <Box sx={{ display: "grid", gap: 2, gridTemplateColumns: { xs: "1fr", md: "repeat(2, minmax(0, 1fr))" } }}>
            <GamePortalPanel game="genshin" />
            <GamePortalPanel game="starRail" />
          </Box>
        </Container>
      </ScrollReveal>
    </Box>
  );
}
