import type { SiteConfig } from "./types";

export const siteConfig = {
  name: "Teerus Microfinance Bank",
  canonicalOrigin: (
    process.env.NEXT_PUBLIC_SITE_URL || "https://www.teerusbank.com"
  ).replace(/\/$/, ""),
  locale: "en-NG",
  navigation: [
    { label: "For Individuals", href: "/individuals" },
    { label: "For SMEs", href: "/business" },
    { label: "About Us", href: "/about" },
    { label: "Blog", href: "/blog" },
  ],
  externalLinks: {
    webApp: "https://onlinebanking.teerusbank.com/",
    appleAppStore: "https://apps.apple.com/ng/app/teerus-mfb/id6779130255",
    googlePlay:
      "https://play.google.com/store/apps/details?id=com.tyrus.mfb.mobile",
  },
} as const satisfies SiteConfig;
