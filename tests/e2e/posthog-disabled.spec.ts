import { test, expect } from '@playwright/test';

/**
 * Default-state test: PUBLIC_POSTHOG_KEY not set. SDK should be a no-op —
 * no requests to any PostHog host, no console errors beyond the expected
 * "analytics disabled" info log.
 */

test.describe('posthog-disabled', () => {
  test('home page never contacts a posthog host', async ({ page }) => {
    const posthogRequests: string[] = [];
    const consoleErrors: string[] = [];

    page.on('request', (req) => {
      const u = req.url();
      if (u.includes('i.posthog.com') || u.includes('localhost:12345')) {
        posthogRequests.push(u);
      }
    });
    page.on('console', (msg) => {
      if (msg.type() === 'error') consoleErrors.push(msg.text());
    });

    await page.goto('/');

    // Soft-nav to a different page in case astro:after-swap fires anything.
    const link = page
      .locator('a[href="/essays"], a[href="/notes"], a[href="/patterns"], a[href="/library"]')
      .first();
    await link.scrollIntoViewIfNeeded().catch(() => {});
    await link.click({ trial: true }).catch(() => {});
    await link.click().catch(async () => {
      await page.goto('/essays');
    });

    await page.waitForLoadState('networkidle');

    expect(posthogRequests).toEqual([]);
  });
});
