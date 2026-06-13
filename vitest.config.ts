import { defineConfig } from "vitest/config";

/**
 * Pure-function test runner. Components / DOM tests are out of scope — we focus
 * on the deterministic modules under ui/app (e.g. data/ formatters, catalog
 * builders). No test files ship yet; `--passWithNoTests` keeps CI green until
 * the first one lands.
 */
export default defineConfig({
  test: {
    environment: "node",
    include: ["ui/app/**/*.test.ts"],
    reporters: ["default"],
    coverage: {
      provider: "v8",
      include: ["ui/app/data/**", "ui/app/pages/AttributeAudit/**"],
      reporter: ["text", "json-summary"],
    },
  },
});
