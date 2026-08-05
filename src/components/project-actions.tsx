import { MarkGithubIcon } from "@primer/octicons-react";
import HistoryRounded from "@mui/icons-material/HistoryRounded";
import OpenInNewRounded from "@mui/icons-material/OpenInNewRounded";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import { useTranslations } from "next-intl";

interface ProjectActionsProps {
  homepage: string | null;
  legacySource?: string;
  source: string;
}

export default function ProjectActions({
  homepage,
  legacySource,
  source,
}: ProjectActionsProps) {
  const t = useTranslations("projects");
  return (
    <Stack
      direction="row"
      onClick={(event) => event.stopPropagation()}
      spacing={0.5}
      sx={{ flexWrap: "wrap", gap: 0.5 }}
    >
      <Button
        color="primary"
        href={source}
        rel="noreferrer"
        size="small"
        startIcon={<MarkGithubIcon size={16} />}
        target="_blank"
        variant="text"
      >
        {t("source")}
      </Button>
      {homepage && (
        <Button
          color="primary"
          endIcon={<OpenInNewRounded />}
          href={homepage}
          rel="noreferrer"
          size="small"
          target="_blank"
          variant="text"
        >
          {t("product")}
        </Button>
      )}
      {legacySource && (
        <Button
          color="primary"
          href={legacySource}
          rel="noreferrer"
          size="small"
          startIcon={<HistoryRounded />}
          target="_blank"
          variant="text"
        >
          {t("legacy")}
        </Button>
      )}
    </Stack>
  );
}
