"use client";

import Box from "@mui/material/Box";
import type { ContributionCalendarData } from "@/lib/contribution-calendar";
import type { ContributionProject } from "@/lib/contributions";
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

interface PortfolioShellProps {
  calendar: ContributionCalendarData;
  community: ContributionProject[];
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
        <CommunitySection projects={community} />
        <ToolkitSection />
        <OiSection />
        <GamePortalSection />
        <JourneySection />
      </Box>
      <SiteFooter />
    </>
  );
}
