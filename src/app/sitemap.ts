import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";
export default function sitemap(): MetadataRoute.Sitemap {
  return [
    "",
    "/individuals",
    "/business",
    "/about",
    "/privacy-policy",
    "/terms-and-conditions",
  ].map((route) => ({ url: `${siteConfig.canonicalOrigin}${route}` }));
}
