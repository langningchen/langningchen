import TableCell from "@mui/material/TableCell";
import TableRow from "@mui/material/TableRow";
import Typography from "@mui/material/Typography";
import { useFormatter, useTranslations } from "next-intl";
import type { OiAchievement } from "@/data/oi-achievements";

interface OiAchievementRowProps {
  achievement: OiAchievement;
}

export default function OiAchievementRow({ achievement }: OiAchievementRowProps) {
  const t = useTranslations("oi");
  const format = useFormatter();

  return (
    <TableRow hover>
      <TableCell>
        <Typography sx={{ fontWeight: 700 }} variant="body2">
          {t(`awards.${achievement.event}`)}
        </Typography>
      </TableCell>
      <TableCell>{t(`levels.${achievement.award}`)}</TableCell>
      <TableCell className="mono">
        {achievement.score} / {achievement.maximum}
      </TableCell>
      <TableCell className="mono">
        {format.number(achievement.rank)} / {format.number(achievement.total)}
      </TableCell>
    </TableRow>
  );
}
