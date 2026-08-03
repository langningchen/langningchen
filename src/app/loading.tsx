import Box from "@mui/material/Box";
import LinearProgress from "@mui/material/LinearProgress";

export default function Loading() {
  return (
    <Box sx={{ bgcolor: "#0b0e0c", minHeight: "100vh", pt: 0.5 }}>
      <LinearProgress sx={{ bgcolor: "rgba(135,219,172,0.18)", "& .MuiLinearProgress-bar": { bgcolor: "#87dbac" } }} />
    </Box>
  );
}
