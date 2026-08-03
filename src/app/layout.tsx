import type { Metadata } from "next";
import { AppRouterCacheProvider } from "@mui/material-nextjs/v16-appRouter";
import ClientAppShell from "@/components/client-app-shell";
import "lenis/dist/lenis.css";
import "@/styles/globals.css";
import "@/styles/game-cursors.css";

export const metadata: Metadata = {
  title: "Langning Chen",
  description:
    "The portfolio of Langning Chen, an open-source developer building tools for competitive programmers.",
  metadataBase: new URL("https://www.langningchen.com"),
  openGraph: {
    title: "Langning Chen",
    description:
      "Open-source developer focused on developer tools, web systems, and algorithms.",
    images: ["/CYEZ-1.jpg"],
    type: "website",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body>
        <AppRouterCacheProvider options={{ enableCssLayer: true }}>
          <ClientAppShell>{children}</ClientAppShell>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
