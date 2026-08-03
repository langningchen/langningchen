import type { ContributionDay } from "./contribution-calendar";

export interface ContributionMonth {
  date: Date;
  key: string;
  weeks: ContributionDay[][];
}

const EMPTY_DAY: ContributionDay = { count: 0, date: "", intensity: "0" };

function dateKey(year: number, month: number, day: number): string {
  return [year, String(month + 1).padStart(2, "0"), String(day).padStart(2, "0")].join("-");
}

export function groupContributionsByMonth(weeks: ContributionDay[][]): ContributionMonth[] {
  const days = weeks.flat().filter((day) => day.date);
  if (days.length === 0) return [];

  const byDate = new Map(days.map((day) => [day.date, day]));
  const first = new Date(`${days[0].date}T00:00:00Z`);
  const last = new Date(`${days[days.length - 1].date}T00:00:00Z`);
  const months: ContributionMonth[] = [];

  for (
    let cursor = new Date(Date.UTC(first.getUTCFullYear(), first.getUTCMonth(), 1));
    cursor <= last;
    cursor = new Date(Date.UTC(cursor.getUTCFullYear(), cursor.getUTCMonth() + 1, 1))
  ) {
    const year = cursor.getUTCFullYear();
    const month = cursor.getUTCMonth();
    const firstWeekday = cursor.getUTCDay();
    const numberOfDays = new Date(Date.UTC(year, month + 1, 0)).getUTCDate();
    const slotCount = Math.ceil((firstWeekday + numberOfDays) / 7) * 7;
    const slots = Array.from({ length: slotCount }, (_, index) => {
      const dayNumber = index - firstWeekday + 1;
      if (dayNumber < 1 || dayNumber > numberOfDays) return EMPTY_DAY;
      return byDate.get(dateKey(year, month, dayNumber)) ?? EMPTY_DAY;
    });
    const monthWeeks = Array.from({ length: slotCount / 7 }, (_, index) =>
      slots.slice(index * 7, index * 7 + 7),
    );

    months.push({
      date: cursor,
      key: `${year}-${month}`,
      weeks: monthWeeks,
    });
  }

  return months;
}
