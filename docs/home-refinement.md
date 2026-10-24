# Home navigation and hero refinement

## Design and scope

Inspected Figma file W1wYewAKixvMwC1acUsq20: hero variants 5321:18659, navbar 5263:46168, glow 5263:46159, net pattern 5400:7770. Inspected motion data: no hero/scroll keyframe tracks were supplied (the returned tracks belong to the out-of-scope loan cards).

User confirmed using the supplied WebP cutouts, the supplied lower decorative SVG, and DM Sans instead of Euclid Circular A. This is an intentional typography deviation. DM Sans now includes the optical-size axis and real italic, with opsz 14 on the home hero/nav.

The home hero is isolated in HomeHero.tsx / HomeHero.module.css; HeroPeople.tsx handles image readiness and timing. Shared Controls.tsx updates navbar/logo, banking links and the store divider. Site.tsx selects the home hero. Site.module.css adds the full-width home background and shared navigation styling. globals.css adds semantic surface/gradient/font tokens. site.ts holds confirmed destinations and navigation labels. Unit tests cover destinations, keyboard menu behavior, image readiness, timing and reduced motion; the existing e2e navigation label expectations were updated.

## Assets

All supplied source originals are retained. The requested net-pattern rename is the only original filename change. WebP derivatives retain alpha and are 2× the desktop display size, encoded at quality 90 / alpha quality 100. Images are displayed without further Next.js recompression. Existing PNG logo is already 3× its 133×39 display size. The supplied market JPG is a prepared crop; reused unchanged, without adding a duplicate green tint. The supplied SVG lower shape is already clipped to 198×112; placed at the visible portion of Figma's 197.597×179 box with its bottom 67px outside the hero, without stretching the SVG.

| Asset                 | Format / dimensions                     | Original bytes | Served bytes |
| --------------------- | --------------------------------------- | -------------: | -----------: |
| Girl                  | Transparent WebP, 2012×2492 → 1006×1246 |        203,198 |      142,176 |
| Mechanic              | Transparent WebP, 1704×2524 → 852×1262  |        209,280 |      140,144 |
| Tailor                | Transparent WebP, 2192×2448 → 1096×1224 |        267,698 |      179,066 |
| Farmer                | Transparent WebP, 2632×2552 → 1316×1276 |        374,496 |      238,482 |
| Market Scene.jpg      | Opaque JPEG, 1008×2058                  |         88,558 |    unchanged |
| Teerus Logo.png       | Transparent PNG, 399×117                |         20,745 |    unchanged |
| Bird Icon.svg         | SVG, 49×28 including export padding     |          5,166 |    unchanged |
| Decorative Shape.svg  | SVG, 198×112 visible export             |          4,581 |    unchanged |
| arrow-square-down.png | Transparent PNG, 16×16                  |            538 |    unchanged |
| net-pattern.svg       | SVG, 1512×281, embedded mask            |        320,250 |    unchanged |

Cutouts total: 1,054,672 → 699,868 bytes (33.6% smaller). The SVG pattern is relatively large because it includes embedded image-mask data. Kept intact to preserve its supplied appearance and vector wrapper; further reduction would require altering that embedded mask. Figma glow SVG is 862 bytes and is used at its inspected proportions, scaled with viewport width.

## Behavior and verification

- Reference viewport 1512px: hero 1384×686 at x64/y163; four images' actual rendered sizes and offsets match provided measurements within CSS subpixel rounding.
- Checked browser widths 320, 390, 768, 1024, 1280, 1512: no horizontal page overflow. Responsive layouts are implementation adaptations; no matching responsive Figma frames were supplied.
- People: initial 3000ms hold, then 200ms opacity dissolve followed by 3000ms hold. Next image must decode successfully before transition; failures retain the current person and retry. Positions remain fixed. Reduced motion renders the first person and removes transitions.
- Discover is plain non-focusable text and an aria-hidden icon. Only icon/background move: 6px, 2800ms ease-in-out loop, with pauses. Reduced motion disables this animation.
- Existing download dialog destinations preserved. Browser checked opening, closing with Escape and focus returning to trigger; both store badges render.
- Unit tests: 7 passed, including timing, delayed image decode and static reduced-motion behavior. Production build passed, including CSP hash validation and static route checks. TypeScript and ESLint passed.
- Browser accessibility audit reported zero violations at the reference desktop viewport. Full browser-engine/OS coverage is not claimed. Reduced motion was verified by unit tests and CSS rules, not an OS preference toggle in the in-app browser.

This pass does not claim pixel-identical parity: CTA font deliberately differs per user direction; supplied market/icon exports differ in packaging from Figma raw layers; mobile/tablet layouts are adaptations.
