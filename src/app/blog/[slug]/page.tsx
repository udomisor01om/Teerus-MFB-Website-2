import { T } from "@/i18n/Language";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogHeader, BlogImage, BlogBanner, PostCard } from "@/components/Blog";
import { BlogUnavailable } from "@/components/BlogUnavailable";
import { CMSBlocks } from "@/components/CMSBlocks";
import { PageLink } from "@/components/PageLink";
import { Footer } from "@/components/Site";
import { formatBlogDate } from "@/content/blog";
import { getPost, cmsConfig } from "@/lib/cms/client";
import { postCard, articleMetadata } from "@/lib/cms/presentation";
import s from "@/components/Blog.module.css";
export const dynamic = "force-dynamic";
type Props = { params: Promise<{ slug: string }> };
export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  let post;
  try {
    post = await getPost(slug);
  } catch {
    return {
      title: "Journal temporarily unavailable",
      robots: { index: false, follow: false },
    };
  }
  if (!post) notFound();
  return articleMetadata(post, cmsConfig().base);
}
export default async function ArticlePage({ params }: Props) {
  const { slug } = await params;
  let post;
  try {
    post = await getPost(slug);
  } catch (error) {
    console.error(
      "[CMS article]",
      error instanceof Error ? error.message : "Unavailable",
    );
    return <BlogUnavailable href={`/blog/${encodeURIComponent(slug)}`} />;
  }
  if (!post) notFound();
  const base = cmsConfig().base;
  const card = postCard(post, base);
  const headings = post.content.flatMap((block, i) =>
    block.blockType === "heading"
      ? [{ id: `section-${i}`, title: block.text }]
      : [],
  );
  const related = (post.relatedPosts || [])
    .flatMap((item) =>
      typeof item === "object" &&
      item &&
      item._status === "published" &&
      item.slug !== slug
        ? [postCard(item, base)]
        : [],
    )
    .slice(0, 3);
  return (
    <>
      <main id="main-content">
        <BlogHeader />
        <article>
          <header className={s.articleHeader}>
            <PageLink href="/blog" className={s.back}>
              <T>{"← All stories "}</T>
            </PageLink>
            <div className={s.meta}>
              <span>{card.category}</span>
            </div>
            <h1 lang="en">{post.title}</h1>
            <p lang="en" className={s.lead}>
              {post.excerpt}
            </p>
            <div className={s.byline}>
              <span className={s.authorMark} aria-hidden="true">
                <T>{"t. "}</T>
              </span>
              <span>
                {card.author}
                <small>{formatBlogDate(card.date)}</small>
              </span>
            </div>
          </header>
          {card.image && (
            <div className={s.articleCover}>
              <BlogImage post={card} priority />
            </div>
          )}
          <div className={s.articleLayout}>
            <aside className={s.contents}>
              {headings.length > 0 && (
                <>
                  <span className={s.eyebrow}>
                    <T>{"IN THIS STORY"}</T>
                  </span>
                  <nav aria-label="Article contents">
                    {headings.map((heading) => (
                      <a href={`#${heading.id}`} key={heading.id}>
                        {heading.title}
                      </a>
                    ))}
                  </nav>
                </>
              )}
              <PageLink href="/blog">
                <T>{"← Explore the journal"}</T>
              </PageLink>
            </aside>
            <div className={s.prose}>
              <div lang="en">
                <CMSBlocks blocks={post.content} cmsURL={base} />
              </div>
              <div className={s.articleEnd}>
                <span>
                  <T>{"Thanks for reading."}</T>
                </span>
                <PageLink href="/blog">
                  <T>{"Find your next story ↗"}</T>
                </PageLink>
              </div>
            </div>
          </div>
        </article>
        {related.length > 0 && (
          <section className={s.related}>
            <span className={s.eyebrow}>
              <T>{"KEEP EXPLORING"}</T>
            </span>
            <h2>
              <T>{"A little more "}</T>
              <em>
                <T>{"inspiration."}</T>
              </em>
            </h2>
            <div className={s.grid}>
              {related.map((item) => (
                <PostCard key={item.slug} post={item} />
              ))}
            </div>
          </section>
        )}
        <BlogBanner />
      </main>
      <Footer />
    </>
  );
}
