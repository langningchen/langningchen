import type { Metadata } from "next";
import GamePageShell from "@/components/game-page-shell";
import { getGenshinProfile } from "@/lib/game-data";

export const metadata: Metadata = {
  title: "Genshin Impact Profile | Langning Chen",
  description: "LangningChen's public Genshin Impact profile.",
};

export const dynamic = "force-dynamic";

export default async function GenshinPage() {
  const profile = await getGenshinProfile();
  return <GamePageShell profile={profile} />;
}
