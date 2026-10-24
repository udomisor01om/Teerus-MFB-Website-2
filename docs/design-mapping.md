# Design mapping

Source: [Teerus MFB Marketing](https://www.figma.com/design/W1wYewAKixvMwC1acUsq20/Teerus-MFB-Marketing?node-id=5263-46067), page `5263:46067`. Access was restored and all four desktop frames were extracted. Reference desktop width: 1512px.

| Route          | Frame        | Principal sections                                                                                                                             |
| -------------- | ------------ | ---------------------------------------------------------------------------------------------------------------------------------------------- |
| `/`            | `5263:46068` | Final hero instance `5321:18664`; trust `5263:46211`; products `5263:46232`; loans `5316:18285`; steps `5263:47011`; testimonials `5263:46069` |
| `/individuals` | `5295:8525`  | Hero Default1 `5295:8607`; accounts `5295:8629`; cards `5295:9024`; loans `5295:9135`                                                          |
| `/business`    | `5311:17219` | Hero `5311:17301`; accounts `5311:17323`; capital `5311:17523`; growth `5311:17442`                                                            |
| `/about`       | `5348:49410` | Purpose `5348:49786`; photos `5348:49807`; story `5348:49411`; values `5348:49509`; team `5348:49563`                                          |
| Shared         | —            | Fraud `5263:47049`; footer `5263:47058`, final panel `5333:18805`                                                                              |

Sparse parent contexts were expanded through child extraction. Overlapping variants were resolved against rendered Figma screenshots. Phone/card/payroll composites were exported as original artwork; whole-page screenshots are not used as page implementations.

## Foundations and motion

- DM Sans variable for body/headings; Sansita Swashed Light for accented words. Locally bundled Fontsource fonts with their package licenses.
- Euclid Circular A, used for some source buttons, was not supplied with a webfont license. Those buttons use DM Sans; this is a documented fidelity deviation.
- Ink `#061c22`, muted `#38494e`, paper `#fdffff`, pale blue `#ebfdff`, green gradient `#0fa294 → #06b488`.
- Desktop headline 72px; section title 64px; title tracking approximately -0.08em. Mobile sizes adapt fluidly and sections stack.
- Home loan rows: opposing 80-second linear loops, 1664px desktop cycle (four 392px cards + gaps); responsive mobile cycle preserves timing.
- About portraits: 24-second linear loop, 1521px cycle. Both motion sections pause on hover/focus and manual pause; reduced motion removes animation and duplicate loops.
- Carousels have no autoplay. Native touch scrolling, scroll snapping, buttons and arrow keys are supported.

## Deliberate adaptations and open review points

Mobile/tablet compositions are adaptations because only desktop reference frames were supplied. Download buttons open a native modal with both verified stores. Disabled banking actions show the missing-destination state. Footer adds Terms and About links for navigation completeness. Unverified social destinations are omitted instead of guessed. Legal copy is visibly pending.

The personal hero's source bitmap has a deliberately transformed aspect ratio; its final Figma geometry is preserved. Google Play's source badge is vertically inverted in the exported SVG and corrected with its source-equivalent CSS transform. Artwork mappings are in `asset-provenance.json`.

Axe-driven contrast fixes darken the personal hero label. Full pixel-diff sign-off remains open; screenshots in `docs/screenshots/` are review artifacts, not approved golden baselines. Regulatory claims, loan limits, rates, product wording, testimonials and all team titles require bank review before publication.
