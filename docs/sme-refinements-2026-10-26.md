# For SMEs refinement — 26 October 2026

## Implementation

- `src/app/business/page.tsx` now composes dedicated SME components from `BusinessSections.tsx`, `BusinessArtwork.tsx`, and `Business.module.css`.
- Reuses corrected Header, BrandPill, DiscoverPrompt, Download, BankingLink, Trust and Footer. Shared global components and approved lower-page redesigns were not modified.
- Dark 1384 × 686 desktop hero; green MSME pill; 639 px heading with −3.76 px tracking; cleaned paragraph; green download and visible outlined start CTA.
- Shared full-width glow/pattern uses orange-left, green-right approved artwork. Discover remains informational with only its arrow container animated.
- Separate market/shop photo geometry, common green darken overlay, one dark transition overlay whose width follows the variant, three exact Figma SVG decorations. Copy and controls do not rotate.
- The market photo remains an opaque base; the shop photo fades over it. This avoids the dark midpoint produced when both photographs become translucent over the dark hero background. Shared decoding/rotation hook: initial hold 3000 ms; subsequent changes 3200 ms apart including the 200 ms dissolve. Static under reduced motion.
- Business account header and 2 × 2 cards, 269 px artwork slots at the reference width, individually positioned luminosity portraits, unchanged-color interface artwork.
- Capital header with a dark, icon-free Apply for loan link above three cards and exact money SVGs. **User confirmed destination: https://onlinebanking.teerusbank.com/**. Preserved SME financing wording.
- Dedicated savings section with rate panel and compact three-step strip, approved app photograph and separate soft-light mask; no store badges or rotating medallion in this section.
- DM Sans CTA labels retained per the user's previously confirmed choice, overriding the brief's Euclid reference.

## Figma inspection and assets

File `W1wYewAKixvMwC1acUsq20`; inspected page 5434:10386 and high-fidelity contexts for 5434:10468, 5434:11069, 5434:10490, 5434:10691 and 5434:10609. Both hero screenshots were inspected. Source layers verified directly:

- `5302:15902`: two-women-are-looking-phone-while-one-them-is-holding-box 1; 1056 × 686 layer, original bitmap 1024 × 574, crop matrix confirmed.
- `5302:15905`: medium-shot-man-repairing-fashion-goods 1; 1032 × 688 layer, original bitmap 1024 × 683.
- `5302:13227`: green gradient overlay, 657 × 686, DARKEN, full layer opacity, mirrored horizontally as in generated design context.

Downloaded photo originals and overlay into `public/assets/sme-originals/`. Production files are local WebP derivatives. The three decorations and three colored money icons remain SVGs. Reused matching account graphics and approved savings photograph. PNG originals are retained.

| Asset | Source dimensions | Production dimensions | PNG bytes | WebP bytes |
| --- | --- | --- | ---: | ---: |
| sme-hero-market-women | 1024 × 574 | 1024 × 574 | 1,223,096 | 178,506 |
| sme-hero-shop-owner | 1024 × 683 | 1024 × 683 | 1,199,922 | 117,602 |
| sme-green-overlay | 657 × 686 | 657 × 686 | 530,630 | 189,406 |
| business-current-customer | 4096 × 2731 | 900 × 600 | 4,704,576 | 57,040 |
| virtual-account-customer | 4096 × 2713 | 900 × 596 | 6,848,631 | 66,504 |
| business-payroll-account | 538 × 560 | 538 × 560 | 101,521 | 9,916 |
| business-transfer | 538 × 560 | 538 × 560 | 132,085 | 17,436 |

Hero production filenames: `sme-hero-market-women.webp`, `sme-hero-shop-owner.webp`. Responsive 640 px sources: `sme-hero-market-women-640.webp` (640 × 359; 88,232 bytes), `sme-hero-shop-owner-640.webp` (640 × 427; 62,246 bytes). These are selected by a mobile picture source; originals were used directly for each conversion rather than recompressing derivatives.

The source photos are only 1024 px wide. No upscaled export was generated or claimed as high-resolution. At the full desktop geometry the women's cropped bitmap needs roughly 1224 CSS px, so true 2× sharpness is unavailable without a better original. The shop image is approximately native resolution at desktop 1×. Before/after source-versus-WebP contact sheets were visually inspected at 700 px per image; faces, clothing and shop detail remain recognizable without obvious new compression damage. This is an asset check, not a rendered-page check.

## Verification

- Typecheck and ESLint passed.
- 14 unit tests passed, including 3 new SME tests for exact hold timing, waiting for photo decode, and static reduced-motion state.
- Production build and static/CSP verifier passed.
- Responsive CSS covers narrower desktop, tablet and mobile layouts with content-driven heights; this has **not** been visually verified in the live browser.
- Browser preview access was rejected by the browser URL security gate. No alternate browser surface or workaround was attempted.
- Consequently both live hero states, transition midpoint, mobile crops, text wrapping/overflow, CTA interactive states and full-page pixel comparison remain unverified. No live-preview screenshots or visual-pass claim are included.
- Existing shared footer links/contact/legal copy and verified store destinations are preserved in code. No social destinations were invented.

## Pending editorial review

- Account-related supporting sentence in Capital remains as supplied, despite its relevance being uncertain.
- Micro loans and Inventory financing retain the duplicated supplied descriptions.
- Savings rate and financial wording retained without alteration apart from requested punctuation.

No commit, push or deployment performed.
