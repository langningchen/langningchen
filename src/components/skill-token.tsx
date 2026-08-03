import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import type { Skill } from "@/data/skill-types";

interface SkillTokenProps {
  skill: Skill;
}

export default function SkillToken({ skill }: SkillTokenProps) {
  return (
    <Box
      sx={{
        alignItems: "center",
        border: 1,
        borderColor: "divider",
        borderRadius: 1,
        display: "flex",
        gap: 1.25,
        minHeight: 46,
        px: 1.75,
        py: 1,
      }}
    >
      <Box
        component="svg"
        role="img"
        sx={{ color: skill.color, flex: "0 0 auto", height: 21, width: 21 }}
        viewBox="0 0 24 24"
      >
        <title>{skill.label}</title>
        <path d={skill.icon.path} fill="currentColor" />
      </Box>
      <Typography sx={{ fontWeight: 650 }}>{skill.label}</Typography>
    </Box>
  );
}
