import { describe, expect, it } from "vitest";
import privacy from "../../content/legal/privacy-policy.json";
import terms from "../../content/legal/terms-and-conditions.json";

describe("published legal documents", () => {
  for (const [name, document, count] of [
    ["privacy policy", privacy, 14],
    ["terms and conditions", terms, 26],
  ] as const) {
    it(`${name} retains body copy under every published heading`, () => {
      expect(document.sections).toHaveLength(count);
      for (const section of document.sections) {
        expect(section.blocks.length, section.title).toBeGreaterThan(0);
        expect(
          section.blocks.some(
            (block) => block.type === "p" && block.text.trim().length > 50,
          ),
          section.title,
        ).toBe(true);
      }
    });
  }
});
