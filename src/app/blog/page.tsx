import type { Metadata } from "next";
import { BlogHeader, BlogImage, BlogBanner } from "@/components/Blog";
import { BlogListing } from "@/components/BlogListing";
import { PageLink } from "@/components/PageLink";
import { Footer } from "@/components/Site";
import { getBlogPosts, formatBlogDate } from "@/content/blog";
import s from "@/components/Blog.module.css";
export const metadata: Metadata = {
  title: "The Teerus Journal",
  description: "Stories, ideas and everyday possibilities from Teerus.",
  alternates: { canonical: "/blog" },
  robots: { index: false, follow: false },
};
export default function BlogPage() {
  const posts = getBlogPosts();
  const featured = posts.find((post) => post.featured)!;
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
            <span className={s.preview}>Preview edition · Sample stories</span>
          </div>
          <div className={s.feature}>
            <PageLink href={`/blog/${featured.slug}`} className={s.featureLink}>
              <BlogImage post={featured} priority />
              <div className={s.featureCopy}>
                <span className={s.featureLabel}>
                  IN THE SPOTLIGHT <span aria-hidden="true">↗</span>
                </span>
                <div className={s.meta}>
                  <span>{featured.category}</span>
                  <span>{featured.readMinutes} min read</span>
                </div>
                <h2>{featured.title}</h2>
                <p>{featured.excerpt}</p>
                <div className={s.featureBottom}>
                  <span>
                    {featured.author}
                    <small>
                      {formatBlogDate(featured.date)} · Sample story
                    </small>
                  </span>
                  <span className={s.read}>
                    Read story <span aria-hidden="true">↗</span>
                  </span>
                </div>
              </div>
            </PageLink>
          </div>
        </div>
        <BlogListing posts={posts} />
        <BlogBanner />
      </main>
      <Footer />
    </>
  );
}
