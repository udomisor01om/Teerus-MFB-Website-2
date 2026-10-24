"use client";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
let auditQueue: Promise<void> = Promise.resolve();
/** Development-only audit output; excluded from production rendering. */
export function DevAudit() {
  const pathname = usePathname();
  const [report, setReport] = useState("pending");
  useEffect(() => {
    let cancelled = false;
    const timer = setTimeout(() => {
      auditQueue = auditQueue
        .then(async () => {
          if (cancelled) return;
          const axe = (await import("axe-core")).default;
          await document.fonts.ready;
          const position = { left: window.scrollX, top: window.scrollY };
          const results = await axe.run(document, {
            runOnly: {
              type: "tag",
              values: ["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"],
            },
          });
          window.scrollTo({ ...position, behavior: "instant" });
          if (!cancelled)
            setReport(
              JSON.stringify({
                pathname,
                violations: results.violations.map((v) => ({
                  id: v.id,
                  impact: v.impact,
                  description: v.description,
                  nodes: v.nodes.map((n) => ({
                    target: n.target,
                    summary: n.failureSummary,
                  })),
                })),
                passes: results.passes.length,
              }),
            );
        })
        .catch((error: unknown) => {
          if (!cancelled)
            setReport(JSON.stringify({ pathname, error: String(error) }));
        });
    }, 1000);
    return () => {
      cancelled = true;
      clearTimeout(timer);
    };
  }, [pathname]);
  return (
    <output id="development-accessibility-audit" hidden>
      {report}
    </output>
  );
}
