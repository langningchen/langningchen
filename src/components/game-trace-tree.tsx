import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Tooltip from "@mui/material/Tooltip";
import Typography from "@mui/material/Typography";
import { useLocale, useTranslations } from "next-intl";
import type { GameTraceNode } from "@/lib/game-types";
import Image from "./progressive-image";

interface GameTraceTreeProps {
  nodes: GameTraceNode[];
  title: string;
}

interface TraceNodeViewProps {
  compact?: boolean;
  node: GameTraceNode;
  showLabel?: boolean;
}

function TraceNodeView({ compact = false, node, showLabel = false }: TraceNodeViewProps) {
  const locale = useLocale() as "en" | "zh";
  const t = useTranslations("games");
  const suffix = Number(node.id.slice(-3));
  const fallbackKey = suffix === 7
    ? "technique"
    : node.kind === "major"
      ? "majorTrace"
      : node.kind === "minor"
        ? "minorTrace"
        : node.kind === "extra"
          ? "memospriteAbility"
          : "skills";
  const label = node.name?.[locale] ?? node.type?.[locale] ?? t(fallbackKey);
  const unlocked = node.level > 0;
  const size = compact ? 40 : 48;

  return (
    <Tooltip enterDelay={0} title={`${label} · ${t("skillLevel", { level: node.level })}`}>
      <Stack sx={{ alignItems: "center", minWidth: 0, position: "relative" }}>
        <Box
          sx={{
            height: size,
            position: "relative",
            width: size,
          }}
        >
          <Box
            sx={{
              bgcolor: "var(--game-icon-surface)",
              border: "1px solid",
              borderColor: unlocked ? "var(--game-accent)" : "var(--game-line)",
              borderRadius: "50%",
              height: "100%",
              opacity: unlocked ? 1 : 0.42,
              overflow: "hidden",
              position: "relative",
              width: "100%",
            }}
          >
            <Image
              alt=""
              fill
              sizes={`${size}px`}
              src={node.icon}
              style={{ filter: unlocked ? "none" : "grayscale(1)", objectFit: "contain", padding: compact ? 7 : 8 }}
            />
          </Box>
          <Typography
            className="game-mono"
            component="span"
            sx={{
              bgcolor: "background.default",
              border: "1px solid var(--game-line)",
              borderRadius: "50%",
              bottom: -4,
              fontSize: 9,
              fontWeight: 800,
              height: 18,
              lineHeight: "16px",
              position: "absolute",
              right: -5,
              textAlign: "center",
              width: 18,
            }}
          >
            {node.level}
          </Typography>
        </Box>
        {showLabel && (
          <Box sx={{ mt: 0.9, textAlign: "center", width: 88 }}>
            <Typography sx={{ fontSize: 11, fontWeight: 800, lineHeight: 1.25 }}>
              {label}
            </Typography>
            {node.name && node.type && (
              <Typography color="text.secondary" sx={{ fontSize: 9.5, lineHeight: 1.2, mt: 0.25 }}>
                {node.type[locale]}
              </Typography>
            )}
          </Box>
        )}
      </Stack>
    </Tooltip>
  );
}

export default function GameTraceTree({ nodes, title }: GameTraceTreeProps) {
  const coreNodes = nodes.filter((node) => node.kind === "core" || node.kind === "extra");

  return (
    <Box>
      <Typography color="text.primary" variant="overline">
        {title}
      </Typography>
      <Box sx={{ mt: 1, overflowX: "auto", pb: 0.5 }}>
        <Box
          sx={{
            display: "grid",
            gap: 1,
            gridTemplateColumns: `repeat(${coreNodes.length}, minmax(76px, 1fr))`,
            minWidth: coreNodes.length * 76,
          }}
        >
          {coreNodes.map((node) => (
            <Box key={node.id} sx={{ position: "relative" }}>
              <TraceNodeView node={node} showLabel />
            </Box>
          ))}
        </Box>
      </Box>
    </Box>
  );
}
