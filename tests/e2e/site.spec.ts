import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

for (const route of [
  "/",
  "/individuals",
  "/business",
  "/about",
  "/privacy-policy",
  "/terms-and-conditions",
]) {
  test(`${route} renders accessible content and local assets`, async ({
    page,
  }) => {
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await page.goto(route);
    await expect(page.locator("h1")).toBeVisible();
    await page.evaluate(() => document.fonts.ready);
    const results = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21aa", "wcag22aa"])
      .analyze();
    expect(results.violations).toEqual([]);
    expect(errors).toEqual([]);
    expect(await page.locator('a[href="#"]').count()).toBe(0);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    );
    expect(overflow).toBe(false);
    await expect(page.locator('meta[name="robots"]')).toHaveAttribute(
      "content",
      /noindex/,
    );
  });
}
test("download chooser contains verified destinations and restores focus", async ({
  page,
}) => {
  await page.goto("/");
  const button = page
    .getByRole("button", { name: "Download Teerus App" })
    .first();
  await button.click();
  const dialog = page.getByRole("dialog");
  await expect(dialog).toBeVisible();
  await expect(
    dialog.getByRole("link", { name: "Download on the App Store" }),
  ).toHaveAttribute(
    "href",
    "https://apps.apple.com/ng/app/teerus-mfb/id6779130255",
  );
  await expect(
    dialog.getByRole("link", { name: "Get it on Google Play" }),
  ).toHaveAttribute(
    "href",
    "https://play.google.com/store/apps/details?id=com.tyrus.mfb.mobile",
  );
  await page.keyboard.press("Escape");
  await expect(dialog).not.toBeVisible();
  await expect(button).toBeFocused();
});
test("mobile menu opens, closes with Escape and navigates", async ({
  page,
}) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/");
  const menu = page.getByRole("button", { name: /Menu/ });
  await menu.click();
  await expect(menu).toHaveAttribute("aria-expanded", "true");
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "Individuals" })
    .focus();
  await page.keyboard.press("Escape");
  await expect(menu).toHaveAttribute("aria-expanded", "false");
  await expect(menu).toBeFocused();
  await menu.click();
  await page
    .getByRole("navigation", { name: "Main navigation" })
    .getByRole("link", { name: "Individuals" })
    .click();
  await expect(page).toHaveURL(/\/individuals$/);
  await expect(page.locator("h1")).toContainText("Save smart.");
});
test("product carousel works with keyboard and buttons", async ({ page }) => {
  await page.goto("/");
  await page.emulateMedia({ reducedMotion: "reduce" });
  const region = page.getByRole("region", { name: "products", exact: true });
  await region.focus();
  await page.keyboard.press("ArrowRight");
  await expect
    .poll(() => region.evaluate((el) => el.scrollLeft))
    .toBeGreaterThan(0);
  await page.getByRole("button", { name: "Previous products" }).click();
  await expect.poll(() => region.evaluate((el) => el.scrollLeft)).toBe(0);
});
test("animation pauses and respects reduced motion", async ({ page }) => {
  await page.goto("/");
  const pause = page.getByRole("button", { name: "Pause loan cards" });
  await pause.click();
  await expect(pause).toHaveAttribute("aria-pressed", "true");
  await expect(
    page.getByRole("button", { name: "Resume loan cards" }),
  ).toBeVisible();
  await page.emulateMedia({ reducedMotion: "reduce" });
  await expect(pause).not.toBeVisible();
});
test("404 and preview security headers", async ({ page }) => {
  const response = await page.goto("/missing-page");
  expect(response?.status()).toBe(404);
  expect(response?.headers()["x-robots-tag"]).toBe("noindex, nofollow");
  expect(response?.headers()["content-security-policy"]).toContain(
    "frame-ancestors 'none'",
  );
  await expect(page.getByRole("link", { name: "Back to home" })).toBeVisible();
});
test("narrow layouts have no page overflow", async ({ page }) => {
  for (const width of [320, 768, 1024]) {
    await page.setViewportSize({ width, height: 900 });
    for (const route of ["/", "/individuals", "/business", "/about"]) {
      await page.goto(route);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
        `${route} at ${width}`,
      ).toBe(true);
    }
  }
});
