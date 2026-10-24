import type { Metadata } from "next";
import { Intro, Accounts, Capital, Steps, Footer } from "@/components/Site";
export const metadata: Metadata = {
  title: "Business banking",
  description:
    "Business accounts, payroll and working capital for growing businesses. Explore Teerus MSME banking.",
  alternates: { canonical: "/business" },
};
export default function Business() {
  return (
    <>
      <main id="main-content">
        <Intro kind="business" />
        <Accounts business />
        <Capital />
        <Steps business />
      </main>
      <Footer />
    </>
  );
}
