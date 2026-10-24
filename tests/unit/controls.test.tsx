import { fireEvent, render, screen } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import {
  Header,
  MotionRows,
  StoreLinks,
  BankingLink,
} from "@/components/Controls";
vi.mock("next/navigation", () => ({ usePathname: () => "/individuals" }));
describe("navigation and download controls", () => {
  it("identifies the current page and returns focus after Escape", () => {
    render(<Header />);
    expect(
      screen.getByRole("link", { name: "For Individuals" }),
    ).toHaveAttribute("aria-current", "page");
    const menu = screen.getByRole("button", { name: /Menu/ });
    fireEvent.click(menu);
    expect(menu).toHaveAttribute("aria-expanded", "true");
    fireEvent.keyDown(screen.getByRole("navigation"), { key: "Escape" });
    expect(menu).toHaveAttribute("aria-expanded", "false");
    expect(menu).toHaveFocus();
  });
  it("uses the user-confirmed store destinations", () => {
    render(<StoreLinks />);
    expect(
      screen.getByRole("link", { name: "Download on the App Store" }),
    ).toHaveAttribute(
      "href",
      "https://apps.apple.com/ng/app/teerus-mfb/id6779130255",
    );
    expect(
      screen.getByRole("link", { name: "Get it on Google Play" }),
    ).toHaveAttribute(
      "href",
      "https://play.google.com/store/apps/details?id=com.tyrus.mfb.mobile",
    );
  });
  it("uses the confirmed banking login and start URLs", () => {
    render(
      <>
        <BankingLink />
        <BankingLink destination="start">Start without Downloading</BankingLink>
      </>,
    );
    expect(screen.getByRole("link", { name: "Login" })).toHaveAttribute(
      "href",
      "https://onlinebanking.teerusbank.com/login",
    );
    expect(
      screen.getByRole("link", { name: "Start without Downloading" }),
    ).toHaveAttribute("href", "https://onlinebanking.teerusbank.com/");
    expect(screen.queryByText("Web banking link coming soon")).toBeNull();
  });
  it("lets visitors pause and resume moving content", () => {
    render(
      <MotionRows>
        <div>Cards</div>
      </MotionRows>,
    );
    fireEvent.click(screen.getByRole("button", { name: "Pause loan cards" }));
    expect(
      screen.getByRole("button", { name: "Resume loan cards" }),
    ).toHaveAttribute("aria-pressed", "true");
    fireEvent.click(screen.getByRole("button", { name: "Resume loan cards" }));
    expect(
      screen.getByRole("button", { name: "Pause loan cards" }),
    ).toHaveAttribute("aria-pressed", "false");
  });
});
