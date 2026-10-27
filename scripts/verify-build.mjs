import { readFile, readdir, access } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";
import sharp from "sharp";
async function walk(dir) {
  const entries = await readdir(dir, { withFileTypes: true });
  return (
    await Promise.all(
      entries.map((e) =>
        e.isDirectory()
          ? walk(path.join(dir, e.name))
          : [path.join(dir, e.name)],
      ),
    )
  ).flat();
}
const files = (await walk(".next/server/app")).filter((f) =>
  f.endsWith(".html"),
);
const manifest = JSON.parse(
  await readFile(".next/routes-manifest.json", "utf8"),
);
const csp = manifest.headers
  .flatMap((r) => r.headers)
  .find((h) => h.key === "Content-Security-Policy").value;
const scriptPolicy = csp
  .split(";")
  .find((x) => x.trim().startsWith("script-src"));
if (
  scriptPolicy.includes("unsafe-inline") ||
  scriptPolicy.includes("unsafe-eval")
)
  throw new Error("Unsafe production script policy");
const assets = new Set();
for (const file of files) {
  const html = await readFile(file, "utf8");
  for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)) {
    if (!match[2] || /\bsrc\s*=/.test(match[1])) continue;
    const hash = `'sha256-${createHash("sha256").update(match[2]).digest("base64")}'`;
    if (!scriptPolicy.includes(hash))
      throw new Error(`CSP would block hydration in ${file}`);
  }
  for (const match of html.matchAll(/<img\b[^>]*\bsrc="([^"]+)"/g)) {
    const src = match[1].replaceAll("&amp;", "&");
    const url = new URL(src, "http://local.test");
    const asset =
      url.pathname === "/_next/image"
        ? url.searchParams.get("url")
        : decodeURIComponent(url.pathname);
    if (asset?.startsWith("/assets/")) assets.add(asset);
  }
}
for (const asset of assets) {
  const file = path.join("public", asset);
  await access(file);
  const { width, height } = await sharp(file).metadata();
  if (!width || !height || width <= 1 || height <= 1)
    throw new Error(`Empty image artwork: ${asset}`);
}
for (const route of [
  "index",
  "individuals",
  "business",
  "about",
  "blog",
  "blog/small-steps-bigger-dreams",
  "privacy-policy",
  "terms-and-conditions",
  "_not-found",
])
  await access(`.next/server/app/${route}.html`);
console.log(
  `Verified ${files.length} prerendered HTML files, ${assets.size} local assets, all required routes and CSP hydration hashes.`,
);
