import { describe, expect, it, vi, afterEach } from "vitest";
import { fireEvent, render, screen } from "@testing-library/react";
import { translate } from "@/i18n/translate";
import {
  products,
  loans,
  values,
  individualAccounts,
  businessAccounts,
  testimonials,
} from "@/content/marketing";
import { LanguageProvider, LanguageSelector, T } from "@/i18n/Language";
import { isLanguage } from "@/i18n/config";
vi.mock("@/i18n/config", async (importOriginal) => ({
  ...(await importOriginal<object>()),
  translationsEnabled: true,
}));
afterEach(() => localStorage.clear());
describe("manually maintained languages", () => {
  it("preserves English exactly and falls back safely for new content", () => {
    expect(translate(" Hello, Teerus. ", "en")).toBe(" Hello, Teerus. ");
    expect(translate("A new CMS article", "yo")).toBe("A new CMS article");
    expect(translate(" Login ", "yo")).toBe(" Wọlé ");
    expect(isLanguage("constructor")).toBe(false);
  });
  it("covers all current product, account, loan, value and testimonial copy", () => {
    const strings = [
      ...products,
      ...loans,
      ...individualAccounts,
      ...businessAccounts,
    ].flatMap((x) => [x.name, x.description]);
    strings.push(
      ...values.flatMap(([title, body]) => [title, body]),
      ...testimonials.map((x) => x.quote),
    );
    for (const language of ["yo", "ha", "ig"] as const)
      for (const text of strings.filter((x) => x !== "Esusu"))
        expect(translate(text, language), `${language}: ${text}`).not.toBe(
          text,
        );
  });
  it("switches and restores English without changing the source copy", () => {
    render(
      <LanguageProvider>
        <LanguageSelector />
        <p>
          <T>Login</T>
        </p>
      </LanguageProvider>,
    );
    fireEvent.click(screen.getByRole("button", { name: /Language/ }));
    fireEvent.click(screen.getByRole("button", { name: "Hausa" }));
    expect(screen.getByText("Shiga")).toBeInTheDocument();
    expect(document.documentElement.lang).toBe("ha");
    expect(localStorage.getItem("teerus-language")).toBe("ha");
    fireEvent.click(screen.getByRole("button", { name: /Language/ }));
    fireEvent.click(screen.getByRole("button", { name: "English" }));
    expect(screen.getByText("Login")).toBeInTheDocument();
    expect(document.documentElement.lang).toBe("en-NG");
  });
});
