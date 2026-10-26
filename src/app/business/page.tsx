import type { Metadata } from "next";
import { Footer } from "@/components/Site";
import {
  BusinessIntro,
  BusinessAccounts,
  BusinessCapital,
  BusinessSavings,
} from "@/components/BusinessSections";
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
        <BusinessIntro />
        <BusinessAccounts />
        <BusinessCapital />
        <BusinessSavings />
      </main>
      <Footer />
    </>
  );
}
