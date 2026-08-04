import type { Metadata } from "next";
import GamePageShell from "@/components/game-page-shell";
import { getStarRailProfile } from "@/lib/game-data";

export const metadata: Metadata = {
  title: "Honkai: Star Rail Profile | Langning Chen",
  description: "LangningChen's public Honkai: Star Rail profile.",
};

export const dynamic = "force-dynamic";

export default async function StarRailPage() {
  const profile = await getStarRailProfile();
  return <GamePageShell profile={profile} />;
}
