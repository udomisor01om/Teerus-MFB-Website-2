/* eslint-disable @next/next/no-img-element -- CMS media retains native aspect ratios; no optimizer or remote-host dependency. */
import { Fragment, type ReactNode } from "react";
import type {
  ContentBlock,
  Media,
  Relationship,
  RichTextNode,
} from "@/lib/cms/blocks";
import { embedURL, mediaURL, safeContentURL } from "@/lib/cms/blocks";
import s from "./CMSBlocks.module.css";

function MissingMedia() {
  return <p className={s.unavailable}>This image is currently unavailable.</p>;
}
export function CMSMedia({
  media,
  cmsURL,
  caption,
}: {
  media: Relationship<Media>;
  cmsURL: string;
  caption?: string | null;
}) {
  const item = media && typeof media === "object" ? media : undefined;
  const src = mediaURL(item?.url, cmsURL);
  if (!item || !src) return <MissingMedia />;
  return (
    <figure className={s.figure}>
      <img
        src={src}
        alt={typeof item.alt === "string" ? item.alt : ""}
        loading="lazy"
        decoding="async"
        width={item.width && item.width > 0 ? item.width : undefined}
        height={item.height && item.height > 0 ? item.height : undefined}
      />
      {(caption || item.caption || item.credit) && (
        <figcaption>
          {caption || item.caption}
          {item.credit && <span>Credit: {item.credit}</span>}
        </figcaption>
      )}
    </figure>
  );
}
function object(value: unknown): Record<string, unknown> | undefined {
  return value !== null && typeof value === "object" && !Array.isArray(value)
    ? (value as Record<string, unknown>)
    : undefined;
}
function text(value: unknown) {
  return typeof value === "string" ? value : "";
}
function RichNodes({
  nodes,
  cmsURL,
  depth = 0,
}: {
  nodes: unknown;
  cmsURL: string;
  depth?: number;
}): ReactNode {
  if (!Array.isArray(nodes) || depth > 30) return null;
  return nodes.map((value, i) => {
    const node = object(value);
    if (!node) return null;
    const children = (
      <RichNodes nodes={node.children} cmsURL={cmsURL} depth={depth + 1} />
    );
    let content: ReactNode;
    switch (node.type) {
      case "text": {
        content = text(node.text);
        const format = typeof node.format === "number" ? node.format : 0;
        if (format & 1) content = <strong>{content}</strong>;
        if (format & 2) content = <em>{content}</em>;
        if (format & 4) content = <s>{content}</s>;
        if (format & 8) content = <u>{content}</u>;
        if (format & 16) content = <code>{content}</code>;
        if (format & 32) content = <sub>{content}</sub>;
        if (format & 64) content = <sup>{content}</sup>;
        break;
      }
      case "paragraph":
        content = <p>{children}</p>;
        break;
      case "heading": {
        const Heading =
          node.tag === "h3" ? "h3" : node.tag === "h4" ? "h4" : "h2";
        content = <Heading>{children}</Heading>;
        break;
      }
      case "list":
        content =
          node.listType === "number" ? (
            <ol start={typeof node.start === "number" ? node.start : undefined}>
              {children}
            </ol>
          ) : (
            <ul>{children}</ul>
          );
        break;
      case "listitem":
        content = <li>{children}</li>;
        break;
      case "quote":
        content = <blockquote>{children}</blockquote>;
        break;
      case "linebreak":
        content = <br />;
        break;
      case "link":
      case "autolink": {
        const fields = object(node.fields);
        const doc = object(fields?.doc);
        const related = object(doc?.value);
        const internal =
          doc?.relationTo === "posts" && typeof related?.slug === "string"
            ? `/blog/${encodeURIComponent(related.slug)}`
            : undefined;
        const href = internal || safeContentURL(fields?.url ?? node.url);
        content = href ? <a href={href}>{children}</a> : children;
        break;
      }
      case "upload": {
        const media = object(node.value);
        content = media ? (
          <CMSMedia media={media as Media} cmsURL={cmsURL} />
        ) : (
          <MissingMedia />
        );
        break;
      }
      default:
        content = children;
    }
    return <Fragment key={i}>{content}</Fragment>;
  });
}
export function CMSBlocks({
  blocks,
  cmsURL,
}: {
  blocks: readonly ContentBlock[];
  cmsURL: string;
}) {
  return (
    <div className={s.blocks}>
      {blocks.map((block, i) => {
        if (!block || typeof block !== "object") return null;
        const key = `${block.id || block.blockType}-${i}`;
        switch (block.blockType) {
          case "heading": {
            const Heading =
              block.level === "h3" ? "h3" : block.level === "h4" ? "h4" : "h2";
            return (
              <Heading id={`section-${i}`} key={key}>
                {text(block.text)}
              </Heading>
            );
          }
          case "richText":
            return (
              <div key={key} dir={block.content?.root?.direction || undefined}>
                <RichNodes
                  nodes={block.content?.root?.children as RichTextNode[]}
                  cmsURL={cmsURL}
                />
              </div>
            );
          case "image":
            return (
              <CMSMedia
                key={key}
                media={block.image}
                caption={block.caption}
                cmsURL={cmsURL}
              />
            );
          case "gallery":
            return (
              <div key={key} className={s.gallery}>
                {Array.isArray(block.images) &&
                  block.images.map((item, n) => (
                    <CMSMedia
                      key={`${item.id || n}-${n}`}
                      media={item.image}
                      cmsURL={cmsURL}
                    />
                  ))}
              </div>
            );
          case "quote":
            return (
              <figure key={key}>
                <blockquote>{text(block.quote)}</blockquote>
                {block.attribution && (
                  <figcaption>— {text(block.attribution)}</figcaption>
                )}
              </figure>
            );
          case "callout":
            return (
              <aside
                key={key}
                className={s.callout}
                data-tone={block.tone || "info"}
              >
                {block.title && <h3>{text(block.title)}</h3>}
                <p>{text(block.body)}</p>
              </aside>
            );
          case "button": {
            const href = safeContentURL(block.url);
            return href ? (
              <p key={key}>
                <a className={s.button} href={href}>
                  {text(block.label)}
                </a>
              </p>
            ) : (
              <p key={key}>{text(block.label)}</p>
            );
          }
          case "embed": {
            const href = safeContentURL(block.url);
            const frame = embedURL(block.url);
            return (
              <aside className={s.embed} key={key}>
                {frame && (
                  <iframe
                    src={frame}
                    title={text(block.title) || "Embedded video"}
                    loading="lazy"
                    sandbox="allow-scripts allow-same-origin allow-presentation"
                    allow="fullscreen"
                    referrerPolicy="no-referrer"
                  />
                )}
                <p>{text(block.title)}</p>
                {href ? (
                  <a href={href} target="_blank" rel="noopener noreferrer">
                    Open embedded content ↗
                    <span className={s.srOnly}> (opens in a new tab)</span>
                  </a>
                ) : (
                  <p>This embedded content is unavailable.</p>
                )}
              </aside>
            );
          }
          case "code":
            return (
              <figure key={key}>
                {block.language && (
                  <figcaption>{text(block.language)}</figcaption>
                )}
                <pre tabIndex={0} aria-label="Code example">
                  <code>{text(block.code)}</code>
                </pre>
              </figure>
            );
          case "table":
            return (
              <div
                key={key}
                className={s.table}
                role="region"
                aria-label={block.blockName || "Article table"}
                tabIndex={0}
              >
                <table>
                  <tbody>
                    {Array.isArray(block.rows) &&
                      block.rows.map((row, n) => (
                        <tr key={`${row.id || n}-${n}`}>
                          {Array.isArray(row.cells) &&
                            row.cells.map((cell, m) => (
                              <td key={`${cell.id || m}-${m}`}>
                                {text(cell.value)}
                              </td>
                            ))}
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            );
          case "divider":
            return <hr key={key} />;
          case "relatedContent":
            return (
              <aside key={key} className={s.related}>
                <h2>Related stories</h2>
                <ul>
                  {Array.isArray(block.posts) &&
                    block.posts.map((post, n) => (
                      <li key={n}>
                        {typeof post === "object" &&
                        post &&
                        typeof post.slug === "string" &&
                        typeof post.title === "string" &&
                        post._status === "published" ? (
                          <a href={`/blog/${encodeURIComponent(post.slug)}`}>
                            {post.title}
                          </a>
                        ) : (
                          <span>Related story currently unavailable.</span>
                        )}
                      </li>
                    ))}
                </ul>
              </aside>
            );
          default:
            return null;
        }
      })}
    </div>
  );
}
