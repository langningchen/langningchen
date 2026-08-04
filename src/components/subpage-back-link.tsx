import ArrowBackRounded from "@mui/icons-material/ArrowBackRounded";
import Button from "@mui/material/Button";
import Link from "next/link";

interface SubpageBackLinkProps {
  label: string;
}

export default function SubpageBackLink({ label }: SubpageBackLinkProps) {
  return (
    <Button
      color="inherit"
      component={Link}
      href="/"
      prefetch
      startIcon={<ArrowBackRounded />}
      sx={{ alignSelf: "flex-start", mb: 3 }}
    >
      {label}
    </Button>
  );
}
