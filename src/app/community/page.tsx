import type { Metadata } from "next";
import CommunityArchiveShell from "@/components/community-archive-shell";
import { getCommunityData } from "@/lib/community-server";

export const metadata: Metadata = {
  title: "Open-source Collaboration | Langning Chen",
  description: "Pull requests and issues contributed by Langning Chen across open-source communities.",
};

export const dynamic = "force-dynamic";

export default async function CommunityPage() {
  const community = await getCommunityData();
  return <CommunityArchiveShell records={community.records} />;
}
