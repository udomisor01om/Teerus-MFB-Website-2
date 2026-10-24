import { readFile } from "node:fs/promises";
import path from "node:path";
import { Header } from "./Controls";
import { Footer } from "./Site";
import s from "./Site.module.css";
export async function Legal({ title, file }: { title: string; file: string }) {
  const content = await readFile(
    path.join(process.cwd(), "content/legal", file),
    "utf8",
  );
  return (
    <>
      <div className={s.simpleHeader}>
        <Header />
      </div>
      <main id="main-content" className={`${s.legal} ${s.container}`}>
        <h1>{title}</h1>
        {content
          .trim()
          .split(/\n\n+/)
          .map((paragraph, i) =>
            paragraph.startsWith("## ") ? (
              <h2 key={i}>{paragraph.slice(3)}</h2>
            ) : (
              <p key={i}>{paragraph}</p>
            ),
          )}
        <p>
          Contact{" "}
          <a href="mailto:support@teerusbank.com">support@teerusbank.com</a> for
          assistance.
        </p>
      </main>
      <Footer />
    </>
  );
}
