import { defineConfig } from '@playwright/test';

/**
 * Live PostHog smoke config. Points at the live preview on :4323 (built
 * with the real phc_ key from .env), intercepts real POSTs to
 * eu.i.posthog.com/e/ — no mocks.
 *
 * The configured/disabled specs in playwright.config.ts use :4321/:4322
 * with phc_e2e_test_key against a mock host. This one is a separate
 * playwright project so the two never collide.
 */
export default defineConfig({
  testDir: './tests/e2e',
  testMatch: /posthog-live\.spec\.ts$/,
  fullyParallel: false,
  workers: 1,
  reporter: 'list',
  use: {
    baseURL: 'https://localhost:4323',
    headless: true,
    viewport: { width: 1280, height: 800 },
    actionTimeout: 10_000,
    // Accept the self-signed cert from tests/e2e/run-live.sh.
    ignoreHTTPSErrors: true,
  },
  timeout: 120_000,
  expect: { timeout: 20_000 },
});