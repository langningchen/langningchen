import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { useTranslations } from "next-intl";
import { OI_ACHIEVEMENTS } from "@/data/oi-achievements";
import OiAchievementRow from "./oi-achievement-row";
import ScrollReveal from "./scroll-reveal";
import SectionHeading from "./section-heading";

export default function OiSection() {
  const t = useTranslations("oi");
  const metrics = [
    { label: t("oierdbRank"), value: "4,029" },
    { label: t("oierdbScore"), value: "5,824.95" },
    { label: t("ccfLevel"), value: t("ccfValue") },
  ];

  return (
    <Box
      className="reveal-section"
      component="section"
      id="oi"
      sx={{ bgcolor: "background.paper", borderBlock: 1, borderColor: "divider", py: { xs: 7, md: 10 } }}
    >
      <ScrollReveal variant="focus">
        <Container maxWidth="xl">
          <SectionHeading compact description={t("description")} eyebrow={t("eyebrow")} title={t("title")} />
          <Box sx={{ display: "grid", gap: 1.5, gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" }, mb: { xs: 4, md: 5 } }}>
            {metrics.map((metric) => (
              <Box key={metric.label} sx={{ borderTop: 2, borderColor: "primary.main", pt: 1.5 }}>
                <Typography className="mono" sx={{ fontSize: { xs: 24, md: 28 }, fontWeight: 750 }}>
                  {metric.value}
                </Typography>
                <Typography color="text.secondary" sx={{ mt: 0.5 }}>{metric.label}</Typography>
              </Box>
            ))}
          </Box>
          <Typography component="h3" sx={{ fontSize: 20, mb: 1.5 }} variant="h5">
            {t("achievementTitle")}
          </Typography>
          <TableContainer component={Box} sx={{ borderBlock: 1, borderColor: "divider" }}>
            <Table aria-label={t("achievementTitle")} size="small" sx={{ minWidth: 640 }}>
              <TableHead>
                <TableRow>
                  <TableCell sx={{ width: "34%" }}>{t("event")}</TableCell>
                  <TableCell sx={{ width: "18%" }}>{t("award")}</TableCell>
                  <TableCell sx={{ width: "20%" }}>{t("score")}</TableCell>
                  <TableCell sx={{ width: "28%" }}>{t("nationalRank")}</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {OI_ACHIEVEMENTS.map((achievement) => (
                  <OiAchievementRow achievement={achievement} key={achievement.event} />
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Container>
      </ScrollReveal>
    </Box>
  );
}
