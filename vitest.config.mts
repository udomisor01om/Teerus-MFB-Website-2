import { defineConfig } from "vitest/config";
import { fileURLToPath } from "node:url";
export default defineConfig({
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
      "server-only": fileURLToPath(
        new URL("./tests/mocks/server-only.ts", import.meta.url),
      ),
    },
  },
  test: {
    environment: "jsdom",
    include: ["tests/unit/**/*.test.tsx"],
    setupFiles: ["./tests/setup.ts"],
  },
});
