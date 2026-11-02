import { T } from "@/i18n/Language";
import Link from "next/link";
import { Header } from "@/components/Controls";
import { Footer } from "@/components/Site";
import s from "@/components/Site.module.css";
export default function NotFound() {
  return (
    <>
      <div className={s.simpleHeader}>
        <Header />
      </div>
      <main id="main-content" className={`${s.container} ${s.legal}`}>
        <p>
          <T>{"404 — Page not found"}</T>
        </p>
        <h1>
          <T>{"Let’s get you back on track."}</T>
        </h1>
        <p>
          <T>{"We couldn’t find the page you were looking for."}</T>
        </p>
        <Link href="/" className={s.button}>
          <T>{"Back to home "}</T>
        </Link>
      </main>
      <Footer />
    </>
  );
}
