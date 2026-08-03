import Box from "@mui/material/Box";

interface ActivitySparklineProps {
  values: number[];
}

export default function ActivitySparkline({ values }: ActivitySparklineProps) {
  const width = 420;
  const height = 96;
  const maximum = Math.max(...values, 1);
  const points = values
    .map((value, index) => {
      const x = (index / Math.max(values.length - 1, 1)) * width;
      const y = height - 8 - (value / maximum) * (height - 20);
      return `${x},${y}`;
    })
    .join(" ");

  return (
    <Box
      component="svg"
      role="img"
      sx={{ color: "primary.main", height: 96, overflow: "visible", width: "100%" }}
      viewBox={`0 0 ${width} ${height}`}
    >
      <polyline
        fill="none"
        points={points}
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2.25"
        vectorEffect="non-scaling-stroke"
      />
    </Box>
  );
}
