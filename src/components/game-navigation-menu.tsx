"use client";

import { useState } from "react";
import type { MouseEvent } from "react";
import ExpandMoreRounded from "@mui/icons-material/ExpandMoreRounded";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import ListItemIcon from "@mui/material/ListItemIcon";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Link from "next/link";
import { useTranslations } from "next-intl";
import Image from "./progressive-image";

interface GameNavigationMenuProps {
  direction: "row" | "column";
  onNavigate?: () => void;
}

export default function GameNavigationMenu({
  direction,
  onNavigate,
}: GameNavigationMenuProps) {
  const t = useTranslations("nav");
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null);
  const open = Boolean(anchorElement);

  const closeMenu = () => setAnchorElement(null);
  const navigate = () => {
    closeMenu();
    onNavigate?.();
  };

  return (
    <>
      <Button
        aria-controls={open ? "game-navigation-menu" : undefined}
        aria-expanded={open ? "true" : undefined}
        aria-haspopup="menu"
        color="inherit"
        endIcon={<ExpandMoreRounded />}
        onClick={(event: MouseEvent<HTMLButtonElement>) => setAnchorElement(event.currentTarget)}
        sx={{ justifyContent: direction === "row" ? "center" : "flex-start", px: 1.5 }}
      >
        {t("games")}
      </Button>
      <Menu
        anchorEl={anchorElement}
        id="game-navigation-menu"
        onClose={closeMenu}
        open={open}
        slotProps={{ paper: { sx: { minWidth: 220, mt: 1 } } }}
      >
        <MenuItem component={Link} href="/games/genshin" onClick={navigate}>
          <ListItemIcon sx={{ minWidth: 42 }}>
            <Box
              sx={{ borderRadius: 1, height: 30, overflow: "hidden", position: "relative", width: 30 }}
            >
              <Image alt="" fill sizes="30px" src="/games/genshin-official.ico" style={{ objectFit: "contain" }} />
            </Box>
          </ListItemIcon>
          {t("genshin")}
        </MenuItem>
        <MenuItem component={Link} href="/games/star-rail" onClick={navigate}>
          <ListItemIcon sx={{ minWidth: 42 }}>
            <Box
              sx={{ borderRadius: 1, height: 30, overflow: "hidden", position: "relative", width: 30 }}
            >
              <Image alt="" fill sizes="30px" src="/games/starrail-official.png" style={{ objectFit: "contain" }} />
            </Box>
          </ListItemIcon>
          {t("starRail")}
        </MenuItem>
      </Menu>
    </>
  );
}
