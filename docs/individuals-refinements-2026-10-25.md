# Individuals page refinements — 25 October 2026

Implemented from the Individuals page (5268:47812) and authoritative hero variants (5419:10327). Figma section screenshots, targeted design-context responses, layer positions, rotation and stacking order were inspected before implementation.

## Components and behavior

- Added `IndividualsHero` / `IndividualsArtwork` and scoped Individuals styles. Hero: 1384 × 686 at 1512 px, radius 24, surface token #F6FEFF. Separate right-half gradient uses the requested stops and Figma darken blend.
- Exported three exact decorative SVGs from Figma. Top and right shapes retain their 15° Figma rotation (CSS −15°), foreground placement and clipping. Bottom shape is x710.402 in front of the hand, x686.402 behind the woman.
- Hand rendered at 610 × 629, x774/y57; woman 688 × 669, x696/y17. Responsive artwork scales proportionally in a reserved area beneath the copy.
- Extracted shared `useHeroRotation` from the landing-page behavior: initial 3000 ms hold, 200 ms opacity transition, then 3000 ms hold; decode before transitioning, retry failed image loads, static first image for reduced motion. Copy and CTAs do not animate.
- Shared `BrandPill` and informational `DiscoverPrompt` support explicit light/dark tones. Discover is not a link or button; only its icon/background moves.
- `Download` and `BankingLink` share primary/outlined CTA styling. DM Sans retained per the user's confirmation; existing store URLs, banking URLs, dialog and focus restoration preserved.
- Reused landing-page full-width glow/net pattern, navbar, trust cards, onboarding, fraud banner and footer. No additional sections added.
- Hero heading tracking increased once by 2 px on Home, Individuals, Business and About. At desktop: −5.76 → −3.76 px. Accounts heading: −5.12 → −3.12 px. Body/label/button tracking preserved. Greeting removed from Home and Individuals.
- Account cards match 301 × 444 at reference width, 11 px gaps, 32 px padding, 20 px titles and 14 px body copy. Mapped supplied Earn Joy → Regular, Earn Cash → Salary, Earn Overview → Savings, Earn Confidence → Fixed deposits. PNG backgrounds already contain the gradient; no extra tint added. Corrected the former “Investments” title to Figma's “Fixed deposits.”
- Card feature uses the supplied mockup, Figma typography and decorative weight for “verified,” plus shared download CTA.
- Need cash cards use #EBFDFF, #FEF2E9, #F4E9FA, 20 px titles and left-aligned copy. Desktop cards measure approximately 265.667 × 171; height may grow when responsive wrapping needs it.

## Assets

Original files retained. Optimized derivatives preserve transparency.

| Asset                        | Original bytes | Delivered bytes | Delivered dimensions        |
| ---------------------------- | -------------: | --------------: | --------------------------- |
| Earn Joy                     |        732,115 |          35,286 | 602 × 412 WebP              |
| Earn Cash                    |        558,688 |          15,814 | 602 × 412 WebP              |
| Earn Overview                |        418,122 |          12,170 | 602 × 412 WebP              |
| Earn Confidence              |        705,514 |          26,750 | 602 × 412 WebP              |
| Gradient Hand Holding Teerus |        747,943 |          88,510 | 1220 × 1258 WebP            |
| Card Mockup                  |        806,077 |         171,518 | 1286 × 1062 WebP            |
| Green woman with Teerus card |        490,344 |         490,344 | 2064 × 2007 WebP, unchanged |

Three SVG exports: bottom 4,654 bytes; right 4,639 bytes; top 3,680 bytes. Existing optimized net pattern retained. The current project contains `CBN.png` (120 × 95), not a separate `CBA` filename; visually confirmed its artwork says Central Bank of Nigeria. The approved trust assets remain unchanged.

## Validation

- Lint, TypeScript through production build, 11 unit tests, production build and asset/CSP verification passed (8 HTML pages, 77 local assets).
- Added two Individuals integration tests covering 3-second hold / 200 ms dissolve timing, two-image looping, fixed image classes and static reduced-motion behavior. Existing landing-page image-load retry and rotation tests still pass.
- Browser inspected Individuals at 1512, 768, 390 and 320 px: no horizontal overflow or clipped card copy. Both hero images decoded and switched. All three trust messages measured two desktop lines; mobile wraps naturally without clipping.
- Measured desktop hero surface, heading tracking, image geometry, account dimensions, loan colors/dimensions, and verified complete live copy.
- Header navigation and shared heading tracking checked on Home, Business and About; mobile overflow checks passed on those pages at 390 px.
- Download dialog tested by click and Enter; Escape closes it and returns focus. Discover has no interactive element. Banking and store destinations preserved.
- Full Playwright browser suite was not executed; browser checks used the connected in-app browser. Reduced-motion behavior is covered by unit tests and CSS, not browser media emulation.
- Screenshots: `docs/screenshots/individuals-refined-desktop.png`, `individuals-refined-mobile.png`, `individuals-refined-hero.png`.

## Notes

DM Sans intentionally replaces the Figma CTA's Euclid font per the user's explicit choice. Hero/account heading wraps can differ from the original because of the requested +2 px tracking. Mobile trust copy uses more than two lines where needed for readability. No missing required artwork remains. Changes are local; nothing was committed, pushed or deployed.
