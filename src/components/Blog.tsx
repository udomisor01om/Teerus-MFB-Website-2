import { T, OriginalLanguageNotice } from "@/i18n/Language";
import Image from "next/image";
import { PageLink } from "./PageLink";
import { Download, Header } from "./Controls";
import { formatBlogDate, type BlogPost } from "@/content/blog";
import s from "./Blog.module.css";
export function BlogHeader() {
  return (
    <div className={s.header}>
      <Header />
      <OriginalLanguageNotice kind="article" />
    </div>
  );
}
export function BlogImage({
  post,
  priority = false,
}: {
  post: BlogPost;
  priority?: boolean;
}) {
  return (
    <div
      className={`${s.image} ${post.category === "Product stories" ? s.productImage : ""}`}
    >
      {post.image ? (
        <Image
          src={post.image}
          alt={post.imageAlt}
          fill
          sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 640px"
          unoptimized
          priority={priority}
        />
      ) : (
        <span className={s.imagePlaceholder} aria-hidden="true">
          <T>{"Teerus"}</T>
          <em>
            <T>{"Journal"}</T>
          </em>
        </span>
      )}
    </div>
  );
}
export function PostCard({ post }: { post: BlogPost }) {
  return (
    <article className={s.card}>
      <PageLink
        href={`/blog/${encodeURIComponent(post.slug)}`}
        className={s.cardLink}
      >
        <BlogImage post={post} />
        <div className={s.cardBody}>
          <div className={s.meta}>
            <span>{post.category}</span>
            {post.readMinutes && (
              <span>
                {post.readMinutes}
                <T>{" min read"}</T>
              </span>
            )}
          </div>
          <h3 lang="en">{post.title}</h3>
          <p lang="en">{post.excerpt}</p>
          <div className={s.cardFoot}>
            <span>
              {post.author}
              <small>{formatBlogDate(post.date)}</small>
            </span>
            <span className={s.arrow} aria-hidden="true">
              ↗
            </span>
          </div>
        </div>
      </PageLink>
    </article>
  );
}
export function BlogBanner() {
  return (
    <aside className={s.banner}>
      <div>
        <span className={s.eyebrow}>
          <T>{"A LITTLE CLOSER TO YOUR DREAMS"}</T>
        </span>
        <h2>
          <T>{"Good stories. "}</T>
          <br />
          <T>{"Even better "}</T>
          <em>
            <T>{"possibilities."}</T>
          </em>
        </h2>
        <p>
          <T>
            {"Take the next step with Teerus, wherever your day takes you."}
          </T>
        </p>
      </div>
      <Download label="Download Teerus App" />
    </aside>
  );
}
