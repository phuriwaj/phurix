import { test, expect } from '@playwright/test';

/**
 * Behaviour tests for src/scripts/posthog-init.ts when PUBLIC_POSTHOG_KEY
 * is set. Intercepts the (fake) PostHog host to assert the SDK reached the
 * network — no real PostHog instance required.
 *
 * What we observe on init: posthog-js fetches `/array/<key>/config.js`,
 * `/array/<key>/config`, and `/flags/`. Capture calls POST to `/e/`. We
 * assert that the SDK reached the configured host (any of these paths).
 */

const PH_HOST = 'http://localhost:12345';

test.describe('posthog-configured', () => {
  test('home page load reaches configured PH host', async ({ page }) => {
    const phRequests: string[] = [];
    await page.route(`${PH_HOST}/**`, async (route) => {
      phRequests.push(new URL(route.request().url()).pathname);
      await route.fulfill({ status: 200, body: '{}', contentType: 'application/json' });
    });

    await page.goto('/');

    // SDK init MUST reach the configured host. Any of /array/ or /flags/
    // counts — they all originate from posthog-js once key + host are wired.
    await page.waitForRequest(
      (req) => req.url().startsWith(PH_HOST),
      { timeout: 15_000 }
    );

    expect(phRequests.length).toBeGreaterThan(0);
  });
});
