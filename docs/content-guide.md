# Content editing

Edit `src/content/site.ts` for navigation, canonical origin and destinations. The Apple App Store and Google Play URLs were supplied by the user and are connected. `webApp` remains `null`; replace it only with the verified banking URL. Never use `#` or guessed destinations.

Edit account/product/team copy in `src/content/marketing.ts`. Shared long-form page text is in `src/components/Site.tsx`. Products and testimonials record their Figma source and remain `approved: false` pending bank review. The current preview displays this extracted source content for review; these flags are not a runtime publishing filter. Do not enable production indexing until all claims and testimonial permissions are approved.

Edit `content/legal/privacy-policy.md` and `content/legal/terms-and-conditions.md` only after approved documents arrive. The lightweight renderer supports paragraphs and `##` headings; add a reviewed Markdown renderer before using lists, links or other syntax. Remove each route's forced noindex only after approval.

Assets live in `public/assets/`; human-readable filenames identify the implemented artwork. `docs/asset-provenance.json` maps renamed files to their original Figma downloads. Preserve intended crops and provide alt text for informative images. Decorative images use empty alt text. Confirm image and font usage rights before launch; font licenses are included in their npm packages.

Use `npm run format`, `npm run lint`, `npm run typecheck`, `npm test`, `npm run build`, and `node scripts/verify-build.mjs` after editing. Check changed pages at desktop and mobile widths. Shared CSS changes require checking all four pages. Keep this workspace in the bank-owned private repository once ownership is supplied.
