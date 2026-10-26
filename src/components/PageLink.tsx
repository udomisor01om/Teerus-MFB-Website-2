"use client";

import Link from "next/link";
import type { ComponentProps } from "react";

/** Start ordinary page navigation at the top, including same-page logo clicks. */
export function PageLink({
  onNavigate,
  ...props
}: ComponentProps<typeof Link>) {
  return (
    <Link
      {...props}
      onNavigate={(event) => {
        onNavigate?.(event);
        const href =
          typeof props.href === "string" ? props.href : props.href.href;
        if (href && !href.includes("#")) {
          window.scrollTo({ top: 0, left: 0, behavior: "instant" });
        }
      }}
    />
  );
}
