# Langning Chen

Personal portfolio for [langningchen.com](https://www.langningchen.com), built with the Next.js App Router, Material UI, and `next-intl`.

The site has three connected experiences:

- A technical portfolio with selected projects, GitHub contributions, WakaTime activity, CPH-NG installs, technology icons, OI results, and education.
- A Genshin Impact profile at `/games/genshin/`.
- A Honkai: Star Rail profile at `/games/star-rail/`.

GitHub, WakaTime, Visual Studio Marketplace, contribution-calendar, and Enka data is requested while rendering the static export. Browser clients receive the generated content and local visual assets instead of contacting those services directly. Fallback data keeps builds usable when a public service is unavailable.

Project cards open locally rendered details for commit activity, languages, contributors, repository metrics, and README summaries. XMOJ Script uses the actively maintained `XMOJ-Script-dev/XMOJ-Script` repository, while the earlier personal repository remains linked separately.

## Development

```bash
pnpm install
pnpm dev
```

`GITHUB_TOKEN` is optional but recommended for local builds to avoid GitHub's anonymous API rate limit.

Before deployment:

```bash
pnpm exec tsc --noEmit
pnpm lint
pnpm build
```

The production build is exported to `out/` for Cloudflare Pages.
