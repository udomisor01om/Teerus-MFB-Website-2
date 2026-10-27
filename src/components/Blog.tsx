import Image from "next/image";
import { PageLink } from "./PageLink";
import { Download, Header } from "./Controls";
import { formatBlogDate, type BlogPost } from "@/content/blog";
import s from "./Blog.module.css";
export function BlogHeader() {
  return (
    <div className={s.header}>
      <Header />
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
      <Image
        src={post.image}
        alt={post.imageAlt}
        fill
        sizes="(max-width: 700px) 100vw, (max-width: 1000px) 50vw, 640px"
        unoptimized
        priority={priority}
      />
    </div>
  );
}
export function PostCard({ post }: { post: BlogPost }) {
  return (
    <article className={s.card}>
      <PageLink href={`/blog/${post.slug}`} className={s.cardLink}>
        <BlogImage post={post} />
        <div className={s.cardBody}>
          <div className={s.meta}>
            <span>{post.category}</span>
            <span>{post.readMinutes} min read</span>
          </div>
          <h3>{post.title}</h3>
          <p>{post.excerpt}</p>
          <div className={s.cardFoot}>
            <span>
              {post.author}
              <small>{formatBlogDate(post.date)} · Sample story</small>
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
        <span className={s.eyebrow}>A LITTLE CLOSER TO YOUR DREAMS</span>
        <h2>
          Good stories.
          <br />
          Even better <em>possibilities.</em>
        </h2>
        <p>Take the next step with Teerus, wherever your day takes you.</p>
      </div>
      <Download label="Download Teerus App" />
    </aside>
  );
}
