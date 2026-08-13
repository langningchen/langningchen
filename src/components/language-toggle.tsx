"use client";

import CheckRounded from "@mui/icons-material/CheckRounded";
import TranslateRounded from "@mui/icons-material/TranslateRounded";
import IconButton from "@mui/material/IconButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import Tooltip from "@mui/material/Tooltip";
import { useState } from "react";
import type { MouseEvent } from "react";
import type { Language } from "@/i18n/config";

interface LanguageToggleProps {
  language: Language;
  onChange: (language: Language) => void;
}

const LANGUAGES: Array<{ label: string; value: Language }> = [
  { label: "English", value: "en" },
  { label: "简体中文", value: "zh" },
];

export default function LanguageToggle({ language, onChange }: LanguageToggleProps) {
  const [anchorElement, setAnchorElement] = useState<HTMLElement | null>(null);
  const currentLanguage = LANGUAGES.find((option) => option.value === language)?.label;
  const closeMenu = () => setAnchorElement(null);
  const selectLanguage = (value: Language) => {
    onChange(value);
    closeMenu();
  };

  return (
    <>
      <Tooltip title={currentLanguage}>
        <IconButton
          aria-label={`Language: ${currentLanguage}`}
          aria-controls={anchorElement ? "language-menu" : undefined}
          aria-expanded={anchorElement ? "true" : undefined}
          aria-haspopup="menu"
          color="inherit"
          onClick={(event: MouseEvent<HTMLElement>) => setAnchorElement(event.currentTarget)}
        >
          <TranslateRounded />
        </IconButton>
      </Tooltip>
      <Menu
        anchorEl={anchorElement}
        id="language-menu"
        onClose={closeMenu}
        open={Boolean(anchorElement)}
        slotProps={{ list: { "aria-label": "Language" } }}
      >
        {LANGUAGES.map((option) => (
          <MenuItem
            key={option.value}
            onClick={() => selectLanguage(option.value)}
            selected={option.value === language}
          >
            <ListItemIcon>
              {option.value === language ? <CheckRounded fontSize="small" /> : null}
            </ListItemIcon>
            <ListItemText>{option.label}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </>
  );
}
