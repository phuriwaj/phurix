import { defineConfig, devices } from '@playwright/test';

/**
 * Playwright config for analytics smoke tests against the static site.
 *
 * Two projects exercise the two branches of src/scripts/posthog-init.ts:
 *   - posthog-configured — PUBLIC_POSTHOG_KEY is set; SDK inits, capture path
 *     reaches the network. We intercept `http://localhost:12345/**` to assert
 *     payloads (no real PostHog instance needed).
 *   - posthog-disabled   — PUBLIC_POSTHOG_KEY is empty. SDK should be a no-op:
 *     zero requests to any posthog host, no console errors.
 *
 * Server orchestration lives in tests/e2e/run.sh — it spawns both preview
 * servers in the right order and tears them down on exit. Each project just
 * pins a baseURL so Playwright knows where the pre-built static site lives.
 */
export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: false,
  workers: 1,
  reporter: [['list']],

  use: {
    trace: 'retain-on-failure',
  },

  projects: [
    {
      name: 'posthog-configured',
      testMatch: /posthog-configured\.spec\.ts$/,
      use: { ...devices['Desktop Chrome'], baseURL: 'http://localhost:4321' },
    },
    {
      name: 'posthog-disabled',
      testMatch: /posthog-disabled\.spec\.ts$/,
      use: { ...devices['Desktop Chrome'], baseURL: 'http://localhost:4322' },
    },
  ],
});
