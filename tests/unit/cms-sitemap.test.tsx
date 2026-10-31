import { afterEach, describe, expect, it, vi } from "vitest";
import fixture from "../fixtures/cms-post.json";
vi.mock("@/lib/cms/client", () => ({ listPosts: vi.fn() }));
import { listPosts } from "@/lib/cms/client";
import sitemap from "@/app/sitemap";
import type { Post, PostsResponse } from "@/lib/cms/types";
const post = fixture as Post;
const page = (
  docs: Post[],
  page: number,
  nextPage: number | null,
): PostsResponse => ({
  docs,
  page,
  nextPage,
  limit: 100,
  totalDocs: 3,
  totalPages: 2,
  hasNextPage: nextPage !== null,
  hasPrevPage: page > 1,
  prevPage: page > 1 ? page - 1 : null,
  pagingCounter: 1,
});
afterEach(() => vi.clearAllMocks());
describe("CMS sitemap", () => {
  it("traverses pagination, deduplicates slugs and excludes noIndex articles", async () => {
    vi.mocked(listPosts)
      .mockResolvedValueOnce(
        page(
          [post, { ...post, slug: "private-preview", seo: { noIndex: true } }],
          1,
          2,
        ),
      )
      .mockResolvedValueOnce(
        page([post, { ...post, slug: "page-two" }], 2, null),
      );
    const result = await sitemap();
    expect(listPosts).toHaveBeenNthCalledWith(2, { page: 2, limit: 100 });
    expect(
      result.filter((item) => item.url.endsWith("/welcome-to-teerus-insights")),
    ).toHaveLength(1);
    expect(result.some((item) => item.url.endsWith("/page-two"))).toBe(true);
    expect(result.some((item) => item.url.includes("private-preview"))).toBe(
      false,
    );
  });
  it("preserves marketing URLs if CMS is unavailable", async () => {
    vi.mocked(listPosts).mockRejectedValueOnce(new Error("CMS unavailable"));
    const log = vi.spyOn(console, "error").mockImplementation(() => {});
    const result = await sitemap();
    expect(result).toHaveLength(7);
    expect(result.some((item) => item.url.endsWith("/about"))).toBe(true);
    log.mockRestore();
  });
});
