import TranslateRounded from "@mui/icons-material/TranslateRounded";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import type { Language } from "@/i18n/config";

interface LanguageToggleProps {
  language: Language;
  onChange: (language: Language) => void;
}

export default function LanguageToggle({
  language,
  onChange,
}: LanguageToggleProps) {
  return (
    <ToggleButtonGroup
      aria-label="Language"
      exclusive
      onChange={(_, value: Language | null) => value && onChange(value)}
      size="small"
      value={language}
      sx={{
        bgcolor: "action.hover",
        "& .MuiToggleButton-root": {
          borderColor: "divider",
          color: "text.secondary",
          height: 36,
          px: 1.25,
        },
        "& .MuiToggleButton-root.Mui-selected": {
          bgcolor: "primary.main !important",
          color: "primary.contrastText !important",
        },
      }}
    >
      <ToggleButton aria-label="English" value="en">
        <TranslateRounded sx={{ fontSize: 17, mr: 0.5 }} /> EN
      </ToggleButton>
      <ToggleButton aria-label="中文" value="zh">
        中
      </ToggleButton>
    </ToggleButtonGroup>
  );
}
