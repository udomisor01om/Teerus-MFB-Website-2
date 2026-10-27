# Mobile refinements — 27 October 2026

Implemented at the existing 700px mobile breakpoint. Navigation fixes cover its existing menu range through 1000px.

- Shared HeroCTA layout: equally sized stacked buttons on Home, Individuals, and SMEs, with a narrow-screen text adjustment at 360px.
- Home foreground people enlarged 4%, independently of market and decorations; original 3000ms hold/200ms dissolve unchanged.
- Top decoration clipped and shifted within its wrapper on all three heroes; original SVG files unchanged. SME shapes reduced independently of photos.
- Shared Trust component: mobile single-card carousel, 4000ms hold and 300ms transition, configurable props, seamless cloned end cards, pagination, touch gestures, interaction/focus/offscreen/document-hidden pauses and reduced-motion manual mode. Desktop retains three cards.
- Product navigation is a single instance after the track in DOM; desktop grid keeps its header position.
- Mobile loan list contains all six distinct offerings in individual/business order. Explicit categories follow the existing descriptions; personal and working-capital Micro loans both retained. Desktop moving rows unchanged and animation disabled when hidden on mobile.
- Menu trigger explicitly uses #061C22, including WebKit text fill and native appearance reset. Active gradient underline aligns with link text.
- About values CTA is a single instance after all five cards in DOM, positioned in the header row on desktop.

## Verification

In-app browser measured Home, Individuals, SMEs, and About at 320, 375, 390, 430, 700, 701, and 1440 CSS pixels. No page-level horizontal overflow found. Both hero buttons have identical mobile widths on all three applicable pages. Home controls appear 24px below the carousel on mobile and above on desktop. About values DOM order ends with the download CTA. Open About menu visually checked: underline aligned, trigger computed color rgb(6,28,34). Trust pagination and automatic advancement observed in browser.

Visual previews inspected Home girl/farmer, both Individuals states, and SME women artwork at 390px. Red top decoration is clipped in these views. Exhaustive frame-by-frame inspection of every hero variant and crossfade midpoint was not completed. Physical-device swiping and iOS Safari remain unverified; touch gesture handling is covered by component tests.

19 tests pass, including trust timing/loop, focus pause, reduced-motion manual navigation, horizontal versus vertical gestures and delay reset. Existing hero timing tests pass. ESLint and production build pass; production validation confirms 8 HTML pages, 84 assets and CSP hydration hashes.

No publishing, committing or pushing performed.
