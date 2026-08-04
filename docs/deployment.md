# Cloudflare Workers deployment

This site runs on Cloudflare Workers through the OpenNext adapter. Workers Builds
builds the application after each push and deploys the generated Worker.

## One-time setup

1. Open **Workers & Pages** in the Cloudflare dashboard.
2. Select **Create application**, then **Import a repository**.
3. Select this GitHub repository and keep `main` as the production branch.
4. Set the build command to `pnpm build:worker`.
5. Set the deploy command to
   `pnpm exec opennextjs-cloudflare deploy -- --keep-vars`.
6. Set the non-production deploy command to
   `pnpm exec opennextjs-cloudflare upload -- --keep-vars`.

The Worker name in Cloudflare must be `langningchen-home`, matching
`wrangler.jsonc`.

## Environment variables

Add `GITHUB_TOKEN` as both a Workers Builds secret and a runtime Worker secret.
Use a token with the minimum read-only access required for public GitHub data.
The build secret refreshes the bundled fallback snapshot, while the runtime secret
raises the GitHub API rate limit for live requests.

Do not commit tokens to this repository. Local values belong in an ignored `.env`
file.
