"use client";
import { T, useLanguage } from "@/i18n/Language";

import { translate } from "@/i18n/translate";
import { useState } from "react";
import { filterBlogPosts, type BlogPost } from "@/content/blog";
import { PostCard } from "./Blog";
import s from "./Blog.module.css";
export function BlogListing({ posts }: { posts: BlogPost[] }) {
  const { language } = useLanguage();
  const [category, setCategory] = useState<string>("All stories");
  const [query, setQuery] = useState("");
  const [limit, setLimit] = useState(6);
  const filtered = filterBlogPosts(posts, category, query);
  return (
    <section className={s.library} aria-labelledby="latest-stories">
      <div className={s.libraryHeading}>
        <div>
          <span className={s.eyebrow}>
            <T>{"THE LATEST FROM TEERUS"}</T>
          </span>
          <h2 id="latest-stories">
            <T>{"Something for "}</T>
            <em>
              <T>{"your next step."}</T>
            </em>
          </h2>
        </div>
        <label className={s.search}>
          <span className={s.srOnly}>
            <T>{"Search stories"}</T>
          </span>
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
            placeholder={translate("Search stories", language)}
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
              <T>{item}</T>
            </button>
          ),
        )}
      </div>
      <p className={s.results} role="status">
        {filtered.length} <T>{filtered.length === 1 ? "story" : "stories"}</T>
        {category !== "All stories" ? (
          <>
            {" "}
            <T>{"in"}</T> {category}
          </>
        ) : (
          <T>{" to explore"}</T>
        )}
      </p>
      <div className={s.grid}>
        {filtered.slice(0, limit).map((post) => (
          <PostCard key={post.slug} post={post} />
        ))}
      </div>
      {!filtered.length && (
        <div className={s.empty}>
          <h3>
            <T>{"No stories found just yet."}</T>
          </h3>
          <p>
            <T>{"Try another topic or a different search."}</T>
          </p>
          <button
            type="button"
            onClick={() => {
              setQuery("");
              setCategory("All stories");
              setLimit(6);
            }}
          >
            <T>{"Show all stories "}</T>
          </button>
        </div>
      )}
      {limit < filtered.length && (
        <button
          type="button"
          className={s.loadMore}
          onClick={() => setLimit((n) => n + 6)}
        >
          <T>{"More stories "}</T>
          <span aria-hidden="true">↓</span>
        </button>
      )}
    </section>
  );
}
