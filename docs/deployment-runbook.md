# Deployment and rollback

## Release status

Implemented as a local review preview. Production build and initial browser/accessibility checks pass, but launch approval and the remaining acceptance checks below are outstanding. No deployment or DNS changes have been made.

## Required inputs

- Confirmed image and font usage rights. Figma extraction is complete.
- Verified banking web-app URL. Both app-store URLs are supplied and connected.
- Approved product claims, testimonial permissions, privacy policy, and terms.
- Bank-owned private GitHub repository, Vercel Pro project, and domain access.

## Staging acceptance

Use standard Next.js deployment, not static export. Keep preview indexing disabled. Run build, lint, type checking, Vitest interaction tests, and Playwright on Chromium, Firefox, and WebKit. Include automated accessibility checks, manual keyboard and screen-reader checks, 200% zoom, and real-device checks.

Compare all four pages to Figma at 1512px, then inspect mobile and tablet layouts and overflow down to 320px. Verify image geometry, local asset availability, every CTA, legal routes, 404 status, reduced motion, pause controls, focus management, and console errors.

Record Lighthouse version, production build commit, browser version, mobile device and network configuration, run count, and median performance score. Target at least 90. Field Core Web Vitals require sufficient production traffic and cannot be certified from lab tests.

Use `npm run build`: `scripts/secure-build.mjs` hashes exact inline scripts in prerendered HTML and updates the generated Next routes manifest. `scripts/verify-build.mjs` checks coverage and assets. The production server was checked with the enforced policy and working download-dialog hydration. Script policy has no unsafe-inline or unsafe-eval; style-src retains unsafe-inline for Next image/layout styles. No external scripts, frames, fonts or network services are allowed.

This post-build integration is tied to Next’s routes-manifest format and must be revalidated after framework updates. Run the full build command in Vercel, inspect the resulting deployment CSP, and verify hydration on every route before promotion; local `next start` validation does not prove adapter behavior. Do not add a CDN HTML rewrite or injected analytics without revisiting hashes.

Keep `SITE_ENV=preview` or unset on previews: HTML metadata, robots.txt and X-Robots-Tag block indexing. Use `SITE_ENV=production` only after content approval and production domain verification; it also enables HSTS. Confirm `www.teerusbank.com` as the intended canonical host. Verify security headers, canonical URLs, social previews, sitemap, and robots directives.

## Initial migration

1. Crawl and inventory existing URLs and response codes; approve explicit permanent redirects for changed URLs. Do not redirect every missing path to Home.
2. Export the current DNS zone and record the website A, AAAA, and CNAME values, TTLs, provider, timestamp, and owner. Preserve mail and banking records.
3. Retain old hosting and document how to restore its website records before cutover.
4. Configure and verify the bank-owned Vercel production domain and HTTPS. Set production indexing only on the canonical production deployment.
5. Change only approved website DNS records. Verify both apex and www canonical redirects, HTTPS, sitemap, legal content, assets, and critical CTAs.
6. Monitor uptime and hosting error logs for 48 hours, with a named owner and escalation contact.

## Rollback

For initial DNS migration failure, restore the recorded website DNS values and verify the old host. DNS caching means recovery is not instantaneous; retain the old service throughout the rollback window.

For later application regressions, promote the previously verified Vercel release, then verify key routes and CTAs. Application rollback does not restore DNS records. Record incident, release IDs, timestamps, and verification results.
