import type { Metadata } from "next";
import type { Post } from "./types";
import { mediaURL, safeContentURL } from "./blocks";
import type { BlogPost } from "@/content/blog";
import { siteConfig } from "@/content/site";
export function postCard(post: Post, base: string): BlogPost {
  const image =
    post.featuredImage && typeof post.featuredImage === "object"
      ? post.featuredImage
      : null;
  const category = post.categories?.find(
    (item) => item && typeof item === "object",
  );
  return {
    slug: post.slug,
    title: post.title,
    excerpt: post.excerpt,
    category: typeof category === "object" ? category.name : "Teerus insights",
    date: post.publishedAt || "",
    author:
      post.authors
        .filter((item) => item && typeof item === "object")
        .map((item) => (typeof item === "object" ? item.name : ""))
        .join(", ") || "Teerus",
    image: mediaURL(image?.url, base) || "",
    imageAlt: image?.alt || "",
    sections: [],
  };
}
export function articleMetadata(post: Post, base: string): Metadata {
  const title = post.seo?.title || post.title;
  const description = post.seo?.description || post.excerpt;
  const suppliedCanonical = safeContentURL(post.seo?.canonicalUrl);
  const canonical = suppliedCanonical?.startsWith("https://")
    ? suppliedCanonical
    : `${siteConfig.canonicalOrigin}/blog/${encodeURIComponent(post.slug)}`;
  const social =
    post.seo?.socialImage && typeof post.seo.socialImage === "object"
      ? post.seo.socialImage
      : post.featuredImage && typeof post.featuredImage === "object"
        ? post.featuredImage
        : null;
  const src = mediaURL(social?.url, base);
  const images = src
    ? [{ url: src, alt: social?.alt || "" }]
    : [{ url: `${siteConfig.canonicalOrigin}/opengraph-image` }];
  return {
    title,
    description,
    alternates: { canonical },
    robots: {
      index: process.env.SITE_ENV === "production" && !post.seo?.noIndex,
      follow: process.env.SITE_ENV === "production",
    },
    openGraph: {
      title,
      description,
      type: "article",
      url: canonical,
      images,
      publishedTime: post.publishedAt || undefined,
      modifiedTime: post.updatedAt,
      authors: postCard(post, base).author.split(", "),
    },
    twitter: { card: "summary_large_image", title, description, images },
  };
}
