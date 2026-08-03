import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import type { Route } from "next";
import Link from "next/link";
import { useTranslations } from "next-intl";

interface NavigationLinksProps {
  direction?: "row" | "column";
  homeSections?: boolean;
  onNavigate?: () => void;
}

export default function NavigationLinks({
  direction = "row",
  homeSections = true,
  onNavigate,
}: NavigationLinksProps) {
  const t = useTranslations("nav");
  const section = (hash: string) => homeSections ? hash : `/${hash}`;
  const links = [
    [section("#work"), t("work")],
    [section("#open-source"), t("openSource")],
    [section("#toolkit"), t("toolkit")],
    [section("#oi"), t("oi")],
    ["/games/genshin/", t("genshin")],
    ["/games/star-rail/", t("starRail")],
    [section("#journey"), t("journey")],
    [section("#contact"), t("contact")],
  ];

  return (
    <Stack direction={direction} sx={{ alignItems: direction === "row" ? "center" : "stretch" }}>
      {links.map(([href, label]) => (
        <Button
          color="inherit"
          component={Link}
          href={href as Route}
          key={href}
          onClick={onNavigate}
          prefetch
          sx={{ justifyContent: direction === "row" ? "center" : "flex-start", px: 1.5 }}
        >
          {label}
        </Button>
      ))}
    </Stack>
  );
}
