import { T } from "@/i18n/Language";
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
            <span className={s.eyebrow}>
              <T>{"THE TEERUS JOURNAL"}</T>
            </span>
            <h1>
              <T>{"Everyday stories. "}</T>
              <br />
              <em>
                <T>{"Extraordinary possibilities."}</T>
              </em>
            </h1>
            <p>
              <T>
                {
                  "For your money, your business, and everything you’re building. "
                }
              </T>
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
                    <T>{"IN THE SPOTLIGHT "}</T>
                    <span aria-hidden="true">↗</span>
                  </span>
                  <div className={s.meta}>
                    <span>{featured.category}</span>
                  </div>
                  <h2 lang="en">{featured.title}</h2>
                  <p lang="en">{featured.excerpt}</p>
                  <div className={s.featureBottom}>
                    <span>
                      {featured.author}
                      <small>{formatBlogDate(featured.date)}</small>
                    </span>
                    <span className={s.read}>
                      <T>{"Read story ↗"}</T>
                    </span>
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
              <T>
                {"Search and topic filters apply to stories on this page. "}
              </T>
            </p>
          </>
        ) : (
          <section className={s.library}>
            <div className={s.empty}>
              <h2>
                <T>
                  {page > 1
                    ? "No stories on this page."
                    : "New stories are on their way."}
                </T>
              </h2>
              <p>
                <T>
                  {page > 1
                    ? "Return to the latest stories."
                    : "Check back soon for the latest from Teerus."}
                </T>
              </p>
              {page > 1 && (
                <PageLink href="/blog">
                  <T>{"Latest stories"}</T>
                </PageLink>
              )}
            </div>
          </section>
        )}
        {(result.hasPrevPage || result.hasNextPage) && (
          <nav className={s.pagination} aria-label="Journal pages">
            {result.hasPrevPage && (
              <PageLink href={`/blog?page=${Math.max(1, page - 1)}`}>
                <T>{"← Previous page "}</T>
              </PageLink>
            )}
            <span>
              <T>{"Page "}</T>
              {page}
              <T>{" of "}</T>
              {result.totalPages}
            </span>
            {result.hasNextPage && (
              <PageLink href={`/blog?page=${result.nextPage}`}>
                <T>{"Next page → "}</T>
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
