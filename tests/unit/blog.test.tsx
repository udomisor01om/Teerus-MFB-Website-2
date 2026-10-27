import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { getBlogPosts, getBlogPost } from "@/content/blog";
import { BlogListing } from "@/components/BlogListing";
import { Header } from "@/components/Controls";
vi.mock("next/navigation", () => ({
  usePathname: () => "/blog/small-steps-bigger-dreams",
}));
describe("blog preview", () => {
  it("paginates and filters complete stories, then recovers from an empty search", () => {
    render(<BlogListing posts={getBlogPosts()} />);
    expect(screen.getAllByRole("article")).toHaveLength(6);
    fireEvent.click(screen.getByRole("button", { name: /More stories/ }));
    expect(screen.getAllByRole("article")).toHaveLength(9);
    fireEvent.click(
      screen.getByRole("button", { name: "For business" }),
    );
    expect(screen.getAllByRole("article")).toHaveLength(2);
    fireEvent.change(screen.getByRole("searchbox"), {
      target: { value: "no matching phrase" },
    });
    expect(screen.queryAllByRole("article")).toHaveLength(0);
    fireEvent.click(screen.getByRole("button", { name: "Show all stories" }));
    expect(screen.getAllByRole("article")).toHaveLength(6);
  });
  it("resolves every unique article and rejects unknown slugs", () => {
    const posts = getBlogPosts();
    expect(new Set(posts.map((p) => p.slug)).size).toBe(posts.length);
    posts.forEach((post) => {
      expect(getBlogPost(post.slug)).toBe(post);
      expect(post.sections.length).toBeGreaterThan(2);
      expect(new Set(post.sections.map((s) => s.id)).size).toBe(
        post.sections.length,
      );
    });
    expect(getBlogPost("not-a-story")).toBeUndefined();
  });
  it("keeps Blog active on an article route", () => {
    render(<Header />);
    expect(
      screen.getByRole("link", { name: "Blog" }),
    ).toHaveAttribute("aria-current", "page");
  });
});
