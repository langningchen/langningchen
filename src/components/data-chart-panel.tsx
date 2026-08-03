import Box from "@mui/material/Box";
import Chip from "@mui/material/Chip";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import type { LanguageStat } from "@/lib/github";
import LanguageBars from "./language-bars";

interface DataChartPanelProps {
  data: LanguageStat[];
  label: string;
  meta: string[];
  valuesArePercentages?: boolean;
}

export default function DataChartPanel({
  data,
  label,
  meta,
  valuesArePercentages = false,
}: DataChartPanelProps) {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  const formatValue = (value: number) => {
    const percentage = valuesArePercentages ? value : (value / Math.max(total, 1)) * 100;
    return `${percentage.toFixed(1)}%`;
  };

  return (
    <Box sx={{ borderTop: 1, borderColor: "divider", pt: 3 }}>
      <Typography className="mono" color="text.secondary" sx={{ mb: 2 }} variant="overline">
        {label}
      </Typography>
      <LanguageBars data={data} formatValue={formatValue} />
      <Stack direction="row" sx={{ flexWrap: "wrap", gap: 1, mt: 3 }}>
        {meta.map((item) => (
          <Chip key={item} label={item} size="small" variant="outlined" />
        ))}
      </Stack>
    </Box>
  );
}
