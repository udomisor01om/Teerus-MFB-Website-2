import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: "/:path*",
        headers: [
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=()",
          },
          {
            key: "Content-Security-Policy",
            value:
              "default-src 'self'; script-src 'self'" +
              (process.env.NODE_ENV === "development"
                ? " 'unsafe-inline' 'unsafe-eval'"
                : "") +
              "; style-src 'self' 'unsafe-inline'; img-src 'self' data: blob:; font-src 'self'; connect-src 'self'; frame-src 'none'; object-src 'none'; base-uri 'self'; form-action 'self'; frame-ancestors 'none'",
          },
          ...(process.env.SITE_ENV !== "production"
            ? [{ key: "X-Robots-Tag", value: "noindex, nofollow" }]
            : [
                { key: "Strict-Transport-Security", value: "max-age=31536000" },
              ]),
        ],
      },
    ];
  },
};
export default nextConfig;
