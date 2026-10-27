import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogHeader, BlogImage, BlogBanner, PostCard } from "@/components/Blog";
import { PageLink } from "@/components/PageLink";
import { Footer } from "@/components/Site";
import { getBlogPosts, getBlogPost, formatBlogDate } from "@/content/blog";
import s from "@/components/Blog.module.css";
export function generateStaticParams() {
  return getBlogPosts().map((post) => ({ slug: post.slug }));
}
export const dynamicParams = false;
export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) return {};
  return {
    title: post.title,
    description: post.excerpt,
    alternates: { canonical: `/blog/${slug}` },
    robots: { index: false, follow: false },
    openGraph: {
      title: post.title,
      description: post.excerpt,
      type: "article",
      images: [post.image],
    },
  };
}
export default async function ArticlePage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getBlogPost(slug);
  if (!post) notFound();
  const related = getBlogPosts()
    .filter((item) => item.slug !== slug)
    .sort(
      (a, b) =>
        Number(b.category === post.category) -
        Number(a.category === post.category),
    )
    .slice(0, 3);
  return (
    <>
      <main id="main-content">
        <BlogHeader />
        <article>
          <header className={s.articleHeader}>
            <PageLink href="/blog" className={s.back}>
              ← All stories
            </PageLink>
            <div className={s.meta}>
              <span>{post.category}</span>
              <span>{post.readMinutes} min read</span>
            </div>
            <h1>{post.title}</h1>
            <p className={s.lead}>{post.excerpt}</p>
            <div className={s.byline}>
              <span className={s.authorMark} aria-hidden="true">
                t.
              </span>
              <span>
                {post.author}
                <small>{formatBlogDate(post.date)} · Sample story</small>
              </span>
            </div>
          </header>
          <div className={s.articleCover}>
            <BlogImage post={post} priority />
          </div>
          <div className={s.articleLayout}>
            <aside className={s.contents}>
              <span className={s.eyebrow}>IN THIS STORY</span>
              <nav aria-label="Article contents">
                {post.sections.map((section) => (
                  <a href={`#${section.id}`} key={section.id}>
                    {section.title}
                  </a>
                ))}
              </nav>
              <PageLink href="/blog">← Explore the journal</PageLink>
            </aside>
            <div className={s.prose}>
              <p className={s.articleNotice}>
                Preview story — this is sample editorial content. Final articles
                will be added before publication.
              </p>
              {post.sections.map((section) => (
                <section key={section.id} id={section.id}>
                  <h2>{section.title}</h2>
                  {section.paragraphs.map((paragraph, i) => (
                    <p key={i}>{paragraph}</p>
                  ))}
                  {section.quote && <blockquote>{section.quote}</blockquote>}
                  {section.bullets && (
                    <ul>
                      {section.bullets.map((bullet) => (
                        <li key={bullet}>{bullet}</li>
                      ))}
                    </ul>
                  )}
                </section>
              ))}
              <div className={s.articleEnd}>
                <span>Thanks for reading.</span>
                <PageLink href="/blog">Find your next story ↗</PageLink>
              </div>
            </div>
          </div>
        </article>
        <section className={s.related}>
          <span className={s.eyebrow}>KEEP EXPLORING</span>
          <h2>
            A little more <em>inspiration.</em>
          </h2>
          <div className={s.grid}>
            {related.map((item) => (
              <PostCard key={item.slug} post={item} />
            ))}
          </div>
        </section>
        <BlogBanner />
      </main>
      <Footer />
    </>
  );
}
