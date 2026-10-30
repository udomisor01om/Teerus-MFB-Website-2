# Payload CMS integration audit

Status: preparation only; live integration is blocked on the public API contract and brand setup. No deployment has been performed.

## Existing website

- Next.js 16.4.3, React 19.3.1, TypeScript, App Router (`src/app`).
- Shared layout and metadata: `src/app/layout.tsx`.
- Navigation: `src/components/Controls.tsx`, configured in `src/content/site.ts`.
- Footer: `src/components/Site.tsx`. Both navigation and footer already link to `/blog`.
- Design tokens: `src/styles/globals.css`; DM Sans, Sansita Swashed, dark ink `#061c22`, action gradient `#0fa294` to `#06b488`.
- Existing blog: `src/app/blog/page.tsx`, `src/app/blog/[slug]/page.tsx`, `Blog.tsx`, `BlogListing.tsx`, `Blog.module.css`. These use nine sample articles from `src/content/blog.ts`.
- Existing article routes are built from static sample slugs and set `dynamicParams = false`. Both blog pages currently force noindex.
- SEO: root metadata and article generateMetadata; canonical origin currently hardcoded in `src/content/site.ts`. Sitemap omits the sample blog. Robots and X-Robots-Tag intentionally block indexing unless SITE_ENV=production.
- Hosting: Netlify Next runtime, with CSP nonce plugin. Local production builds use exact static script hashes in `scripts/secure-build.mjs`. The build verifier expects sample article HTML. Dynamic articles require route-aware CSP and build verification changes, preserving existing static marketing pages.

## Endpoint verification

On 2026-10-30, a real request to:

`https://miden-cms-staging-deployment.onrender.com/api/public/brand-one/posts?limit=2`

returned HTTP 404 and `{"error":"Brand not found"}`. Render/Payload responded, so this is not merely a cold-start timeout. Do not interpret this as an empty article list or a missing individual article.

Required from the CMS owner:

1. Confirm or seed the Teerus brand on this deployment and provide the working public brand key.
2. Provide the public response schema/types, pagination fields, and field definitions for all 13 supported block types, including richText format and relationship population.
3. Provide a published example article and media URL to verify article rendering and media origins.

## Environment

Local ignored `.env.local` has the requested initial values. `.env.example` contains placeholders only.

Netlify will need these values in the build/runtime scope before the integration is deployed:

- CMS_URL=https://miden-cms-staging-deployment.onrender.com
- BRAND_KEY=brand-one (unverified; replace if the CMS owner confirms a different key)
- NEXT_PUBLIC_SITE_URL=https://teerusmfb.netlify.app

CMS_URL and BRAND_KEY must only be read by server modules. No API key or other secret was supplied or is needed for the stated public endpoint. Keep existing SITE_ENV indexing controls.

## Planned fetching and verification

Prefer uncached server fetching during initial integration, with request-level deduplication, explicit timeout, and a recoverable unavailable state. Final timeout must account for both Render cold starts and Netlify's runtime duration limit; a 50+ second upstream startup cannot be solved just by a longer client timeout. Verify the hosting limit before settling on a long request versus a bounded timeout/retry approach.

Do not stream an article loading boundary before its existence is established if an actual HTTP 404 is required. Distinguish CMS outages/unknown brands from a successful empty slug lookup. Render rich text structurally and validate link/embed URLs; never inject arbitrary CMS HTML/scripts. Preserve media alt text and handle absent cover images.

Pending live verification: list, known article, missing slug HTTP status, block rendering, SEO/noIndex/canonical, sitemap pagination, media, responsive layout, and unchanged marketing pages. No integration claims should be made until these checks pass.
