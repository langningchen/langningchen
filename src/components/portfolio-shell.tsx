"use client";

import Box from "@mui/material/Box";
import type { ContributionCalendarData } from "@/lib/contribution-calendar";
import type { CommunityData } from "@/lib/contributions";
import type { GitHubData } from "@/lib/github-server";
import type { WakaTimeData } from "@/lib/wakatime";
import GitHubPulseSection from "./github-pulse-section";
import GamePortalSection from "./game-portal-section";
import CommunitySection from "./community-section";
import ContributionCalendarSection from "./contribution-calendar-section";
import HeroSection from "./hero-section";
import JourneySection from "./journey-section";
import OiSection from "./oi-section";
import ProjectsSection from "./projects-section";
import SiteFooter from "./site-footer";
import ToolkitSection from "./toolkit-section";
import ImagePreloader from "./image-preloader";

const HOME_BELOW_FOLD_IMAGES = [
  { sizes: "(max-width: 900px) 100vw, 50vw", src: "/cph-ng-ui.png" },
  { sizes: "24px", src: "/cph-ng-icon.png" },
  { sizes: "(max-width: 900px) 100vw, 50vw", src: "/xmoj-preview.png" },
  { sizes: "24px", src: "/xmoj-icon.png" },
  { sizes: "132px", src: "/games/genshin-portal.jpg" },
  { sizes: "132px", src: "/games/starrail-portal.jpg" },
  { sizes: "(max-width: 900px) 100vw, 38vw", src: "/CYEZ-2.jpg" },
  { sizes: "(max-width: 900px) 100vw, 38vw", src: "/CYEZ-3.jpg" },
  { sizes: "(max-width: 900px) 100vw, 38vw", src: "/CYEZ-4.jpg" },
  { sizes: "(max-width: 900px) 100vw, 38vw", src: "/CYEZ-5.jpg" },
  { sizes: "(max-width: 900px) 100vw, 38vw", src: "/JPXX-1.jpg" },
  { sizes: "(max-width: 900px) 100vw, 38vw", src: "/JPXX-2.jpg" },
  { sizes: "(max-width: 900px) 100vw, 38vw", src: "/JPXX-3.jpg" },
] as const;

interface PortfolioShellProps {
  calendar: ContributionCalendarData;
  community: CommunityData;
  github: GitHubData;
  installCount: number;
  wakaTime: WakaTimeData;
}

export default function PortfolioShell({
  calendar,
  community,
  github,
  installCount,
  wakaTime,
}: PortfolioShellProps) {
  return (
    <>
      <ImagePreloader assets={HOME_BELOW_FOLD_IMAGES} batchSize={2} delayMs={650} />
      <Box component="main">
        <HeroSection />
        <ProjectsSection
          details={github.projectDetails}
          installCount={installCount}
          repositories={github.featured}
        />
        <ContributionCalendarSection data={calendar} />
        <GitHubPulseSection
          languages={github.languages}
          profile={github.profile}
          totalStars={github.totalStars}
          wakaTime={wakaTime}
        />
        <CommunitySection projects={community.projects.slice(0, 10)} />
        <ToolkitSection />
        <OiSection />
        <GamePortalSection />
        <JourneySection />
      </Box>
      <SiteFooter />
    </>
  );
}
