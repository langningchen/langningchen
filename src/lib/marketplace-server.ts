import { getInstallCount } from "./marketplace";

const MARKETPLACE_API =
  "https://marketplace.visualstudio.com/_apis/public/gallery/extensionquery";
const QUERY = {
  filters: [
    { criteria: [{ filterType: 7, value: "langningchen.cph-ng" }] },
  ],
  flags: 914,
};
const FALLBACK_INSTALL_COUNT = 14703;

export async function getMarketplaceInstallCount(): Promise<number> {
  try {
    const response = await fetch(MARKETPLACE_API, {
      body: JSON.stringify(QUERY),
      headers: {
        Accept: "application/json;api-version=7.2-preview.1",
        "Content-Type": "application/json",
      },
      method: "POST",
      next: { revalidate: 3600 },
    });
    if (!response.ok) return FALLBACK_INSTALL_COUNT;

    return getInstallCount(await response.json()) ?? FALLBACK_INSTALL_COUNT;
  } catch {
    return FALLBACK_INSTALL_COUNT;
  }
}
