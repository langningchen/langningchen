interface MarketplaceStatistic {
  statisticName: string;
  value: number;
}

interface MarketplaceResponse {
  results: Array<{
    extensions: Array<{
      statistics: MarketplaceStatistic[];
    }>;
  }>;
}

export const MARKETPLACE_URL =
  "https://marketplace.visualstudio.com/items?itemName=langningchen.cph-ng";

export function getInstallCount(response: MarketplaceResponse): number | null {
  const statistics = response.results[0]?.extensions[0]?.statistics ?? [];
  return statistics.find((statistic) => statistic.statisticName === "install")?.value ?? null;
}
