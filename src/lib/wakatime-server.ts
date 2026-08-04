import type { WakaTimeData, WakaTimeResponse } from "./wakatime";
import { normalizeWakaTime } from "./wakatime";
import { RUNTIME_FALLBACK } from "./runtime-fallback";
import { fetchFromServer } from "./server-fetch";

const WAKATIME_URL =
  "https://wakatime.com/api/v1/users/langningchen/stats/all_time";

export async function getWakaTimeData(): Promise<WakaTimeData> {
  try {
    const response = await fetchFromServer(WAKATIME_URL);
    if (!response.ok) return RUNTIME_FALLBACK.wakaTime;
    return normalizeWakaTime((await response.json()) as WakaTimeResponse);
  } catch {
    return RUNTIME_FALLBACK.wakaTime;
  }
}
