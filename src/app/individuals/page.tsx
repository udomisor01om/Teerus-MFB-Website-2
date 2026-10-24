import type { Metadata } from "next";
import {
  Intro,
  Accounts,
  CardFeature,
  PersonalLoans,
  Steps,
  Footer,
} from "@/components/Site";
export const metadata: Metadata = {
  title: "Personal banking",
  description:
    "Explore Teerus accounts, savings, cards and loans for your everyday life.",
  alternates: { canonical: "/individuals" },
};
export default function Individuals() {
  return (
    <>
      <main id="main-content">
        <Intro kind="individuals" />
        <Accounts />
        <CardFeature />
        <PersonalLoans />
        <Steps />
      </main>
      <Footer />
    </>
  );
}
