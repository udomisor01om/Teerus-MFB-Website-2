# Teerus Journal and download modal

## Implemented

The shared download dialog now uses a dark Teerus panel, brand mark, green accents, iPhone/Android QR selector, official store badges, close control and return action. QR SVGs encode the verified store links directly, including a four-module quiet zone. No third-party QR service, tracking URL or new runtime package is used. Native dialog behavior retains keyboard containment, Escape dismissal and trigger-focus restoration; background scrolling is locked while open.

The Teerus Journal has a featured story, nine sample stories, topic filters, search, progressive loading, linked article pages, article contents navigation, related stories and download CTA. Blog navigation is live in header/footer, with the active state on article routes.

Reference: https://blog.getanchor.co/ — researched the featured lead, categories, author/date metadata, excerpts and article-card structure. The accessible page/index was available for research; its complete visual and article-detail rendering was not inspected. Teerus layouts and sample copy are original, with existing project imagery.

## Content and future CMS

`src/content/blog.ts` contains the typed preview model and adapter functions `getBlogPosts` / `getBlogPost`. Each entry has a slug, category, title, excerpt, date, author, cover, featured flag, reading time and structured content sections. Replace the adapter with CMS queries later; the view components are separate. Approved rich text can be mapped into these section fields or a dedicated renderer. Do not pass unchecked raw CMS HTML into React.

Articles are marked as sample content and have explicit noindex/nofollow metadata. Preview articles are intentionally omitted from the sitemap. On editorial launch: replace sample copy and metadata, confirm image permissions/alt text, connect the CMS, enable indexing and add approved posts to the sitemap. Current static article routes are generated at build time; a CMS publish webhook should trigger a rebuild unless on-demand rendering is configured later. Unknown slugs return 404.

No newsletter form is shown because no subscription destination is configured. No email addresses are collected or fake success messages displayed.

## Verification

- Production build and CSP/assets validation pass: 18 HTML pages, including blog listing and nine articles.
- 23 unit tests pass, including filtering, load-more, empty-search recovery, article slug lookup, nested active navigation, QR selection, destination links and dialog focus restoration.
- Built HTML checked for preview noindex, working internal article URLs and contents anchors across all ten blog pages.
- In-app browser: desktop and 320px modal inspected, Android QR selection checked, Escape closes and returns focus. Blog search, filters, article navigation, return link and load-more verified.
- Listing and article measured at 320, 375, 390, 430, 700, 701 and 1440px: no document horizontal overflow.
- Screenshots: `docs/screenshots/download-modal-teerus.jpg`, `teerus-blog-desktop.jpg`, `teerus-blog-article.jpg`.
- Physical-phone QR scanning and iOS Safari device testing remain unverified.

No commits, push or deployment performed by the assistant.
