import "server-only";
import { cache } from "react";
import type { Post, PostsResponse } from "./types";

// Keep requests responsive and well below the hosting execution limit. A cold CMS wakes on this request;
// the visitor gets a recoverable state and can retry after it finishes starting.
export const CMS_TIMEOUT_MS = 8000;
export class CMSError extends Error {
  constructor(
    public readonly code:
      "configuration" | "unavailable" | "brand" | "response",
    message: string,
  ) {
    super(message);
    this.name = "CMSError";
  }
}
export function cmsConfig() {
  const base = process.env.CMS_URL;
  const brand = process.env.BRAND_KEY;
  if (!base || !brand)
    throw new CMSError(
      "configuration",
      "CMS_URL and BRAND_KEY must be configured on the server.",
    );
  let url: URL;
  try {
    url = new URL(base);
  } catch {
    throw new CMSError("configuration", "CMS_URL must be an absolute URL.");
  }
  if (url.username || url.password)
    throw new CMSError(
      "configuration",
      "CMS_URL must not contain credentials.",
    );
  if (
    url.protocol !== "https:" &&
    !(
      url.protocol === "http:" &&
      ["localhost", "127.0.0.1"].includes(url.hostname)
    )
  )
    throw new CMSError("configuration", "CMS_URL must use HTTPS.");
  return { base: url.origin, brand };
}
function isPost(value: unknown): value is Post {
  if (!value || typeof value !== "object") return false;
  const post = value as Partial<Post>;
  return (
    typeof post.id === "number" &&
    typeof post.slug === "string" &&
    !!post.slug &&
    typeof post.title === "string" &&
    typeof post.excerpt === "string" &&
    Array.isArray(post.content) &&
    Array.isArray(post.authors)
  );
}
async function query(
  page: number,
  limit: number,
  slug?: string,
): Promise<PostsResponse> {
  const { base, brand } = cmsConfig();
  const url = new URL(`/api/public/${encodeURIComponent(brand)}/posts`, base);
  url.searchParams.set("page", String(page));
  url.searchParams.set("limit", String(limit));
  if (slug !== undefined) url.searchParams.set("slug", slug);
  let response: Response;
  try {
    response = await fetch(url, {
      cache: "no-store",
      signal: AbortSignal.timeout(CMS_TIMEOUT_MS),
      headers: { Accept: "application/json" },
    });
  } catch {
    throw new CMSError(
      "unavailable",
      "The journal service is unavailable or still starting. Please retry in about a minute.",
    );
  }
  if (!response.ok)
    throw new CMSError(
      response.status === 404 ? "brand" : "unavailable",
      response.status === 404
        ? "CMS endpoint or brand was not found. Confirm the deployed BRAND_KEY."
        : `CMS returned HTTP ${response.status}. Please retry shortly.`,
    );
  let data: PostsResponse;
  try {
    data = await response.json();
  } catch {
    throw new CMSError("response", "CMS returned invalid JSON.");
  }
  if (
    !data ||
    !Array.isArray(data.docs) ||
    !data.docs.every(isPost) ||
    !Number.isInteger(data.page) ||
    !Number.isInteger(data.totalPages) ||
    !Number.isInteger(data.totalDocs) ||
    typeof data.hasNextPage !== "boolean" ||
    typeof data.hasPrevPage !== "boolean" ||
    (data.hasNextPage &&
      (!Number.isInteger(data.nextPage) || data.nextPage! <= data.page))
  )
    throw new CMSError(
      "response",
      "CMS response does not match the public posts contract.",
    );
  return {
    ...data,
    docs: data.docs.filter((post) => post._status === "published"),
  };
}
const cachedQuery = cache(query);
export function listPosts({
  page = 1,
  limit = 12,
}: { page?: number; limit?: number } = {}) {
  return cachedQuery(
    Number.isSafeInteger(page) && page > 0 ? page : 1,
    Number.isSafeInteger(limit) ? Math.max(1, Math.min(100, limit)) : 12,
  );
}
// Deduplicate metadata and page requests, including failures, during one render.
export const getPost = cache(async (slug: string): Promise<Post | null> => {
  const result = await query(1, 1, slug);
  return result.docs.find((post) => post.slug === slug) || null;
});
