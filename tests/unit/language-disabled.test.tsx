import { render, screen } from "@testing-library/react";
import { expect, it, vi } from "vitest";
import { LanguageProvider, LanguageSelector, T } from "@/i18n/Language";
vi.mock("@/i18n/config", async (original) => ({
  ...(await original<object>()),
  translationsEnabled: false,
}));
it("restores English-only mode even when a visitor previously selected another language", () => {
  localStorage.setItem("teerus-language", "ig");
  render(
    <LanguageProvider>
      <LanguageSelector />
      <T>Login</T>
    </LanguageProvider>,
  );
  expect(
    screen.queryByRole("button", { name: /Language/ }),
  ).not.toBeInTheDocument();
  expect(screen.getByText("Login")).toBeInTheDocument();
  expect(document.documentElement.lang).toBe("en-NG");
  localStorage.clear();
});
