import { createHash, randomBytes } from "node:crypto";
import { NextResponse, type NextRequest } from "next/server";
import { bankStructuredData } from "./content/structured-data";
// Only CMS pages need request-specific script authorization. Marketing pages
// retain the existing static-build hashes and remain prerendered.
export function proxy(request: NextRequest) {
  const nonce = randomBytes(16).toString("base64");
  const bankHash = createHash("sha256")
    .update(bankStructuredData)
    .digest("base64");
  let localMedia = "";
  try {
    const url = new URL(process.env.CMS_URL || "");
    if (
      url.protocol === "http:" &&
      ["localhost", "127.0.0.1"].includes(url.hostname)
    )
      localMedia = ` ${url.origin}`;
  } catch {
    /* No local test media origin. */
  }
  const csp = `default-src 'self'; script-src 'self' 'nonce-${nonce}' 'sha256-${bankHash}'${process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : ""}; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob: https:${localMedia}; font-src 'self'; connect-src 'self'; frame-src https://www.youtube-nocookie.com https://player.vimeo.com; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'`;
  const headers = new Headers(request.headers);
  headers.set("Content-Security-Policy", csp);
  const response = NextResponse.next({ request: { headers } });
  response.headers.set("Content-Security-Policy", csp);
  response.headers.set("Cache-Control", "private, no-store");
  return response;
}
export const config = { matcher: ["/blog/:path*"] };
