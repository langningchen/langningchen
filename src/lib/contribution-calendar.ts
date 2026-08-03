export interface ContributionDay {
  count: number;
  date: string;
  intensity: string;
}

export interface ContributionCalendarData {
  contributions: ContributionDay[][];
  total: number;
}

const EMPTY_CALENDAR: ContributionCalendarData = {
  contributions: [],
  total: 0,
};

export async function getContributionCalendar(): Promise<ContributionCalendarData> {
  try {
    const response = await fetch(
      "https://gh-calendar.rschristian.dev/user/langningchen",
      { next: { revalidate: 3600 } },
    );
    if (!response.ok) return EMPTY_CALENDAR;
    return (await response.json()) as ContributionCalendarData;
  } catch {
    return EMPTY_CALENDAR;
  }
}
