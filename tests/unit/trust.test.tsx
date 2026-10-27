import { act, cleanup, fireEvent, render } from "@testing-library/react";
import { afterEach, beforeEach, expect, it, vi } from "vitest";
import { Trust } from "@/components/Trust";
let reduced = false;
beforeEach(() => {
  vi.useFakeTimers();
  vi.stubGlobal("matchMedia", (query: string) => ({
    matches: query.includes("700px") || reduced,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
  vi.stubGlobal(
    "IntersectionObserver",
    class {
      constructor(
        private callback: (entries: { isIntersecting: boolean }[]) => void,
      ) {}
      observe() {
        this.callback([{ isIntersecting: true }]);
      }
      disconnect() {}
    },
  );
});
afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.unstubAllGlobals();
  reduced = false;
});
const advance = async (ms: number) => {
  await act(async () => {
    await vi.advanceTimersByTimeAsync(ms);
  });
};
it("advances after four seconds, loops, and preserves the selected card during focus", async () => {
  const { getByRole } = render(<Trust />);
  const cbn = getByRole("button", { name: "Show Licensed by CBN" });
  await advance(3999);
  expect(cbn.getAttribute("aria-current")).toBe("true");
  await advance(1);
  expect(
    getByRole("button", { name: "Show NDIC" }).getAttribute("aria-current"),
  ).toBe("true");
  await advance(300);
  await advance(4000);
  await advance(300);
  await advance(4000);
  await advance(300);
  expect(cbn.getAttribute("aria-current")).toBe("true");
  fireEvent.focus(cbn);
  await advance(9000);
  expect(cbn.getAttribute("aria-current")).toBe("true");
});
it("retains manual pagination and swipe with reduced motion, with autoplay disabled", async () => {
  reduced = true;
  const { getByRole } = render(<Trust />);
  const ndpc = getByRole("button", { name: "Show NDPC" });
  fireEvent.click(ndpc);
  await advance(12000);
  expect(ndpc.getAttribute("aria-current")).toBe("true");
  const viewport = getByRole("region", {
    name: "Built on Trust",
  }).firstElementChild!;
  fireEvent.touchStart(viewport, { touches: [{ clientX: 250, clientY: 100 }] });
  fireEvent.touchEnd(viewport, {
    changedTouches: [{ clientX: 100, clientY: 102 }],
  });
  expect(
    getByRole("button", { name: "Show Licensed by CBN" }).getAttribute(
      "aria-current",
    ),
  ).toBe("true");
});
it("restarts the full delay after a manual swipe and ignores vertical gestures", async () => {
  const { getByRole } = render(<Trust />);
  const viewport = getByRole("region", {
    name: "Built on Trust",
  }).firstElementChild!;
  await advance(3900);
  fireEvent.touchStart(viewport, { touches: [{ clientX: 250, clientY: 100 }] });
  fireEvent.touchEnd(viewport, {
    changedTouches: [{ clientX: 100, clientY: 102 }],
  });
  await advance(300);
  await advance(3999);
  expect(
    getByRole("button", { name: "Show NDIC" }).getAttribute("aria-current"),
  ).toBe("true");
  await advance(1);
  expect(
    getByRole("button", { name: "Show NDPC" }).getAttribute("aria-current"),
  ).toBe("true");
  await advance(300);
  fireEvent.touchStart(viewport, { touches: [{ clientX: 200, clientY: 100 }] });
  fireEvent.touchEnd(viewport, {
    changedTouches: [{ clientX: 190, clientY: 250 }],
  });
  expect(
    getByRole("button", { name: "Show NDPC" }).getAttribute("aria-current"),
  ).toBe("true");
});
