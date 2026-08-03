import PortfolioShell from "@/components/portfolio-shell";
import { getCommunityData } from "@/lib/community-server";
import { getContributionCalendar } from "@/lib/contribution-calendar";
import { getGitHubData } from "@/lib/github-server";
import { getMarketplaceInstallCount } from "@/lib/marketplace-server";
import { getWakaTimeData } from "@/lib/wakatime-server";

export default async function HomePage() {
  const [calendar, community, github, installCount, wakaTime] =
    await Promise.all([
      getContributionCalendar(),
      getCommunityData(),
      getGitHubData(),
      getMarketplaceInstallCount(),
      getWakaTimeData(),
    ]);

  return (
    <PortfolioShell
      calendar={calendar}
      community={community}
      github={github}
      installCount={installCount}
      wakaTime={wakaTime}
    />
  );
}
