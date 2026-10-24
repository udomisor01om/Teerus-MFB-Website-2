import { act, render, cleanup } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { HeroPeople } from "@/components/HeroPeople";

let reduced = false;
beforeEach(() => {
  vi.useFakeTimers();
  vi.stubGlobal("matchMedia", () => ({
    matches: reduced,
    addEventListener: vi.fn(),
    removeEventListener: vi.fn(),
  }));
  Object.defineProperty(HTMLImageElement.prototype, "naturalWidth", {
    configurable: true,
    get: () => 1006,
  });
  HTMLImageElement.prototype.decode = vi.fn().mockResolvedValue(undefined);
});
afterEach(() => {
  cleanup();
  vi.useRealTimers();
  vi.unstubAllGlobals();
  reduced = false;
});
const active = (container: HTMLElement) =>
  [...container.querySelectorAll("img")].findIndex((img) =>
    img.className.includes("active"),
  );
describe("hero person dissolve", () => {
  it("holds the first person for 3 seconds and subsequent people for the dissolve plus 3 seconds", async () => {
    const { container } = render(<HeroPeople />);
    await act(async () => {
      await vi.advanceTimersByTimeAsync(2999);
    });
    expect(active(container)).toBe(0);
    await act(async () => {
      await vi.advanceTimersByTimeAsync(1);
    });
    expect(active(container)).toBe(1);
    await act(async () => {
      await vi.advanceTimersByTimeAsync(3199);
    });
    expect(active(container)).toBe(1);
    await act(async () => {
      await vi.advanceTimersByTimeAsync(1);
    });
    expect(active(container)).toBe(2);
    await act(async () => {
      await vi.advanceTimersByTimeAsync(6400);
    });
    expect(active(container)).toBe(0);
  });
  it("keeps the current person visible until the next image decodes", async () => {
    let finish: () => void = () => {};
    vi.mocked(HTMLImageElement.prototype.decode).mockImplementation(function (
      this: HTMLImageElement,
    ) {
      return this.src.includes("mechanic")
        ? new Promise<void>((resolve) => {
            finish = resolve;
          })
        : Promise.resolve();
    });
    const { container } = render(<HeroPeople />);
    await act(async () => {
      await vi.advanceTimersByTimeAsync(6000);
    });
    expect(active(container)).toBe(0);
    await act(async () => {
      finish();
    });
    expect(active(container)).toBe(1);
  });
  it("keeps a static first image with reduced motion", async () => {
    reduced = true;
    const { container } = render(<HeroPeople />);
    await act(async () => {
      await vi.advanceTimersByTimeAsync(20000);
    });
    expect(active(container)).toBe(0);
    expect(vi.getTimerCount()).toBe(0);
  });
});
