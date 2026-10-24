import { readFile, writeFile, readdir } from "node:fs/promises";
import { createHash } from "node:crypto";
import path from "node:path";
// Static pages need their exact Next hydration scripts allowed by CSP. Hash the
// finished build, so no nonce or dynamic rendering is required.
async function htmlFiles(directory) {
  const files = [];
  for (const entry of await readdir(directory, { withFileTypes: true })) {
    const file = path.join(directory, entry.name);
    if (entry.isDirectory()) files.push(...(await htmlFiles(file)));
    else if (entry.name.endsWith(".html")) files.push(file);
  }
  return files;
}
const hashes = new Set();
for (const file of await htmlFiles(".next/server/app")) {
  const html = await readFile(file, "utf8");
  for (const match of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/g)) {
    if (!match[2] || /\bsrc\s*=/.test(match[1])) continue;
    hashes.add(
      `'sha256-${createHash("sha256").update(match[2]).digest("base64")}'`,
    );
  }
}
if (!hashes.size)
  throw new Error(
    "No hydration scripts found; refusing to produce an incomplete CSP.",
  );
const manifestPath = ".next/routes-manifest.json";
const manifest = JSON.parse(await readFile(manifestPath, "utf8"));
let updated = 0;
for (const rule of manifest.headers) {
  for (const header of rule.headers) {
    if (header.key.toLowerCase() !== "content-security-policy") continue;
    header.value = header.value.replace(
      /script-src[^;]*/,
      `script-src 'self' ${[...hashes].join(" ")}`,
    );
    updated++;
  }
}
if (!updated)
  throw new Error("Expected CSP header missing from the Next routes manifest.");
await writeFile(manifestPath, JSON.stringify(manifest));
await writeFile(".next/csp-hashes.json", JSON.stringify([...hashes], null, 2));
console.log(`CSP secured with ${hashes.size} exact inline-script hashes.`);
