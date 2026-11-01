# Cloudflare Workers deployment

This site runs on Cloudflare Workers through the OpenNext adapter. Workers Builds
builds the application after each push and deploys the generated Worker.

## Next.js compatibility

Next.js 16.4 requires `@opennextjs/cloudflare` 1.20.12 or later and Wrangler
4.148.0 or later. Older adapters omit `.next/server/preview-props.json` from the
Worker bundle, causing server initialization to fail with
`Unexpected loadManifest(/.next/server/preview-props.json) call!`.
See the [upstream fix](https://github.com/opennextjs/opennextjs-cloudflare/releases/tag/%40opennextjs%2Fcloudflare%401.20.12).

After updating dependencies, run `pnpm preview` and request both `/` and a missing
path such as `/favicon.ico`. The missing path should return 404 when no favicon
exists, without a Worker exception. Commit `pnpm-lock.yaml` with dependency changes
so Workers Builds uses the compatible versions.

## One-time setup

1. Open **Workers & Pages** in the Cloudflare dashboard.
2. Select **Create application**, then **Import a repository**.
3. Select this GitHub repository and keep `main` as the production branch.
4. Set the build command to `pnpm build:worker`.
5. Set the deploy command to
   `pnpm exec opennextjs-cloudflare deploy -- --keep-vars`.
6. Set the non-production deploy command to
   `pnpm exec opennextjs-cloudflare upload -- --keep-vars`.

The Worker name in Cloudflare must be `langningchen`, matching
`wrangler.jsonc`.

## Environment variables

Add `GITHUB_TOKEN` as both a Workers Builds secret and a runtime Worker secret.
Use a token with the minimum read-only access required for public GitHub data.
The build secret refreshes the bundled fallback snapshot, while the runtime secret
raises the GitHub API rate limit for live requests.

Do not commit tokens to this repository. Local values belong in an ignored `.env`
file.
