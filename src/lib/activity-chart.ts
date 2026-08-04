const DAY_IN_MILLISECONDS = 24 * 60 * 60 * 1000;

export interface ActivityChartPoint {
  date: Date;
  value: number;
  x: number;
  y: number;
}

interface CreateActivityPointsOptions {
  chartHeight: number;
  chartWidth: number;
  startDate?: string;
  values: number[];
}

function getStartDate(startDate: string | undefined, valueCount: number): Date {
  const parsedDate = startDate ? Date.parse(startDate) : Number.NaN;
  if (Number.isFinite(parsedDate)) return new Date(parsedDate);

  const today = new Date();
  today.setUTCHours(0, 0, 0, 0);
  today.setUTCDate(today.getUTCDate() - Math.max(valueCount - 1, 0));
  return today;
}

export function createActivityPoints({
  chartHeight,
  chartWidth,
  startDate,
  values,
}: CreateActivityPointsOptions): ActivityChartPoint[] {
  const maximum = Math.max(...values, 1);
  const firstDate = getStartDate(startDate, values.length);
  const bottom = chartHeight - 14;
  const drawableHeight = chartHeight - 28;

  return values.map((value, index) => ({
    date: new Date(firstDate.getTime() + index * DAY_IN_MILLISECONDS),
    value,
    x: (index / Math.max(values.length - 1, 1)) * chartWidth,
    y: bottom - (value === 0 ? 0 : Math.sqrt(value / maximum)) * drawableHeight,
  }));
}

export function createSmoothActivityPath(points: ActivityChartPoint[]): string {
  if (points.length === 0) return "";
  if (points.length === 1) return `M ${points[0].x} ${points[0].y}`;

  const tension = 0.42;
  let path = `M ${points[0].x} ${points[0].y}`;

  for (let index = 0; index < points.length - 1; index += 1) {
    const previous = points[Math.max(0, index - 1)];
    const current = points[index];
    const next = points[index + 1];
    const afterNext = points[Math.min(points.length - 1, index + 2)];
    const firstControlX = current.x + ((next.x - previous.x) / 6) * tension;
    const firstControlY = current.y + ((next.y - previous.y) / 6) * tension;
    const secondControlX = next.x - ((afterNext.x - current.x) / 6) * tension;
    const secondControlY = next.y - ((afterNext.y - current.y) / 6) * tension;

    path += ` C ${firstControlX} ${firstControlY}, ${secondControlX} ${secondControlY}, ${next.x} ${next.y}`;
  }

  return path;
}
