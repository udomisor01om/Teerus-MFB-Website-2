import { readFile } from "node:fs/promises";
import path from "node:path";
import { Header } from "./Controls";
import { PageLink } from "./PageLink";
import { Footer } from "./Site";
import s from "./Legal.module.css";

type Document = {
  updated: string;
  source: string;
  sections: { title: string; blocks: { type: string; text: string }[] }[];
};
export async function Legal({ title, file }: { title: string; file: string }) {
  const document: Document = JSON.parse(
    await readFile(
      path.join(process.cwd(), "content/legal", file.replace(/\.md$/, ".json")),
      "utf8",
    ),
  );
  const privacy = file.startsWith("privacy");
  return (
    <>
      <div className={s.intro}>
        <Header />
        <div className={s.hero}>
          <span className={s.eyebrow}>TEERUS · LEGAL</span>
          <h1>{title}</h1>
          <p>Last updated: {document.updated}</p>
          <nav aria-label="Legal documents" className={s.tabs}>
            <PageLink
              href="/privacy-policy"
              aria-current={privacy ? "page" : undefined}
            >
              Privacy policy
            </PageLink>
            <PageLink
              href="/terms-and-conditions"
              aria-current={!privacy ? "page" : undefined}
            >
              Terms & conditions
            </PageLink>
          </nav>
        </div>
      </div>
      <main id="main-content" className={s.layout}>
        <aside>
          <details open>
            <summary>On this page</summary>
            <nav aria-label="Document sections">
              <ol>
                {document.sections.map((section, i) => (
                  <li key={i}>
                    <a href={`#section-${i}`}>{section.title}</a>
                  </li>
                ))}
              </ol>
            </nav>
          </details>
        </aside>
        <article className={s.document}>
          {document.sections.map((section, i) => (
            <section id={`section-${i}`} key={i}>
              <span className={s.number}>{String(i + 1).padStart(2, "0")}</span>
              <h2>{section.title}</h2>
              {section.blocks.map((block, j) =>
                block.type === "h3" ? (
                  <h3 key={j}>{block.text}</h3>
                ) : block.type === "li" ? (
                  <ul key={j}>
                    <li>{block.text}</li>
                  </ul>
                ) : (
                  <p key={j}>{block.text}</p>
                ),
              )}
            </section>
          ))}
          <a className={s.back} href="#">
            Back to top ↑
          </a>
        </article>
      </main>
      <Footer />
    </>
  );
}
