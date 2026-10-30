import { render, screen } from "@testing-library/react";
import { afterEach, describe, expect, it, vi } from "vitest";
import fixture from "../fixtures/cms-post.json";
import type { Post } from "@/lib/cms/types";
import { CMSBlocks } from "@/components/CMSBlocks";
import { safeContentURL, mediaURL, embedURL } from "@/lib/cms/blocks";
import { listPosts, getPost } from "@/lib/cms/client";
import { articleMetadata, postCard } from "@/lib/cms/presentation";
const post = fixture as Post;
const response = (docs: Post[] = [post]) => ({
  docs,
  totalDocs: docs.length,
  totalPages: 1,
  page: 1,
  limit: 12,
  hasNextPage: false,
  hasPrevPage: false,
  nextPage: null,
  prevPage: null,
  pagingCounter: 1,
});
afterEach(() => {
  vi.unstubAllGlobals();
  vi.unstubAllEnvs();
});
function fetchMock(data: unknown, status = 200) {
  vi.stubEnv("CMS_URL", "https://cms.example");
  vi.stubEnv("BRAND_KEY", "teerus");
  const mock = vi
    .fn()
    .mockResolvedValue({ ok: status === 200, status, json: async () => data });
  vi.stubGlobal("fetch", mock);
  return mock;
}
describe("CMS public client", () => {
  it("encodes brand and slug, fetches without persistent cache, filters drafts", async () => {
    const mock = fetchMock(response([post, { ...post, _status: "draft" }]));
    vi.stubEnv("BRAND_KEY", "teerus/brand");
    expect((await listPosts({ page: 2, limit: 12 })).docs).toHaveLength(1);
    expect(mock.mock.calls[0][0].pathname).toBe(
      "/api/public/teerus%2Fbrand/posts",
    );
    expect(mock.mock.calls[0][1].cache).toBe("no-store");
    await getPost("a&limit=100");
    expect(mock.mock.calls[1][0].searchParams.get("slug")).toBe("a&limit=100");
    expect(mock.mock.calls[1][0].searchParams.get("limit")).toBe("1");
  });
  it("distinguishes a missing post from a brand error", async () => {
    fetchMock(response([]));
    expect(await getPost("missing")).toBeNull();
    fetchMock({ error: "Brand not found" }, 404);
    await expect(getPost("missing")).rejects.toMatchObject({ code: "brand" });
  });
  it("handles timeouts, malformed responses, and missing config", async () => {
    const mock = fetchMock({ wrong: true });
    await expect(listPosts()).rejects.toMatchObject({ code: "response" });
    mock.mockRejectedValue(new Error("TimeoutError"));
    await expect(listPosts()).rejects.toMatchObject({ code: "unavailable" });
    vi.stubEnv("BRAND_KEY", "");
    await expect(listPosts()).rejects.toMatchObject({ code: "configuration" });
  });
});
describe("CMS content", () => {
  it("renders every block family and gracefully handles IDs and future blocks", () => {
    const { container } = render(
      <CMSBlocks blocks={post.content} cmsURL="https://cms.example" />,
    );
    expect(
      screen.getByRole("heading", { name: "Banking with a human touch" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("A clearer path for your everyday banking.").tagName,
    ).toBe("STRONG");
    expect(screen.getAllByAltText("Teerus team together")).toHaveLength(2);
    expect(
      screen.getByText("This image is currently unavailable."),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("link", { name: "Another Teerus story" }),
    ).toHaveAttribute("href", "/blog/another-teerus-story");
    expect(
      screen.getByText("Related story currently unavailable."),
    ).toBeInTheDocument();
    expect(screen.getByRole("table")).toBeInTheDocument();
    expect(screen.getByRole("separator")).toBeInTheDocument();
    expect(container.querySelector("script")).toBeNull();
    expect(container.querySelector("pre")).toHaveTextContent(
      "<script>unsafe()</script>",
    );
  });
  it("rejects unsafe URLs and only frames supported providers", () => {
    [
      "javascript:alert(1)",
      "//evil.example",
      "/\\evil.example",
      "data:text/html,hi",
    ].forEach((url) => expect(safeContentURL(url)).toBeUndefined());
    expect(mediaURL("/media/a.webp", "https://cms.example")).toBe(
      "https://cms.example/media/a.webp",
    );
    expect(
      mediaURL("javascript:evil()", "https://cms.example"),
    ).toBeUndefined();
    expect(embedURL("https://youtu.be/dQw4w9WgXcQ")).toBe(
      "https://www.youtube-nocookie.com/embed/dQw4w9WgXcQ",
    );
    expect(embedURL("https://evil.example/embed/123")).toBeUndefined();
  });
  it("handles absent images, IDs and SEO noIndex without losing canonical metadata", () => {
    const item = {
      ...post,
      featuredImage: 99,
      authors: [99],
      categories: [99],
      seo: { noIndex: true },
    };
    expect(postCard(item, "https://cms.example")).toMatchObject({
      image: "",
      author: "Teerus",
      category: "Teerus insights",
    });
    vi.stubEnv("SITE_ENV", "production");
    const metadata = articleMetadata(item, "https://cms.example");
    expect(metadata.robots).toMatchObject({ index: false });
    expect(metadata.alternates?.canonical).toContain(
      "/blog/welcome-to-teerus-insights",
    );
  });
});
