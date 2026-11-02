import { T, OriginalLanguageNotice } from "@/i18n/Language";
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
          <span className={s.eyebrow}>
            <T>{"TEERUS · LEGAL"}</T>
          </span>
          <h1>
            <T>{title}</T>
          </h1>
          <p>
            <T>{"Last updated: "}</T>
            {document.updated}
          </p>
          <nav aria-label="Legal documents" className={s.tabs}>
            <PageLink
              href="/privacy-policy"
              aria-current={privacy ? "page" : undefined}
            >
              <T>{"Privacy policy "}</T>
            </PageLink>
            <PageLink
              href="/terms-and-conditions"
              aria-current={!privacy ? "page" : undefined}
            >
              <T>{"Terms & conditions "}</T>
            </PageLink>
          </nav>
        </div>
      </div>
      <OriginalLanguageNotice kind="legal" />
      <main lang="en" id="main-content" className={s.layout}>
        <aside>
          <details open>
            <summary>
              <T>{"On this page"}</T>
            </summary>
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
            <T>{"Back to top ↑ "}</T>
          </a>
        </article>
      </main>
      <Footer />
    </>
  );
}
