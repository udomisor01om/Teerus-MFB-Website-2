# Teerus Payload CMS integration

## Status

Implemented on `codex/payload-blog-integration`. Not pushed or deployed. Local production verification uses an explicitly labelled test CMS; the Render deployment still returns HTTP 404 `{"error":"Brand not found"}` for the permanent `teerus` key (last verified 2026-10-30, 17:34 UTC). A successful real article/media response remains a release prerequisite.

## Repository audit

- Next.js 16.4.3, React 19.3.1, TypeScript, App Router (`src/app`).
- Shared layout and metadata: `src/app/layout.tsx`.
- Navigation: `src/components/Controls.tsx`, configured in `src/content/site.ts`; footer: `src/components/Site.tsx`. Both already link to `/blog`.
- Design tokens: `src/styles/globals.css`; DM Sans, Sansita Swashed, dark ink `#061c22`, action gradient `#0fa294` to `#06b488`.
- Existing journal design reused: `Blog.tsx`, `BlogListing.tsx`, `Blog.module.css`. Runtime pages no longer load the nine sample articles. Samples remain solely for existing UI tests.
- Marketing pages remain statically rendered. Their page/component styles were not changed. The requested site-origin environment variable now determines canonical URLs and bank structured data.
- Existing preview noindex protections (`SITE_ENV`, robots.txt, X-Robots-Tag) are preserved.

## Environment on Netlify

Set these for both build and Functions/runtime contexts:

```dotenv
CMS_URL=https://miden-cms-staging-deployment.onrender.com
BRAND_KEY=teerus
NEXT_PUBLIC_SITE_URL=https://teerusmfb.netlify.app
```

Local `.env.local` has these values and is ignored by Git. `.env.example` contains placeholders. No API token is used. `CMS_URL` and `BRAND_KEY` are only accessed by a `server-only` client; neither is bundled into browser JavaScript. Public image URLs are necessarily visible in rendered HTML. Set SITE_ENV=production only when intentionally enabling indexing; the CMS noIndex flag still takes precedence.

## Fetching and cold starts

- `listPosts({ page, limit })` and `getPost(slug)` use URL-encoded path/query values, runtime envelope checks, and published-only filtering.
- All CMS fetches use `cache: 'no-store'`; React request memoization shares metadata/page results within a single render. No persistent article cache or rebuild is required to see new posts.
- Requests time out at eight seconds. The visible page explains that the service may be waking up and offers a real retry link. Render may need more than 50 seconds; visitors should retry in about a minute. This intentionally prefers a prompt, recoverable screen to a prolonged request. It does not eliminate Render's cold start.
- Netlify currently documents a 60-second synchronous limit: https://docs.netlify.com/build/functions/configuration/. The shorter timeout leaves ample runtime overhead.
- There is no article loading/streaming boundary before existence is established: a successful empty slug lookup returns an actual HTTP 404. An endpoint/brand 404 is a service error, not a missing article.
- Sitemap walks all CMS pages, excludes noIndex posts and deduplicates slugs. During an outage it returns the seven marketing/blog index URLs; article URLs return on the next successful sitemap request. It is dynamic and not persistently cached.

## Content and presentation

Typed contract: `src/lib/cms/types.ts`, `blocks.ts`. Supported blocks: heading, richText (structural Lexical renderer), image, gallery, quote, callout, button, embed, code, table, divider, relatedContent. Unknown blocks are skipped. Unpopulated numeric relationships have readable fallbacks; no fabricated media/article URLs are generated. Draft related posts are not linked.

Rich text and code are escaped React content, never arbitrary HTML. Unsafe link/media protocols are rejected. YouTube privacy-enhanced and Vimeo URLs can render in sandboxed frames; other embed providers have an accessible link fallback. Images preserve alt text and aspect ratios. Existing cover rendering is unoptimized; content images use native images, so no Next image optimizer host configuration is required. Missing featured images use the brand placeholder in cards and omit the article cover.

The existing search/category controls apply to the current server-fetched page; this is stated beside the listing. Next/previous pagination exposes subsequent pages and resets local filters. A future global search should use a documented CMS search endpoint rather than downloading the entire archive.

Article generateMetadata supports SEO overrides, canonical URLs, Open Graph/Twitter images, publication/update times, and noIndex. Missing social images fall back to the site's Open Graph image. Unavailable articles/index responses are noindex.

## CSP and hosting

`src/proxy.ts` applies per-response script nonces only to `/blog` routes, plus the exact bank JSON-LD hash. Static marketing pages retain build-time script hashes. The Netlify CSP plugin excludes blog routes to avoid rewriting their nonce; it continues protecting the existing pages. HTTPS images and the two supported video hosts are permitted on blog pages; arbitrary script execution remains prohibited. See https://github.com/netlify/plugin-csp-nonce for plugin exclusions.

## Files changed

- `src/lib/cms/{types,blocks,client,presentation}.ts`: contract, validation, server access, presentation/SEO adapters.
- `src/app/blog/page.tsx`, `src/app/blog/[slug]/page.tsx`: CMS listing/detail routes and outage handling.
- `src/components/CMSBlocks.tsx`, `CMSBlocks.module.css`, `BlogUnavailable.tsx`: native branded content/error rendering.
- `src/components/Blog.tsx`, `BlogListing.tsx`, `Blog.module.css`, `src/content/blog.ts`: dynamic categories, absent-image fallback, removal of runtime sample labels, shared formatting.
- `src/app/sitemap.ts`, `src/content/site.ts`: CMS sitemap and configurable site origin.
- `src/app/layout.tsx`, `src/content/structured-data.ts`, `src/proxy.ts`, `netlify.toml`, `scripts/verify-build.mjs`: preserve structured data and support secure dynamic pages.
- `tests/unit/cms*.test.tsx`, `tests/fixtures/cms-post.json`, `tests/mocks/server-only.ts`, `vitest.config.mts`, `scripts/cms-fixture-server.mjs`: independent local contract/HTTP verification; not imported by the deployed app.
- `.env.example`, this document, screenshots: setup and review evidence.

## Verification

Type checking, lint, all 33 unit tests and the production build passed. The slow-response check returned the retry screen in 8.1 seconds. Local production HTTP checks verified listing/detail 200, missing slug 404, outage recovery UI, pagination, sitemap exclusions and marketing routes. Browser checks verified mobile article/list layout and loaded images, interactive search and navigation. Screenshots explicitly show TEST FIXTURE content, not live CMS content.

To reproduce local fixture checks:

1. `node scripts/cms-fixture-server.mjs` (localhost:4319).
2. `npm run build`.
3. `CMS_URL=http://127.0.0.1:4319 BRAND_KEY=teerus npm run start -- --hostname 127.0.0.1 --port 3002`.
4. Open `/blog`, `/blog/welcome-to-teerus-insights`, `/blog/definitely-missing`, `/blog/outage-test`, `/blog/slow-test`, `/blog?page=2`, `/sitemap.xml`.

These overrides apply only to the test process; they do not replace `.env.local`. The fixture includes every block family, numeric relationships, a future block, no cover image, pagination, and noIndex content.

## Release blocker

The CMS owner must verify that the `teerus` brand is seeded in the database attached to this exact Render deployment, and that the public list and seeded article endpoints return HTTP 200. Then repeat verification against real posts/media and a Netlify preview before production deployment. Do not describe fixture verification as a live CMS connection.
