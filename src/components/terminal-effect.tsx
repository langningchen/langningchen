"use client";

import { useEffect, useMemo, useState } from "react";
import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { useTranslations } from "next-intl";

const TYPE_DELAY = 42;
const LINE_PAUSE = 720;

interface TerminalEffectProps {
  lightMode: boolean;
}

export default function TerminalEffect({ lightMode }: TerminalEffectProps) {
  const t = useTranslations("terminal");
  const lines = useMemo(() => [
    "$ profile --summary",
    "name: Langning Chen",
    `role: ${t("identity")}`,
    `focus: ${t("focus")}`,
    `location: ${t("location")}`,
  ], [t]);
  const [lineIndex, setLineIndex] = useState(0);
  const [characterIndex, setCharacterIndex] = useState(0);

  useEffect(() => {
    if (lineIndex >= lines.length) return;
    const lineComplete = characterIndex >= lines[lineIndex].length;
    const timeout = window.setTimeout(() => {
      if (lineComplete) {
        setLineIndex((current) => current + 1);
        setCharacterIndex(0);
      } else {
        setCharacterIndex((current) => current + 1);
      }
    }, lineComplete ? LINE_PAUSE : TYPE_DELAY);

    return () => window.clearTimeout(timeout);
  }, [characterIndex, lineIndex, lines]);

  return (
    <Box
      aria-label={lines.join(". ")}
      className="terminal-effect"
      sx={{
        bgcolor: lightMode ? "rgba(250,252,251,0.88)" : "rgba(7,10,8,0.84)",
        border: lightMode
          ? "1px solid rgba(40,115,86,0.3)"
          : "1px solid rgba(135,219,172,0.34)",
        bottom: 72,
        color: lightMode ? "#17201b" : "#f0f0f0",
        display: { xs: "none", xl: "block" },
        maxWidth: "calc(100% - 48px)",
        position: "absolute",
        right: 24,
        width: 500,
      }}
    >
      <Stack
        direction="row"
        spacing={0.75}
        sx={{
          alignItems: "center",
          borderBottom: lightMode
            ? "1px solid rgba(23,32,27,0.12)"
            : "1px solid rgba(255,255,255,0.1)",
          height: 34,
          px: 1.5,
        }}
      >
        {["#ff6b6b", "#ffd166", "#87dbac"].map((color) => (
          <Box key={color} sx={{ bgcolor: color, borderRadius: "50%", height: 7, width: 7 }} />
        ))}
        <Typography
          className="terminal-mono"
          sx={{
            color: lightMode ? "rgba(23,32,27,0.62)" : "rgba(240,240,240,0.58)",
            fontSize: 11,
            ml: 1,
          }}
        >
          ~/about/langningchen
        </Typography>
      </Stack>
      <Box aria-hidden="true" className="terminal-mono" sx={{ fontSize: 13, lineHeight: 1.9, p: 2 }}>
        {lines.map((line, index) => {
          const visible = index < lineIndex ? line : index === lineIndex ? line.slice(0, characterIndex) : "";
          const separator = visible.indexOf(":");
          const prefixLength = line.startsWith("$") ? Math.min(1, visible.length) : separator >= 0 ? separator + 1 : 0;
          return (
            <Typography
              className="terminal-line"
              component="div"
              key={line}
              sx={{
                color: index % 2
                  ? lightMode ? "rgba(23,32,27,0.72)" : "rgba(240,240,240,0.72)"
                  : "inherit",
                fontFamily: "inherit",
                fontSize: "inherit",
              }}
            >
              <Box component="span" sx={{ color: lightMode ? "#287356" : "#87dbac" }}>
                {visible.slice(0, prefixLength)}
              </Box>
              {visible.slice(prefixLength)}
              {index === lineIndex && (
                <Box
                  className="terminal-cursor"
                  component="span"
                  sx={{ color: lightMode ? "#287356" : "#87dbac" }}
                >
                  _
                </Box>
              )}
            </Typography>
          );
        })}
      </Box>
    </Box>
  );
}
