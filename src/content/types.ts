export interface NavigationItem {
  label: string;
  href: string;
}

/** Unverified destinations remain null and must never become placeholder links. */
export interface ExternalLinks {
  webApp: string | null;
  appleAppStore: string | null;
  googlePlay: string | null;
}

export interface SiteConfig {
  name: string;
  canonicalOrigin: string;
  locale: string;
  navigation: readonly NavigationItem[];
  externalLinks: ExternalLinks;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  audience: "individuals" | "business" | "both";
  source: string;
  approved: boolean;
}

export interface Testimonial {
  id: string;
  quote: string;
  name: string;
  attribution: string;
  source: string;
  approved: boolean;
}
