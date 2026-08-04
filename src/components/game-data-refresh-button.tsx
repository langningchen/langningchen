"use client";

import RefreshRounded from "@mui/icons-material/RefreshRounded";
import CircularProgress from "@mui/material/CircularProgress";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import { useRouter } from "next/navigation";
import { useTransition } from "react";
import { useTranslations } from "next-intl";

export default function GameDataRefreshButton() {
  const router = useRouter();
  const t = useTranslations("games");
  const [isPending, startTransition] = useTransition();

  const refresh = () => {
    startTransition(() => router.refresh());
  };

  return (
    <Tooltip title={t(isPending ? "refreshingData" : "refreshData")}>
      <span>
        <IconButton
          aria-label={t("refreshData")}
          color="inherit"
          disabled={isPending}
          onClick={refresh}
          size="small"
          sx={{ border: "1px solid currentColor", opacity: 0.72 }}
        >
          {isPending
            ? <CircularProgress color="inherit" size={18} />
            : <RefreshRounded fontSize="small" />}
        </IconButton>
      </span>
    </Tooltip>
  );
}
