import { RUNTIME_FALLBACK } from "./runtime-fallback";
import { fetchFromServer } from "./server-fetch";

export interface ContributionDay {
  count: number;
  date: string;
  intensity: string;
}

export interface ContributionCalendarData {
  contributions: ContributionDay[][];
  total: number;
}

export async function getContributionCalendar(): Promise<ContributionCalendarData> {
  try {
    const response = await fetchFromServer(
      "https://gh-calendar.rschristian.dev/user/langningchen",
    );
    if (!response.ok) return RUNTIME_FALLBACK.calendar;
    return (await response.json()) as ContributionCalendarData;
  } catch {
    return RUNTIME_FALLBACK.calendar;
  }
}
