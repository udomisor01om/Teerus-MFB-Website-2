import type { Metadata } from "next";
import { Legal } from "@/components/Legal";
export const metadata: Metadata = {
  title: "Privacy policy",
  description: "Teerus Microfinance Bank privacy policy.",
  robots: { index: false, follow: false },
  alternates: { canonical: "/privacy-policy" },
};
export default function Privacy() {
  return <Legal title="Privacy policy" file="privacy-policy.md" />;
}
