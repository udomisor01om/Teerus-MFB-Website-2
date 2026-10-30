"use client";
import { useState } from "react";
import { filterBlogPosts, type BlogPost } from "@/content/blog";
import { PostCard } from "./Blog";
import s from "./Blog.module.css";
export function BlogListing({ posts }: { posts: BlogPost[] }) {
  const [category, setCategory] = useState<string>("All stories");
  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState(6);
  const filtered = filterBlogPosts(posts, category, query);
  return (
    <section className={s.library} aria-labelledby="latest-stories">
      <div className={s.libraryHeading}>
        <div>
          <span className={s.eyebrow}>THE LATEST FROM TEERUS</span>
          <h2 id="latest-stories">
            Something for <em>your next step.</em>
          </h2>
        </div>
        <label className={s.search}>
          <span className={s.srOnly}>Search stories</span>
          <svg
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            aria-hidden="true"
          >
            <circle
              cx="10"
              cy="10"
              r="6"
              stroke="currentColor"
              strokeWidth="1.5"
            />
            <path d="m15 15 5 5" stroke="currentColor" strokeWidth="1.5" />
          </svg>
          <input
            type="search"
            placeholder="Search stories"
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setLimit(6);
            }}
          />
        </label>
      </div>
      <div className={s.filters} role="group" aria-label="Filter by topic">
        {["All stories", ...new Set(posts.map((post) => post.category))].map(
          (item) => (
            <button
              key={item}
              type="button"
              aria-pressed={category === item}
              onClick={() => {
                setCategory(item);
                setLimit(6);
              }}
            >
              {item}
            </button>
          ),
        )}
      </div>
      <p className={s.results} role="status">
        {filtered.length} {filtered.length === 1 ? "story" : "stories"}
        {category !== "All stories" ? ` in ${category}` : " to explore"}
      </p>
      <div className={s.grid}>
        {filtered.slice(0, limit).map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
      {!filtered.length && (
        <div className={s.empty}>
          <h3>No stories found just yet.</h3>
          <p>Try another topic or a different search.</p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("All stories");
              setLimit(6);
            }}
          >
            Show all stories
          </button>
        </div>
      )}
      {limit < filtered.length && (
        <button
          type="button"
          className={s.loadMore}
          onClick={() => setLimit((n) => n + 6)}
        >
          More stories <span aria-hidden="true">↓</span>
        </button>
      )}
    </section>
  );
}
