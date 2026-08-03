"use client";

import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import { motion, useReducedMotion } from "motion/react";
import type { LanguageStat } from "@/lib/github";

interface LanguageBarsProps {
  data: LanguageStat[];
  formatValue?: (value: number) => string;
}

export default function LanguageBars({ data, formatValue }: LanguageBarsProps) {
  const reduceMotion = useReducedMotion();
  const maximum = Math.max(...data.map((item) => item.value), 1);

  return (
    <Stack spacing={1.5}>
      {data.map((item, index) => (
        <Box key={item.name}>
          <Stack direction="row" sx={{ justifyContent: "space-between", mb: 0.6 }}>
            <Typography sx={{ fontWeight: 650 }} variant="body2">
              {item.name}
            </Typography>
            {formatValue && (
              <Typography className="mono" color="text.secondary" variant="caption">
                {formatValue(item.value)}
              </Typography>
            )}
          </Stack>
          <Box sx={{ bgcolor: "action.hover", height: 7, overflow: "hidden" }}>
            <motion.div
              initial={reduceMotion ? false : { scaleX: 0 }}
              style={{
                backgroundColor: item.color,
                height: "100%",
                transformOrigin: "left center",
                width: `${Math.max((item.value / maximum) * 100, 2)}%`,
              }}
              transition={{ delay: reduceMotion ? 0 : index * 0.07, duration: reduceMotion ? 0 : 0.62, ease: [0.22, 1, 0.36, 1] }}
              viewport={{ amount: 0.5, once: true }}
              whileInView={{ scaleX: 1 }}
            />
          </Box>
        </Box>
      ))}
    </Stack>
  );
}
