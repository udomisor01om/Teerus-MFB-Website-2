# Teerus MFB website

A local Next.js App Router implementation of the supplied Teerus Figma designs. Home, Individuals, MSMEs, About Us, legal routes and a branded 404 are implemented. The app-store destinations are confirmed and connected.

This is a **review preview**, not a production release. Web banking is disabled pending its verified URL. Legal pages contain an explicit awaiting-approved-copy message. Product claims, testimonial consent, asset rights and hosting/domain approval remain launch prerequisites.

## Run locally

Use Node **22.16.0** (`.nvmrc`) and npm **10.9.2**.

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Source changes update the preview automatically.

```sh
npm run build
npm start
```

Always use `npm run build`, which includes the CSP hash step; do not deploy a bare `next build`. All marketing routes are prerendered. No CMS, database, login processing, application submission or tracking service is included.

## Commands

| Command                         | Purpose                                                      |
| ------------------------------- | ------------------------------------------------------------ |
| `npm run dev`                   | Local preview with development-only accessibility audit      |
| `npm run build`                 | Production build plus exact hydration-script CSP hashes      |
| `npm start`                     | Serve the production build                                   |
| `npm run typecheck`             | Strict TypeScript                                            |
| `npm run lint`                  | Next.js and TypeScript lint                                  |
| `npm run format:check`          | Check source formatting                                      |
| `npm run format`                | Format source                                                |
| `npm test`                      | Vitest/React Testing Library interaction checks              |
| `npm run test:e2e`              | Playwright + axe across Chromium, Firefox, WebKit and mobile |
| `node scripts/verify-build.mjs` | Check generated routes, asset files and CSP hash coverage    |

Install test browsers with `npx playwright install`. With Chrome installed, `PLAYWRIGHT_CHROME=1 npx playwright test --project=chromium` uses that browser. Set `TEST_BASE_URL` to a running production preview for release tests.

## Organization

- `src/app/`: route composition, metadata, sitemap, robots and social preview.
- `src/components/Site.tsx`: shared sections and page-specific compositions.
- `src/components/Controls.tsx`: client navigation, native download dialog, carousels and motion pause controls.
- `src/components/Site.module.css`: responsive section styles.
- `src/styles/globals.css`: shared design tokens, local fonts, focus and reduced-motion foundations.
- `src/content/`: centralized URLs, typed products and testimonials, account/team content.
- `content/legal/`: Markdown legal copy, currently awaiting approved documents.
- `public/assets/`: original Figma artwork and exported composite illustrations.
- `tests/`: unit and browser test suites.

## Validation status

Production build, TypeScript, lint and four interaction unit tests passed. In-app browser checks covered all routes, a native download-dialog keyboard flow, menu Escape handling, carousel controls, motion pause, and no horizontal page overflow at 320, 768 and 1024 pixels. Axe reported no WCAG A/AA violations on the checked routes. The production download dialog hydrates with script hashes enforced and no unsafe inline/eval script allowance.

The Playwright CLI suite is supplied but **has not passed in this host environment**: the browser download CDN did not resolve, and the installed Chrome subprocess was terminated before tests could execute. Full multi-engine regression, real-device/screen-reader testing, 200% zoom and Lighthouse performance acceptance remain outstanding. Automated axe checks do not establish complete WCAG conformance.

See [design mapping](docs/design-mapping.md), [content editing](docs/content-guide.md), [QA record](docs/qa-browser.json), and [deployment/rollback](docs/deployment-runbook.md).
