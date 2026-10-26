# About Us refinements — 26 October 2026

Reference: https://www.figma.com/design/W1wYewAKixvMwC1acUsq20/Teerus-MFB-Marketing?node-id=5348-49410

## Changes

- Isolated About styling in About.module.css and markup in AboutSections.tsx, exported through the existing Site.tsx API.
- Restored the dark hero glow/artwork, purpose pill, two-column heading/body, approved −3.76 px hero tracking, and 748 × 427 / 440 × 427 photograph frames with a 22 px gap.
- Restored the pale story section, icon-free pill, balanced two-line dark DM Sans heading, and all three original paragraphs.
- Added PortraitStrip.tsx: nine individually positioned teal luminosity portraits, two 1521 px groups, a 24-second linear repeating animation, image-decode gating, unobtrusive pause/resume, decorative accessibility treatment, and static reduced-motion CSS.
- Restored the left-aligned values header, dark shared download button variant, three-plus-two grid, icon tiles, card typography and spacing.
- Restored seven complete bordered team cards, individual portrait positioning, identity icon, three/two/one-column responsive grids, and centered final card.
- Shared additions are opt-in: BrandPill's icon prop defaults to true; the dark CTA variant is used only where requested. Existing navigation, onboarding, fraud banner and footer retained.
- All artwork uses local files. Original image sources retained. Below-fold team photos remain lazy-loaded; moving portraits load eagerly before motion starts.

## Asset optimization

18 WebP derivatives: **28,711,388 → 1,682,234 bytes**, a **94.1% reduction** (28.71 MB → 1.68 MB). Quality 92; transparency retained where needed. Dimensions below are the optimized derivatives, sized for their displayed use. Added the exact 20 px team identity SVG and the 33,532-byte upper fade PNG from Figma.

| Source basename | Original bytes | WebP bytes | Output dimensions |
| --- | ---: | ---: | --- |
| about-team-group | 1,061,685 | 73,804 | 1024 × 683 |
| about-colleagues | 927,967 | 115,982 | 1024 × 687 |
| team-chukwuemeka-osondu | 569,405 | 56,910 | 732 × 1024 |
| team-esang-ekarika | 545,093 | 68,476 | 683 × 1024 |
| team-daniel-adekanye | 1,033,928 | 100,324 | 800 × 907 |
| team-nwamaka-chukwudebe | 330,402 | 37,494 | 572 × 1024 |
| team-adebisi-ilo | 446,189 | 46,480 | 748 × 1024 |
| team-ayeni-felicia | 963,511 | 124,096 | 800 × 1071 |
| team-okereafor-amarachi | 817,017 | 88,920 | 800 × 800 |
| portrait-one | 759,548 | 106,350 | 687 × 1024 |
| home-market-woman | 1,518,546 | 62,626 | 950 × 637 |
| investment-customer | 9,095,397 | 196,298 | 950 × 1261 |
| portrait-four | 543,238 | 56,008 | 950 × 637 |
| business-current-customer | 4,704,576 | 53,032 | 950 × 633 |
| portrait-six | 3,050,048 | 253,542 | 950 × 1425 |
| portrait-seven | 1,233,499 | 88,626 | 1350 × 900 |
| portrait-eight | 672,400 | 95,594 | 950 × 717 |
| portrait-nine | 438,939 | 57,672 | 1440 × 720 |

## Validation

- TypeScript and ESLint passed; existing 11 unit tests passed.
- Production static build passed; verifier checked 8 prerendered HTML files, 79 local assets and CSP hydration hashes.
- Browser checked at 1512, 1200, 768, 390 and 320 px. No document horizontal overflow or overflowing heading/body text in these checks.
- At 1512 px: purpose pill y=245, photo row y≈534, photo height 427; team card width≈385.33 and height 360; track width 3042 with 24-second running animation.
- Pause/resume toggled successfully. Same-page About navigation returned to scroll position zero.
- Desktop and mobile full-page screenshots inspected, including portrait visibility and complete team identities. Reduced-motion CSS reviewed; OS-level reduced-motion emulation was not available through the connected browser.

## Editorial and fidelity notes

- DM Sans retained for CTA labels per the user's explicit choice, overriding the brief's Euclid reference.
- “Paid monthly or earning daily, there is a Teerus account for you” is preserved as requested, but its relevance beneath “What we stand for” needs editorial review.
- The team icon has no Figma interaction or supplied profile destination. It remains decorative, without invented links or biographies.
- Nwamaka's Figma image transform alters its aspect ratio. The website preserves the original portrait proportions and uses an individually adjusted crop; its framing consequently differs slightly from the reference.
- No commit, push or deployment performed.

## Follow-up: portrait corrections and biography overlays

Supersedes the earlier decorative-icon and Nwamaka crop notes above.

- Replaced the first hero image with the user's `images/TeerusTeam.webp` (2244 × 1281, 836,250 bytes). It matches the 748 × 427 frame exactly at one-third scale, with no aspect-ratio change.
- Corrected Nwamaka's elongated export using the reference's vertical correction and individual positioning, in both the card and overlay.
- Removed the visible carousel pause icon. A text pause control is available only on keyboard focus; reduced-motion behavior remains static.
- All seven eye icons now open native modal biography dialogs, styled with a pale green portrait panel, DM Sans text, rounded corners, and a dimmed/blurred backdrop. Each shows its own name, role, portrait, and clearly marked temporary profile content.
- Added TeamBiography.tsx and TeamBiography.module.css. No fabricated qualifications or career claims were added.
- Verified all seven dialogs open, close-button dismissal, Escape dismissal and focus restoration to the original trigger. Checked mobile layout at 390 and 320 px; narrow-screen content scrolls inside the dialog without horizontal overflow.
- Typecheck, ESLint, all 11 existing tests and production build passed after this follow-up.
