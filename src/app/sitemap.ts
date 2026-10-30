import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";
import { listPosts } from "@/lib/cms/client";
export const dynamic = "force-dynamic";
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const routes: MetadataRoute.Sitemap = [
    "",
    "/individuals",
    "/business",
    "/about",
    "/blog",
    "/privacy-policy",
    "/terms-and-conditions",
  ].map((route) => ({ url: `${siteConfig.canonicalOrigin}${route}` }));
  // Traverse every page while healthy. On an outage, preserve the marketing sitemap.
  const seen = new Set<string>();
  let page = 1;
  try {
    for (;;) {
      const result = await listPosts({ page, limit: 100 });
      for (const post of result.docs) {
        if (post.seo?.noIndex || seen.has(post.slug)) continue;
        seen.add(post.slug);
        routes.push({
          url: `${siteConfig.canonicalOrigin}/blog/${encodeURIComponent(post.slug)}`,
          ...(post.updatedAt && !Number.isNaN(Date.parse(post.updatedAt))
            ? { lastModified: new Date(post.updatedAt) }
            : {}),
        });
      }
      if (!result.hasNextPage) break;
      page = result.nextPage!;
    }
  } catch (error) {
    console.error(
      "[CMS sitemap]",
      error instanceof Error ? error.message : "Unavailable",
    );
    return routes.slice(0, 7);
  }
  return routes;
}
