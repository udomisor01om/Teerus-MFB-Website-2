import { act, render, cleanup } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";
import { IndividualsArtwork } from "@/components/IndividualsArtwork";
import { BusinessArtwork } from "@/components/BusinessArtwork";
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
  it("retries a transient first-image decode failure", async () => {
    vi.mocked(HTMLImageElement.prototype.decode).mockRejectedValueOnce(
      new Error("decode interrupted"),
    );
    const { container } = render(<HeroPeople />);
    await act(async () => {
      await vi.advanceTimersByTimeAsync(4000);
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

it("cycles the two Individuals images without changing their geometry", async () => {
  const { container } = render(<IndividualsArtwork />);
  const hand = container.querySelector('img[src*="gradient-hand-holding"]')!;
  const woman = container.querySelector('img[src*="Green woman"]')!;
  expect(hand.parentElement!.className).toContain("active");
  const initialClass = hand.className;
  await act(async () => {
    await vi.advanceTimersByTimeAsync(3000);
  });
  expect(woman.parentElement!.className).toContain("active");
  expect(hand.parentElement!.className).not.toContain("active");
  await act(async () => {
    await vi.advanceTimersByTimeAsync(3200);
  });
  expect(hand.parentElement!.className).toContain("active");
  expect(hand.className).toBe(initialClass);
});

it("keeps Individuals artwork static with reduced motion", async () => {
  reduced = true;
  const { container } = render(<IndividualsArtwork />);
  await act(async () => {
    await vi.advanceTimersByTimeAsync(20000);
  });
  expect(
    container.querySelector('img[src*="gradient-hand-holding"]')!.parentElement!
      .className,
  ).toContain("active");
  expect(
    container.querySelector('img[src*="Green woman"]')!.parentElement!
      .className,
  ).not.toContain("active");
});

describe("SME photo rotation", () => {
  it("holds the market image for 3 seconds, then each photo for a 200ms dissolve plus 3 seconds", async () => {
    const { container } = render(<BusinessArtwork />);
    const variant = () =>
      container.firstElementChild?.getAttribute("data-variant");
    await act(async () => {
      await vi.advanceTimersByTimeAsync(2999);
    });
    expect(variant()).toBe("0");
    await act(async () => {
      await vi.advanceTimersByTimeAsync(1);
    });
    expect(variant()).toBe("1");
    await act(async () => {
      await vi.advanceTimersByTimeAsync(3199);
    });
    expect(variant()).toBe("1");
    await act(async () => {
      await vi.advanceTimersByTimeAsync(1);
    });
    expect(variant()).toBe("0");
  });
  it("keeps the market photo visible while the shop photo is still decoding", async () => {
    let finish = () => {};
    vi.mocked(HTMLImageElement.prototype.decode).mockImplementation(function (
      this: HTMLImageElement,
    ) {
      return this.src.includes("shop-owner")
        ? new Promise<void>((resolve) => {
            finish = resolve;
          })
        : Promise.resolve();
    });
    const { container } = render(<BusinessArtwork />);
    await act(async () => {
      await vi.advanceTimersByTimeAsync(10000);
    });
    expect(container.firstElementChild).toHaveAttribute("data-variant", "0");
    await act(async () => {
      finish();
    });
    expect(container.firstElementChild).toHaveAttribute("data-variant", "1");
  });
  it("shows the initial market photo without timers for reduced motion", async () => {
    reduced = true;
    const { container } = render(<BusinessArtwork />);
    await act(async () => {
      await vi.advanceTimersByTimeAsync(20000);
    });
    expect(container.firstElementChild).toHaveAttribute("data-variant", "0");
    expect(vi.getTimerCount()).toBe(0);
  });
});
