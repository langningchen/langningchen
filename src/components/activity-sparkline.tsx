"use client";

import { useMemo, useRef, useState } from "react";
import type { PointerEvent } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import { useLocale, useTranslations } from "next-intl";
import {
  createActivityPoints,
  createSmoothActivityPath,
} from "@/lib/activity-chart";

interface ActivitySparklineProps {
  startDate?: string;
  values: number[];
}

const CHART_WIDTH = 720;
const CHART_HEIGHT = 132;
const YEAR_LENGTH = 365;

function padAnnualValues(values: number[]): number[] {
  const recentValues = values.slice(-YEAR_LENGTH);
  return [...Array(Math.max(YEAR_LENGTH - recentValues.length, 0)).fill(0), ...recentValues];
}

export default function ActivitySparkline({ startDate, values }: ActivitySparklineProps) {
  const locale = useLocale();
  const t = useTranslations("projectDetails");
  const svgRef = useRef<SVGSVGElement | null>(null);
  const [activeIndex, setActiveIndex] = useState<number | null>(null);
  const annualValues = useMemo(
    () => startDate ? values.slice(-YEAR_LENGTH) : padAnnualValues(values),
    [startDate, values],
  );
  const points = useMemo(
    () => createActivityPoints({
      chartHeight: CHART_HEIGHT,
      chartWidth: CHART_WIDTH,
      startDate,
      values: annualValues,
    }),
    [annualValues, startDate],
  );
  const linePath = useMemo(() => createSmoothActivityPath(points), [points]);
  const activePoint = activeIndex === null ? null : points[activeIndex];
  const dateFormatter = useMemo(
    () => new Intl.DateTimeFormat(locale, {
      day: "numeric",
      month: "short",
      timeZone: "UTC",
      year: "numeric",
    }),
    [locale],
  );

  function updateActivePoint(event: PointerEvent<SVGSVGElement>) {
    const bounds = svgRef.current?.getBoundingClientRect();
    if (!bounds) return;
    const position = Math.min(Math.max(event.clientX - bounds.left, 0), bounds.width);
    setActiveIndex(Math.round((position / bounds.width) * (points.length - 1)));
  }

  return (
    <Box sx={{ pb: 2.5, position: "relative" }}>
      <Box
        aria-label={t("activity")}
        component="svg"
        onPointerEnter={updateActivePoint}
        onPointerLeave={() => setActiveIndex(null)}
        onPointerMove={updateActivePoint}
        ref={svgRef}
        role="img"
        sx={{ color: "primary.main", display: "block", height: 168, overflow: "visible", touchAction: "pan-y", width: "100%" }}
        viewBox={`0 0 ${CHART_WIDTH} ${CHART_HEIGHT + 28}`}
      >
        {[0.25, 0.5, 0.75].map((position) => (
          <line
            key={position}
            opacity="0.11"
            stroke="currentColor"
            strokeDasharray="4 6"
            x1="0"
            x2={CHART_WIDTH}
            y1={CHART_HEIGHT * position}
            y2={CHART_HEIGHT * position}
          />
        ))}
        <path
          d={`${linePath} L ${CHART_WIDTH} ${CHART_HEIGHT - 14} L 0 ${CHART_HEIGHT - 14} Z`}
          fill="currentColor"
          opacity="0.08"
        />
        <path
          d={linePath}
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2.25"
          vectorEffect="non-scaling-stroke"
        />
        {activePoint && (
          <>
            <line
              opacity="0.38"
              stroke="currentColor"
              strokeDasharray="3 4"
              x1={activePoint.x}
              x2={activePoint.x}
              y1="6"
              y2={CHART_HEIGHT - 14}
            />
            <circle
              cx={activePoint.x}
              cy={activePoint.y}
              fill="currentColor"
              r="4.5"
              stroke="var(--mui-palette-background-paper, #fff)"
              strokeWidth="2.5"
              vectorEffect="non-scaling-stroke"
            />
          </>
        )}
        {[points[0], points[Math.floor(points.length / 2)], points.at(-1)].map((point) => point && (
          <text
            fill="currentColor"
            fontSize="12"
            key={point.date.toISOString()}
            opacity="0.62"
            textAnchor={point === points[0] ? "start" : point === points.at(-1) ? "end" : "middle"}
            x={point.x}
            y={CHART_HEIGHT + 15}
          >
            {new Intl.DateTimeFormat(locale, { month: "short", timeZone: "UTC", year: "numeric" }).format(point.date)}
          </text>
        ))}
      </Box>
      {activePoint && (
        <Box
          sx={{
            bgcolor: "background.paper",
            border: 1,
            borderColor: "divider",
            boxShadow: 3,
            left: `${Math.min(Math.max((activePoint.x / CHART_WIDTH) * 100, 14), 86)}%`,
            px: 1.25,
            py: 0.75,
            pointerEvents: "none",
            position: "absolute",
            top: 0,
            transform: "translate(-50%, -55%)",
            zIndex: 1,
          }}
        >
          <Typography sx={{ whiteSpace: "nowrap" }} variant="caption">
            {t("activityTooltip", {
              count: activePoint.value,
              date: dateFormatter.format(activePoint.date),
            })}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
