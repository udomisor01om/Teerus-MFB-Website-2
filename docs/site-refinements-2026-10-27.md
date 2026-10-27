# Site refinements

- Removed the product carousel's visible automatic-movement CTA. Hover/focus pauses and reduced-motion handling remain.
- Hid the testimonial scrollbar while retaining arrow and keyboard navigation.
- Replaced SME hero photos with the supplied 1724 × 1372 PNG exports, constrained to the right behind the gradient; originals used directly. Clipping no longer creates an internal scroll container in that hero.
- Replaced Esusu product artwork with images/Esusu Mobile Screen.png (682 × 1386), preserving its aspect ratio.
- Reduced About hero spacing and desktop photo height; full photo row ends at approximately 677 px in a 1366 × 768 viewport, and 731 px at 1440 × 900. Mobile remains content-driven.
- Primary hover/focus uses dark green and white text/icons. Browser computed styles confirmed the hover state.
- Navigation active state uses a rounded surface, heavier text, underline and aria-current. Tablet uses a menu to accommodate the fourth item.
- Added Blog / Soon to header and footer, deliberately inactive until its page is designed.
- Changed the rotating seal's orange outline to #03e8ad.

## Legal migration

Imported all published sections without changing wording:
- https://www.teerusbank.com/privacy-policy — 14 sections, October 2025.
- https://www.teerusbank.com/terms — 26 sections, October 2025.

Correction: the initial terms extraction missed body text stored in div elements. The previous comparison incorrectly compared empty arrays. All 26 terms bodies have now been reimported as 57 paragraphs (26,064 source characters), and the rendered body of each section is compared directly against the source body. A regression check now requires body copy under every heading. Privacy content was unaffected. New layout includes responsive table of contents, document tabs, numbered headings and back-to-top link. Source JSON retains provenance.

The published privacy policy's Contact Us section lists Suite 6, LSDPC Complex, Alaka, Surulere and 08036889755. These differ from the current marketing footer's Itire Road address and 09012411411. Preserved the source legal wording; bank review is needed to reconcile the contact details.

## Verification

ESLint and all 14 unit tests passed. Production export and static/CSP verification passed. Browser checks covered desktop, 1366 × 768 laptop, 768 px tablet menu, and 390 px mobile legal layout; section anchors and exact legal wording were verified. Screenshots are in docs/screenshots.

No commit, push or deployment performed.
