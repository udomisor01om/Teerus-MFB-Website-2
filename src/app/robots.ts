import type { MetadataRoute } from "next";
import { siteConfig } from "@/content/site";
export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      ...(process.env.SITE_ENV === "production"
        ? { allow: "/" }
        : { disallow: "/" }),
    },
    sitemap: `${siteConfig.canonicalOrigin}/sitemap.xml`,
  };
}
