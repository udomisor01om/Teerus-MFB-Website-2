import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { Download } from "@/components/Controls";
vi.mock("next/navigation", () => ({ usePathname: () => "/" }));
describe("branded download dialog", () => {
  it("opens, switches real store QR codes and restores trigger focus on close", () => {
    HTMLDialogElement.prototype.showModal = function () {
      this.setAttribute("open", "");
    };
    HTMLDialogElement.prototype.close = function () {
      this.removeAttribute("open");
      this.dispatchEvent(new Event("close"));
    };
    render(<Download />);
    const trigger = screen.getByRole("button", { name: "Download app" });
    fireEvent.click(trigger);
    expect(screen.getByRole("dialog")).toHaveAccessibleName(
      "Take Teerus with you.",
    );
    expect(
      screen.getByAltText("Scan to download Teerus from the App Store"),
    ).toHaveAttribute("src", "/assets/teerus-apple-qr.svg");
    fireEvent.click(
      screen.getByRole("button", { name: "Android" }),
    );
    expect(
      screen.getByAltText("Scan to download Teerus from Google Play"),
    ).toHaveAttribute("src", "/assets/teerus-google-qr.svg");
    expect(
      screen.getByRole("button", { name: "Android" }),
    ).toHaveAttribute("aria-pressed", "true");
    expect(
      screen.getByRole("link", { name: "Get it on Google Play" }),
    ).toHaveAttribute(
      "href",
      "https://play.google.com/store/apps/details?id=com.tyrus.mfb.mobile",
    );
    fireEvent.click(
      screen.getByRole("button", { name: "Close download choices" }),
    );
    expect(screen.queryByRole("dialog")).toBeNull();
    expect(trigger).toHaveFocus();
  });
});
