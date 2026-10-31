import type { Metadata } from "next";
import { BlogHeader, BlogImage, BlogBanner } from "@/components/Blog";
import { BlogListing } from "@/components/BlogListing";
import { BlogUnavailable } from "@/components/BlogUnavailable";
import { PageLink } from "@/components/PageLink";
import { Footer } from "@/components/Site";
import { formatBlogDate } from "@/content/blog";
import { cmsConfig, listPosts } from "@/lib/cms/client";
import { postCard } from "@/lib/cms/presentation";
import s from "@/components/Blog.module.css";
export const dynamic = "force-dynamic";
type ListingProps = { searchParams: Promise<{ page?: string }> };
function listingPage(value?: string) {
  const page = Number(value || 1);
  return Number.isSafeInteger(page) && page > 0 ? page : 1;
}
export async function generateMetadata({
  searchParams,
}: ListingProps): Promise<Metadata> {
  const page = listingPage((await searchParams).page);
  let unavailable = false;
  try {
    await listPosts({ page, limit: 12 });
  } catch {
    unavailable = true;
  }
  return {
    title: "The Teerus Journal",
    description: "Stories, ideas and everyday possibilities from Teerus.",
    alternates: { canonical: page === 1 ? "/blog" : `/blog?page=${page}` },
    ...(unavailable ? { robots: { index: false, follow: false } } : {}),
    openGraph: {
      title: "The Teerus Journal",
      description: "Stories, ideas and everyday possibilities from Teerus.",
      url: page === 1 ? "/blog" : `/blog?page=${page}`,
    },
  };
}
export default async function BlogPage({
  searchParams,
}: {
  searchParams: Promise<{ page?: string }>;
}) {
  const { page: pageQuery } = await searchParams;
  const requested = Number(pageQuery || 1);
  const page = Number.isSafeInteger(requested) && requested > 0 ? requested : 1;
  let result;
  let base;
  try {
    base = cmsConfig().base;
    result = await listPosts({ page, limit: 12 });
  } catch (error) {
    console.error(
      "[CMS blog]",
      error instanceof Error ? error.message : "Unavailable",
    );
    return <BlogUnavailable href={`/blog?page=${page}`} />;
  }
  const posts = result.docs.map((post) => postCard(post, base));
  const featured = page === 1 ? posts[0] : undefined;
  return (
    <>
      <main id="main-content">
        <div className={s.intro}>
          <BlogHeader />
          <div className={s.hero}>
            <span className={s.eyebrow}>THE TEERUS JOURNAL</span>
            <h1>
              Everyday stories.
              <br />
              <em>Extraordinary possibilities.</em>
            </h1>
            <p>
              For your money, your business, and everything you’re building.
            </p>
          </div>
          {featured && (
            <div className={s.feature}>
              <PageLink
                href={`/blog/${encodeURIComponent(featured.slug)}`}
                className={s.featureLink}
              >
                <BlogImage post={featured} priority />
                <div className={s.featureCopy}>
                  <span className={s.featureLabel}>
                    IN THE SPOTLIGHT <span aria-hidden="true">↗</span>
                  </span>
                  <div className={s.meta}>
                    <span>{featured.category}</span>
                  </div>
                  <h2>{featured.title}</h2>
                  <p>{featured.excerpt}</p>
                  <div className={s.featureBottom}>
                    <span>
                      {featured.author}
                      <small>{formatBlogDate(featured.date)}</small>
                    </span>
                    <span className={s.read}>Read story ↗</span>
                  </div>
                </div>
              </PageLink>
            </div>
          )}
        </div>
        {posts.length ? (
          <>
            <BlogListing key={page} posts={posts} />
            <p className={s.pageNote}>
              Search and topic filters apply to stories on this page.
            </p>
          </>
        ) : (
          <section className={s.library}>
            <div className={s.empty}>
              <h2>
                {page > 1
                  ? "No stories on this page."
                  : "New stories are on their way."}
              </h2>
              <p>
                {page > 1
                  ? "Return to the latest stories."
                  : "Check back soon for the latest from Teerus."}
              </p>
              {page > 1 && <PageLink href="/blog">Latest stories</PageLink>}
            </div>
          </section>
        )}
        {(result.hasPrevPage || result.hasNextPage) && (
          <nav className={s.pagination} aria-label="Journal pages">
            {result.hasPrevPage && (
              <PageLink href={`/blog?page=${Math.max(1, page - 1)}`}>
                ← Previous page
              </PageLink>
            )}
            <span>
              Page {page} of {result.totalPages}
            </span>
            {result.hasNextPage && (
              <PageLink href={`/blog?page=${result.nextPage}`}>
                Next page →
              </PageLink>
            )}
          </nav>
        )}
        <BlogBanner />
      </main>
      <Footer />
    </>
  );
}
