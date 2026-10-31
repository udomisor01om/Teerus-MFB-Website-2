import { bankStructuredData } from "@/content/structured-data";
import { DevAudit } from "@/components/DevAudit";
import type { Metadata } from "next";
import "@/styles/globals.css";
import { siteConfig } from "@/content/site";
const production = process.env.SITE_ENV === "production";
export const metadata: Metadata = {
  metadataBase: new URL(siteConfig.canonicalOrigin),
  title: {
    default: "Teerus MFB — Banking that gives your dreams wings",
    template: "%s | Teerus MFB",
  },
  description:
    "Save, borrow and manage everyday transactions with Teerus Microfinance Bank. Banking for individuals and growing businesses in Nigeria.",
  robots: { index: production, follow: production },
  openGraph: {
    type: "website",
    locale: "en_NG",
    siteName: siteConfig.name,
    images: [{ url: "/opengraph-image", width: 1200, height: 630 }],
  },
  twitter: { card: "summary_large_image" },
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en-NG">
      <body>
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: bankStructuredData,
          }}
        />
        {children}
        {process.env.NODE_ENV === "development" &&
          process.env.ENABLE_ACCESSIBILITY_AUDIT === "true" && <DevAudit />}
      </body>
    </html>
  );
}
