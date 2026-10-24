import type { Metadata } from "next";
import {
  AboutIntro,
  Story,
  Values,
  Team,
  Steps,
  Footer,
} from "@/components/Site";
export const metadata: Metadata = {
  title: "About us",
  description:
    "Meet Teerus Microfinance Bank, our people, our purpose and our commitment to individuals and businesses in Surulere, Lagos.",
  alternates: { canonical: "/about" },
};
export default function About() {
  return (
    <>
      <main id="main-content">
        <AboutIntro />
        <Story />
        <Values />
        <Team />
        <Steps />
      </main>
      <Footer />
    </>
  );
}
