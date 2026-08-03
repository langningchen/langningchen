import AlternateEmailRounded from "@mui/icons-material/AlternateEmailRounded";
import GitHub from "@mui/icons-material/GitHub";
import LinkedIn from "@mui/icons-material/LinkedIn";
import SendRounded from "@mui/icons-material/SendRounded";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";

const LINKS = [
  { href: "mailto:i@langningchen.com", icon: <AlternateEmailRounded />, label: "Email" },
  { href: "https://github.com/langningchen", icon: <GitHub />, label: "GitHub" },
  { href: "https://www.linkedin.com/in/langningchen", icon: <LinkedIn />, label: "LinkedIn" },
  { href: "https://telegram.me/langningchen", icon: <SendRounded />, label: "Telegram" },
];

export default function SocialLinks() {
  return (
    <Stack direction="row" spacing={0.5}>
      {LINKS.map((link) => (
        <Tooltip key={link.label} title={link.label}>
          <IconButton
            aria-label={link.label}
            color="inherit"
            href={link.href}
            rel="noreferrer"
            target={link.href.startsWith("mailto:") ? undefined : "_blank"}
          >
            {link.icon}
          </IconButton>
        </Tooltip>
      ))}
    </Stack>
  );
}
