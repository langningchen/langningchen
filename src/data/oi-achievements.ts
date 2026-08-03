export interface OiAchievement {
  award: "first" | "second" | "third";
  event: "csp2021" | "csp2023" | "csp2024" | "csp2025" | "noip2024" | "noip2025";
  maximum: number;
  rank: number;
  score: number;
  total: number;
}

export const OI_ACHIEVEMENTS: OiAchievement[] = [
  { award: "second", event: "noip2025", maximum: 400, rank: 2513, score: 118, total: 7548 },
  { award: "first", event: "csp2025", maximum: 400, rank: 1537, score: 228, total: 30497 },
  { award: "third", event: "noip2024", maximum: 400, rank: 2801, score: 107, total: 7510 },
  { award: "second", event: "csp2024", maximum: 400, rank: 5152, score: 160, total: 27521 },
  { award: "first", event: "csp2023", maximum: 400, rank: 1760, score: 175, total: 19202 },
  { award: "second", event: "csp2021", maximum: 400, rank: 3890, score: 200, total: 14931 },
];
