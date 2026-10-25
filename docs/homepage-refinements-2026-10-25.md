# Homepage refinement review — 25 October 2026

## Implemented

- Hero through Built on Trust: `#F6FEFF` background, 24 px bottom corner radii. The hero artwork has an isolated stacking context; the upper pattern sits beneath the person images and foreground copy.
- Hero image loading retries after an interrupted first-image decode instead of abandoning rotation. The existing 3-second hold / 200 ms dissolve remains, with reduced-motion support.
- Product carousel: 306 × 563 px desktop cards, 32 px gaps, reference gradients and crops, inset clipping, one-card autoplay after 3 seconds at rest, seamless wrapping, touch/native horizontal scrolling, keyboard arrows, hover/focus/drag suspension, and pause/resume control. Narrow phone cards fit their available width so text is not clipped. The previously empty Esusu asset was a 1 × 1 PNG; it now uses the actual Figma phone export.
- Loan services: supplied gradient Teerus SVG, separate 89 px transparent-to-opaque `#EBFDFF` overlay at desktop y=197, foreground heading at y=264. Cards use Figma's opaque near-white `#F9FEFF`, 24 px radii, 32 px padding, supplied personal/business icons, and correct semantic icon assignment. Card headings are **16 px**, reduced once from the **20 px Figma baseline**, as requested; main heading remains 64 px at reference width. Shared SME financing content replaces LPO financing. Four identical groups keep both row edges populated while translating exactly one group per cycle; duplicate groups are hidden from assistive technology. No visible loan pause CTA. Reduced motion makes the original groups manually scrollable.
- Onboarding: exact per-label Figma gradients and uppercase DM Sans STEP labels; 28 px icons inside 64 px containers; 56 px gaps between step items; 1 px connector with 5/5 px dashes, `#B5E2DE` at 20% opacity, behind the icons. New hand photograph. Figma's circular lettering is editable, so the seal uses live circular DM Sans lettering reading “Bank the way you like” with the original exported symbol. Clockwise 60-second rotation keeps its center fixed and stops with reduced motion.
- Testimonials: content/layout retained, border changed to 1 px `rgba(225,235,238,.4)`. Product and testimonial navigation share one component, supplied SVG arrows, 48 px buttons, 16 px spacing, interaction states, and seamless wrapping in both directions. Testimonials retain manual navigation; product autoplay is not imposed on them.
- Fraud banner: supplied background has no embedded copy/icon. Live warning text and original warning symbol remain; uppercase pill uses `#E9B355`, 10 px/600 DM Sans, .1 px tracking, 4 × 8 px padding, 6 px radius.
- Footer: three desktop heading lines with Teerus on a separate final line; correct green-gradient app CTA, divider and outlined surround. White interior reorganized into brand/regulatory information, navigation, contact and download groups. Existing destinations, address, telephone, emails, badges, and legal copy retained. Link targets are at least 44 px high. No social destinations were configured in the existing footer; none were invented.

## Shared pages

- Header/navigation and regulatory Trust components retain the previous shared corrections.
- Loan-card treatment: homepage, Individuals, Business. SME replaces the same shared financing item on Business; unrelated page wording is not globally replaced.
- Onboarding/photo/seal: homepage, Individuals, Business and About, preserving Business-specific copy.
- Fraud banner/footer/CTA: homepage, Individuals, Business, About, Privacy Policy, Terms and Conditions and 404.

## Assets

Originals are retained. Raster derivatives are WebP; supplied vectors stay SVG. Dimensions are reserved in layout.

| Source                           | Source bytes | Delivered derivative bytes | Dimensions / notes                          |
| -------------------------------- | -----------: | -------------------------: | ------------------------------------------- |
| Savings phone PNG                |      114,856 |                     15,084 | 456 × 929                                   |
| Regular phone PNG                |      270,350 |                     26,060 | 455 × 924                                   |
| Esusu isolated Figma PNG         |       60,423 |                     10,532 | 228 × 462; replaces invalid 1 × 1 source    |
| Fixed-deposit customer PNG       |    1,545,613 |                    157,656 | 683 × 1024                                  |
| Salary-account customer PNG      |    1,406,945 |                    120,598 | 683 × 1024                                  |
| Teerus-card customer PNG         |      997,290 |                     52,592 | 687 × 1024                                  |
| Savings patterned background PNG |       46,856 |                      2,304 | 306 × 563                                   |
| Light patterned background PNG   |       54,471 |                      2,444 | 306 × 563                                   |
| Hand Holding Teerus App.webp     |      674,668 |                    163,692 | 2268 × 2643 → 1512 × 1762, 2× desktop panel |
| Fraud Warning Banner.png         |      319,829 |                      9,828 | 4536 × 501 → 3024 × 334, 2× desktop banner  |
| Business.png                     |       21,320 |                  unchanged | 132 × 120, alpha; displayed 44 × 40         |
| Individual Illustration.png      |       13,252 |                  unchanged | 105 × 120, alpha; displayed 35 × 40         |
| Teerus Gradient Vector.svg       |       16,543 |                  unchanged | 683 × 181, alpha                            |
| Seal center symbol SVG           |            — |                      1,172 | Original Figma vector                       |

Esusu's available export is 1× its displayed dimensions. It is valid and readable, but a higher-resolution source would improve sharpness on high-density screens. It has not been artificially upscaled.

## Deployment handling

The private Netlify deployment loads all four hero images, but its app-download dialog also fails to open. Local production rotation and the dialog work, so this is broader than an absent image file. The exact deployed response-header mismatch could not be directly captured through the authenticated browser.

Added Netlify's official `@netlify/plugin-csp-nonce` (pinned 1.6.2) to authorize the final response's scripts after hosting transformations while preserving CSP. Enforcement is enabled; unsafe-inline, unsafe-eval, broad HTTP and HTTPS script allowances are explicitly disabled. Existing local production hash checks remain. See [Netlify's CSP guidance](https://docs.netlify.com/manage/security/content-security-policy/) and [plugin documentation](https://github.com/netlify/plugin-csp-nonce).

This is a deployment compatibility fix for the suspected startup cause, **not a verified live-site resolution**. Commit and push the changes, then verify hero rotation and the Download dialog on the resulting Netlify deployment. No changes have been pushed or deployed by the agent.

## Verification

- Lint, TypeScript and all 9 unit tests passed; production build and CSP hash validation.
- Build verification now checks nested/URL-encoded image paths and rejects missing or 1 × 1 image artwork.
- Browser checks at 1512 px reference desktop, 768 px tablet, and 390/320 px phone widths: no homepage overflow; visual checks of products, loans, onboarding, fraud banner and footer.
- Production browser: hero progressed through different people; app-download dialog opens/closes; all six product cards have decoded images; next controls crossed Teerus card → Savings and continued with consistent card spacing. Autoplay resumed with the track in view and focus/pointer outside the carousel.
- Shared pages checked at 390 px (Individuals, Business, About, Privacy Policy, Terms) and at 768 px (Individuals, Business, About), without horizontal page overflow.
- Development accessibility audit reported zero violations on the homepage during desktop inspection.
- Full Playwright multi-browser suite was not executed: browser binaries are not installed in this workspace. Updated its expectations for loop offsets and removal of the visible loan-pause button.
