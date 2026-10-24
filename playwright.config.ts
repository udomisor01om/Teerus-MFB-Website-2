import { defineConfig, devices } from "@playwright/test";
export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  workers: 3,
  use: {
    baseURL: process.env.TEST_BASE_URL || "http://127.0.0.1:3000",
    trace: "retain-on-failure",
  },
  reporter: [["list"], ["html", { open: "never" }]],
  projects: [
    {
      name: "chromium",
      use: {
        ...devices["Desktop Chrome"],
        ...(process.env.PLAYWRIGHT_CHROME ? { channel: "chrome" } : {}),
        viewport: { width: 1512, height: 1000 },
      },
    },
    { name: "firefox", use: { ...devices["Desktop Firefox"] } },
    { name: "webkit", use: { ...devices["Desktop Safari"] } },
    { name: "mobile", use: { ...devices["iPhone 13"] } },
  ],
});
