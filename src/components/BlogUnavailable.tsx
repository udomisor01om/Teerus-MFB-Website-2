import { PageLink } from "./PageLink";
import { BlogHeader } from "./Blog";
import { Footer } from "./Site";
import s from "./Blog.module.css";
export function BlogUnavailable({ href = "/blog" }: { href?: string }) {
  return (
    <>
      <main id="main-content">
        <BlogHeader />
        <section className={s.library}>
          <div className={s.empty} role="status">
            <h1>Our journal is taking a moment.</h1>
            <p>
              The stories service may be waking up. Please try again in about a
              minute.
            </p>
            <a className={s.retry} href={href}>
              Try again
            </a>
            <p>
              <PageLink href="/">Back to Teerus</PageLink>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
