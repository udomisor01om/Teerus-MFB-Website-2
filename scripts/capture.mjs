import { chromium } from "playwright";
import fs from "node:fs/promises";
const browser = await chromium.launch({ channel: "chrome" });
const page = await browser.newPage({
  viewport: { width: 1512, height: 1000 },
  reducedMotion: "reduce",
});
for (const route of ["/", "/individuals", "/business", "/about"]) {
  await page.goto(`http://127.0.0.1:3000${route}`);
  await page.evaluate(() => document.fonts.ready);
  for (
    let y = 0;
    y < (await page.evaluate(() => document.body.scrollHeight));
    y += 800
  ) {
    await page.evaluate((y) => scrollTo(0, y), y);
    await page.waitForTimeout(80);
  }
  await page.evaluate(() => scrollTo(0, 0));
  await page.waitForTimeout(500);
  const name = route === "/" ? "home" : route.slice(1);
  await page.screenshot({
    path: `docs/screenshots/${name}-desktop.png`,
    fullPage: true,
  });
  console.log(
    name,
    await page
      .locator("img")
      .evaluateAll((imgs) =>
        imgs.filter((i) => !i.complete || !i.naturalWidth).map((i) => i.src),
      ),
  );
}
await page.setViewportSize({ width: 390, height: 844 });
await page.goto("http://127.0.0.1:3000");
await page.evaluate(() => document.fonts.ready);
await page.screenshot({
  path: "docs/screenshots/home-mobile.png",
  fullPage: true,
});
await fs.writeFile(
  "docs/screenshots/capture-info.json",
  JSON.stringify(
    {
      date: new Date().toISOString(),
      browser: await browser.version(),
      width: 1512,
      mobileWidth: 390,
      reducedMotion: true,
    },
    null,
    2,
  ),
);
await browser.close();
