/** Public CMS block contract supplied by the CMS owner. */
import type { Brand, Post } from "./types";
export type Relationship<T> = number | T;
export type MediaSize = {
  url?: string | null;
  width?: number | null;
  height?: number | null;
  mimeType?: string | null;
  filesize?: number | null;
  filename?: string | null;
};
export type Media = MediaSize & {
  id: number;
  brand: Relationship<Brand>;
  updatedAt: string;
  createdAt: string;
  alt: string;
  caption?: string | null;
  credit?: string | null;
  thumbnailURL?: string | null;
  focalX?: number | null;
  focalY?: number | null;
  sizes?: { thumbnail?: MediaSize; card?: MediaSize; hero?: MediaSize };
};
export type RichTextNode = {
  type: string;
  version: number;
  [key: string]: unknown;
};
export type RichText = {
  root: {
    type: string;
    children: RichTextNode[];
    direction: "ltr" | "rtl" | null;
    format: "left" | "start" | "center" | "right" | "end" | "justify" | "";
    indent: number;
    version: number;
  };
  [key: string]: unknown;
};
export type BlockMeta = { id?: string | null; blockName?: string | null };
export type ContentBlock = BlockMeta &
  (
    | { blockType: "richText"; content: RichText }
    | { blockType: "heading"; text: string; level?: "h2" | "h3" | "h4" | null }
    | {
        blockType: "image";
        image: Relationship<Media>;
        caption?: string | null;
      }
    | {
        blockType: "gallery";
        images?: Array<{
          image: Relationship<Media>;
          id?: string | null;
        }> | null;
      }
    | { blockType: "quote"; quote: string; attribution?: string | null }
    | {
        blockType: "callout";
        title?: string | null;
        body: string;
        tone?: "info" | "success" | "warning" | null;
      }
    | { blockType: "button"; label: string; url: string }
    | { blockType: "embed"; url: string; title: string }
    | { blockType: "code"; code: string; language?: string | null }
    | {
        blockType: "table";
        rows?: Array<{
          cells?: Array<{ value: string; id?: string | null }> | null;
          id?: string | null;
        }> | null;
      }
    | { blockType: "divider" }
    | { blockType: "relatedContent"; posts: Array<Relationship<Post>> }
  );

export function safeContentURL(value: unknown): string | undefined {
  if (typeof value !== "string" || !value || /[\u0000-\u0020\\]/.test(value))
    return;
  if (value.startsWith("/") && !value.startsWith("//")) return value;
  if (value.startsWith("#")) return value;
  try {
    const url = new URL(value);
    if (
      ["https:", "mailto:", "tel:"].includes(url.protocol) &&
      !url.username &&
      !url.password
    )
      return url.href;
  } catch {
    /* Invalid URLs render as plain text, never executable links. */
  }
}
export function mediaURL(value: unknown, cmsURL: string): string | undefined {
  if (
    typeof value !== "string" ||
    !value ||
    /[\u0000-\u0020\\]/.test(value) ||
    value.startsWith("//")
  )
    return;
  try {
    const url = new URL(value, cmsURL);
    if (
      (url.protocol === "https:" ||
        (url.protocol === "http:" &&
          ["localhost", "127.0.0.1"].includes(url.hostname) &&
          url.origin === new URL(cmsURL).origin)) &&
      !url.username &&
      !url.password
    )
      return url.href;
  } catch {
    /* Missing or malformed media is an editorial fallback. */
  }
}

/** Only known video providers become frames; all other embeds remain links. */
export function embedURL(value: string): string | undefined {
  const safe = safeContentURL(value);
  if (!safe) return;
  try {
    const url = new URL(safe);
    if (
      [
        "www.youtube.com",
        "youtube.com",
        "youtu.be",
        "www.youtube-nocookie.com",
      ].includes(url.hostname)
    ) {
      const id =
        url.hostname === "youtu.be"
          ? url.pathname.slice(1)
          : url.pathname.startsWith("/embed/")
            ? url.pathname.slice(7)
            : url.searchParams.get("v");
      if (id && /^[a-zA-Z0-9_-]{11}$/.test(id))
        return `https://www.youtube-nocookie.com/embed/${id}`;
    }
    if (
      ["vimeo.com", "www.vimeo.com", "player.vimeo.com"].includes(url.hostname)
    ) {
      const id = url.pathname.split("/").filter(Boolean).at(-1);
      if (id && /^\d+$/.test(id)) return `https://player.vimeo.com/video/${id}`;
    }
  } catch {
    /* Not an embeddable video URL. */
  }
}
