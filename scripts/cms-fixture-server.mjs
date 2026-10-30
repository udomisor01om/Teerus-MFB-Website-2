// Local integration test server; never used by the application or deployment.
import http from "node:http";
import { readFile } from "node:fs/promises";
const post = JSON.parse(
  await readFile(
    new URL("../tests/fixtures/cms-post.json", import.meta.url),
    "utf8",
  ),
);
const server = http.createServer(async (req, res) => {
  const url = new URL(req.url, "http://localhost");
  if (url.pathname === "/media/team.webp") {
    res.setHeader("Content-Type", "image/webp");
    res.end(
      await readFile(
        new URL(
          "../public/assets/about-team-group-about.webp",
          import.meta.url,
        ),
      ),
    );
    return;
  }
  if (!url.pathname.startsWith("/api/public/teerus/posts")) {
    res.writeHead(404);
    res.end();
    return;
  }
  res.setHeader("Content-Type", "application/json");
  const slug = url.searchParams.get("slug");
  if (slug === "outage-test") {
    res.writeHead(503);
    res.end('{"error":"Service unavailable"}');
    return;
  }
  if (slug === "slow-test") {
    setTimeout(() => res.end("{}"), 12000);
    return;
  }
  const page = Math.max(1, Number(url.searchParams.get("page") || 1));
  const limit = Math.max(1, Number(url.searchParams.get("limit") || 12));
  const posts = [
    post,
    ...Array.from({ length: 13 }, (_, i) => ({
      ...post,
      id: i + 2,
      slug: `test-story-${i + 2}`,
      title: `Test story ${i + 2}`,
      seo: { noIndex: i === 0 },
    })),
  ];
  const filtered = slug ? posts.filter((p) => p.slug === slug) : posts;
  const docs = filtered.slice((page - 1) * limit, page * limit);
  const totalPages = Math.ceil(filtered.length / limit);
  res.end(
    JSON.stringify({
      docs,
      totalDocs: filtered.length,
      totalPages,
      page,
      limit,
      pagingCounter: (page - 1) * limit + 1,
      hasNextPage: page < totalPages,
      hasPrevPage: page > 1,
      nextPage: page < totalPages ? page + 1 : null,
      prevPage: page > 1 ? page - 1 : null,
    }),
  );
});
server.listen(4319, "127.0.0.1", () =>
  console.log("CMS fixture server: http://127.0.0.1:4319 (test data only)"),
);
