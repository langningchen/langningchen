import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import HomeRounded from "@mui/icons-material/HomeRounded";

export default function NotFound() {
  return (
    <Stack
      spacing={3}
      sx={{ alignItems: "center", justifyContent: "center", minHeight: "100svh", px: 3, textAlign: "center" }}
    >
      <Typography className="mono" color="text.secondary" variant="overline">
        404 / Not found
      </Typography>
      <Typography component="h1" variant="h3">
        This page no longer exists.
      </Typography>
      <Button href="/" startIcon={<HomeRounded />} variant="contained">
        Back home
      </Button>
    </Stack>
  );
}
