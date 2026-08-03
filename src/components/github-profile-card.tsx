import GitHub from "@mui/icons-material/GitHub";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslations } from "next-intl";
import type { GitHubProfile } from "@/lib/github";

interface GitHubProfileCardProps {
  profile: GitHubProfile;
}

export default function GitHubProfileCard({ profile }: GitHubProfileCardProps) {
  const t = useTranslations("pulse");

  return (
    <Box
      sx={{
        alignItems: { xs: "flex-start", md: "center" },
        border: 1,
        borderColor: "divider",
        borderRadius: 2,
        display: "flex",
        flexDirection: { xs: "column", md: "row" },
        gap: 2.5,
        justifyContent: "space-between",
        mb: { xs: 5, md: 7 },
        p: { xs: 2.5, md: 3 },
      }}
    >
      <Stack direction="row" spacing={2} sx={{ alignItems: "center" }}>
        <Avatar alt="" src={profile.avatar_url} sx={{ height: 56, width: 56 }} />
        <Box>
          <Typography className="mono" color="primary.main" variant="overline">
            {t("profileLabel")}
          </Typography>
          <Typography sx={{ fontWeight: 700 }}>github.com/langningchen</Typography>
          <Typography color="text.secondary" sx={{ mt: 0.5 }}>
            {t("profileDescription")}
          </Typography>
        </Box>
      </Stack>
      <Button
        color="primary"
        endIcon={<GitHub />}
        href={profile.html_url}
        rel="noreferrer"
        target="_blank"
        variant="outlined"
      >
        {t("profileLink")}
      </Button>
    </Box>
  );
}
