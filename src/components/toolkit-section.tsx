import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import { useTranslations } from "next-intl";
import { SKILL_GROUPS } from "@/data/skills";
import ScrollReveal from "./scroll-reveal";
import SectionHeading from "./section-heading";
import SkillToken from "./skill-token";

export default function ToolkitSection() {
  const t = useTranslations("toolkit");
  return (
    <Box className="reveal-section" component="section" id="toolkit" sx={{ py: { xs: 9, md: 14 } }}>
      <ScrollReveal variant="slide-right">
        <Container maxWidth="xl">
        <SectionHeading description={t("description")} eyebrow={t("eyebrow")} title={t("title")} />
        <Box sx={{ display: "grid", gap: { xs: 5, md: 3 }, gridTemplateColumns: { xs: "1fr", md: "repeat(3, 1fr)" } }}>
          {SKILL_GROUPS.map((group) => (
            <Box key={group.label}>
              <Typography className="mono" sx={{ fontWeight: 700, mb: 2 }}>
                {t(group.label)}
              </Typography>
              <Box sx={{ display: "grid", gap: 1 }}>
                {group.items.map((skill) => (
                  <SkillToken key={skill.label} skill={skill} />
                ))}
              </Box>
            </Box>
          ))}
        </Box>
        </Container>
      </ScrollReveal>
    </Box>
  );
}
