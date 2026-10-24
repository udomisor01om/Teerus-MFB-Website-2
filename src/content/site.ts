import type { SiteConfig } from "./types";

export const siteConfig = {
  name: "Teerus Microfinance Bank",
  canonicalOrigin: "https://www.teerusbank.com",
  locale: "en-NG",
  navigation: [
    { label: "Home", href: "/" },
    { label: "Individuals", href: "/individuals" },
    { label: "MSMEs", href: "/business" },
    { label: "About Us", href: "/about" },
  ],
  externalLinks: {
    webApp: null,
    appleAppStore: "https://apps.apple.com/ng/app/teerus-mfb/id6779130255",
    googlePlay:
      "https://play.google.com/store/apps/details?id=com.tyrus.mfb.mobile",
  },
} as const satisfies SiteConfig;
