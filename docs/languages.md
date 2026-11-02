# Website languages and English-only fallback

English is the original source. Yoruba (`yo`), Hausa (`ha`) and Igbo (`ig`) are manually maintained drafts in `src/i18n/messages.ts` and `src/i18n/trial-copy.ts`. Fluent speakers should review the text before publication, especially banking terminology. There is no external translation provider, API key or automatic translation of customer data.

## Preview and rollback

Development enables the selector by default. Run the site locally and choose a language beside Login; desktop and mobile-menu controls use a 24px gap. The choice persists in browser storage across pages and reloads. Selecting English restores original copy immediately.

Set `NEXT_PUBLIC_ENABLE_TRANSLATIONS=false` and restart development (or rebuild/redeploy Netlify) to hide both selectors and force English for everyone, including visitors with a saved language. This keeps all other site updates. No source revert or rebuild of components is needed. Next.js embeds this public flag at build time, so an existing deployment needs a new build to apply a changed value.

To enable in a preview deployment, set `NEXT_PUBLIC_ENABLE_TRANSLATIONS=true` before building. Production defaults to English-only until explicitly enabled. Nothing in this implementation publishes or deploys the site.

## Scope and CMS boundary

Marketing pages, shared navigation/footer, product and loan copy, testimonials, download controls, and the blog interface use local dictionaries. Company names, personal names, addresses, app-store branding and phone-screen artwork retain their originals.

CMS articles, excerpts, categories, URLs, media, metadata and API requests remain authored by the CMS. The language selector does not change the CMS request or post data. Article pages and cards identify English text where appropriate and show a translated original-language notice. Add article translations to the CMS later, as reviewed editorial versions, rather than duplicating posts in these dictionaries.

Legal-document bodies and supplied biographies remain English with availability notices, as agreed for this version. The page navigation remains translated.

There are no new locale routes, redirects, sitemap entries or translated SEO claims. English remains the indexed/server-rendered source. React renders translations after hydration from the visitor's preference; content nodes are not rewritten by a DOM translation script.

## Maintaining copy

Wrap rendered website strings in `<T>` or call `useText()` inside client controls. Dictionary keys are the exact English copy with outer whitespace removed. Add each new phrase in all three languages. Unmapped text falls back to its complete English source rather than blanking content. Keep inline emphasis fragments in reading order and review whole sentences in the browser. Do not translate URLs, identifiers, CMS fields, names or account information.

Tests cover existing marketing data, switching, original English fallback, invalid languages and disabling with a previously saved preference.
