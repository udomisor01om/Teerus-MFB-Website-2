import type { Metadata } from "next";
import { Legal } from "@/components/Legal";
export const metadata: Metadata = {
  title: "Terms and conditions",
  description: "Teerus Microfinance Bank terms and conditions.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/terms-and-conditions" },
};
export default function Terms() {
  return <Legal title="Terms and conditions" file="terms-and-conditions.md" />;
}
