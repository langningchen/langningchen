import { FALLBACK_WAKATIME } from "@/data/fallback-activity";
import type { WakaTimeData, WakaTimeResponse } from "./wakatime";
import { normalizeWakaTime } from "./wakatime";

const WAKATIME_URL =
  "https://wakatime.com/api/v1/users/langningchen/stats/all_time";

export async function getWakaTimeData(): Promise<WakaTimeData> {
  try {
    const response = await fetch(WAKATIME_URL);
    if (!response.ok) return FALLBACK_WAKATIME;
    return normalizeWakaTime((await response.json()) as WakaTimeResponse);
  } catch {
    return FALLBACK_WAKATIME;
  }
}
