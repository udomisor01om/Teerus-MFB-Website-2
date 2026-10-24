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
        <p>404 — Page not found</p>
        <h1>Let’s get you back on track.</h1>
        <p>We couldn’t find the page you were looking for.</p>
        <Link href="/" className={s.button}>
          Back to home
        </Link>
      </main>
      <Footer />
    </>
  );
}
