import { getInstallCount } from "./marketplace";
import { RUNTIME_FALLBACK } from "./runtime-fallback";
import { fetchFromServer } from "./server-fetch";

const MARKETPLACE_API =
  "https://marketplace.visualstudio.com/_apis/public/gallery/extensionquery";
const QUERY = {
  filters: [
    { criteria: [{ filterType: 7, value: "langningchen.cph-ng" }] },
  ],
  flags: 914,
};
export async function getMarketplaceInstallCount(): Promise<number> {
  try {
    const response = await fetchFromServer(MARKETPLACE_API, {
      body: JSON.stringify(QUERY),
      headers: {
        Accept: "application/json;api-version=7.2-preview.1",
        "Content-Type": "application/json",
      },
      method: "POST",
    });
    if (!response.ok) return RUNTIME_FALLBACK.installCount;

    return getInstallCount(await response.json()) ?? RUNTIME_FALLBACK.installCount;
  } catch {
    return RUNTIME_FALLBACK.installCount;
  }
}
