import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import { useTranslations } from "next-intl";
import EducationItem from "./education-item";
import ScrollReveal from "./scroll-reveal";
import SectionHeading from "./section-heading";

export default function JourneySection() {
  const t = useTranslations("journey");
  return (
    <Box
      className="reveal-section"
      component="section"
      id="journey"
      sx={{
        bgcolor: "background.paper",
        color: "text.primary",
        py: { xs: 9, md: 14 },
      }}
    >
      <ScrollReveal variant="depth">
        <Container maxWidth="xl">
          <SectionHeading description={t("description")} eyebrow={t("eyebrow")} title={t("title")} />
          <EducationItem
            description={t("highSchoolDescription")}
            images={[
              { alt: "Caoyang No. 2 High School campus", src: "/CYEZ-1.jpg" },
              { alt: "Caoyang No. 2 High School campus", src: "/CYEZ-2.jpg" },
              { alt: "Caoyang No. 2 High School campus", src: "/CYEZ-3.jpg" },
              { alt: "Caoyang No. 2 High School campus", src: "/CYEZ-4.jpg" },
              { alt: "Caoyang No. 2 High School campus", src: "/CYEZ-5.jpg" },
            ]}
            period={t("current")}
            school={t("highSchool")}
            website="https://web-hscyez.pte.sh.cn/"
            websiteLabel={t("website")}
          />
          <EducationItem
            description={t("middleSchoolDescription")}
            images={[
              { alt: "Jianping West Middle School campus and Shanghai skyline", src: "/JPXX-1.jpg" },
              { alt: "Jianping West Middle School campus", src: "/JPXX-2.jpg" },
              { alt: "Jianping West Middle School campus", src: "/JPXX-3.jpg" },
            ]}
            period={t("previous")}
            school={t("middleSchool")}
            website="https://www.hsjpx.pudong-edu.sh.cn/"
            websiteLabel={t("website")}
          />
        </Container>
      </ScrollReveal>
    </Box>
  );
}
