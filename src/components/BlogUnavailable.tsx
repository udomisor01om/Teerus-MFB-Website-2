import { T } from "@/i18n/Language";
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
            <h1>
              <T>{"Our journal is taking a moment."}</T>
            </h1>
            <p>
              <T>
                {
                  "The stories service may be waking up. Please try again in about a minute. "
                }
              </T>
            </p>
            <a className={s.retry} href={href}>
              <T>{"Try again "}</T>
            </a>
            <p>
              <PageLink href="/">
                <T>{"Back to Teerus"}</T>
              </PageLink>
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
