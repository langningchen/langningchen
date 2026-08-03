import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { LanguageStat } from "@/lib/github";

interface LanguageBreakdownProps {
  data: LanguageStat[];
}

export default function LanguageBreakdown({ data }: LanguageBreakdownProps) {
  const total = data.reduce((sum, language) => sum + language.value, 0);

  if (total === 0) return null;

  return (
    <Stack spacing={1.5}>
      <Box
        aria-hidden="true"
        sx={{ display: "flex", height: 10, overflow: "hidden", width: "100%" }}
      >
        {data.map((language) => (
          <Box
            key={language.name}
            sx={{ bgcolor: language.color, width: `${(language.value / total) * 100}%` }}
          />
        ))}
      </Box>
      <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1.75 }}>
        {data.map((language) => (
          <Stack direction="row" key={language.name} spacing={0.75} sx={{ alignItems: "center" }}>
            <Box sx={{ bgcolor: language.color, height: 8, width: 8 }} />
            <Typography variant="body2">{language.name}</Typography>
            <Typography color="text.secondary" variant="body2">
              {Math.round((language.value / total) * 100)}%
            </Typography>
          </Stack>
        ))}
      </Stack>
    </Stack>
  );
}
