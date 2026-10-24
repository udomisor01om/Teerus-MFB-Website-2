import type { Metadata } from "next";
import {
  Intro,
  Products,
  Loans,
  Steps,
  Testimonials,
  Footer,
} from "@/components/Site";
export const metadata: Metadata = { alternates: { canonical: "/" } };
export default function Home() {
  return (
    <>
      <main id="main-content">
        <Intro />
        <Products />
        <Loans />
        <Steps />
        <Testimonials />
      </main>
      <Footer />
    </>
  );
}
