import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Trial } from "./Trial";
export const metadata: Metadata = {
  title: "Local language preview",
  robots: { index: false, follow: false },
};
export default function LanguagePreview() {
  if (process.env.NODE_ENV !== "development") notFound();
  return <Trial />;
}
