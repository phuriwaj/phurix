import { test, expect } from '@playwright/test';

/**
 * Behaviour tests for src/scripts/posthog-init.ts when PUBLIC_POSTHOG_KEY
 * is set. Intercepts the (fake) PostHog host to assert the SDK reached the
 * network — no real PostHog instance required.
 *
 * What we observe on init: posthog-js fetches /array/<key>/config.js,
 * /array/<key>/config, and /flags/. Capture calls POST to /e/. We assert
 * that the SDK reached the configured host (any of these paths).
 *
 * Note: detailed event-by-event assertions (specific $pageview payload,
 * outbound_link firing, etc.) are out of scope here. The SDK's batching
 * pipeline + Playwright route-mock semantics make those brittle; real
 * verification happens against the live EU project via the PostHog
 * dashboard or the mcp__posthog-analytics MCP tools (after the user
 * regenerates a personal API key with event:read scope).
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

  test('home page exposes posthog on window', async ({ page }) => {
    await page.goto('/');
    // posthog-init.ts attaches the SDK to window so engagement.ts,
    // newsletter.ts, and any external callers can fire captures.
    await page.waitForFunction(() => !!(window as any).posthog, undefined, {
      timeout: 10_000,
    });
    // Smoke-check the SDK exposes a capture function (we don't probe
    // internal config shape — posthog-js 1.x layout changes between minors).
    const hasCapture = await page.evaluate(
      () => typeof (window as any).posthog?.capture === 'function',
    );
    expect(hasCapture).toBe(true);
  });

  test('TopicChip elements render with data-topic-chip attribute', async ({ page }) => {
    await page.goto('/');
    // GardenCard renders <TopicChip> as <span data-topic-chip> on home
    // (no href wired); other surfaces render <a data-topic-chip>. Any
    // chip count proves the markup is in place — the click listener is
    // a delegated `closest('a[data-topic-chip]')` so for these span-only
    // chips we additionally fire only when wrapped in a future <a>.
    const count = await page.locator('[data-topic-chip]').count();
    expect(count).toBeGreaterThan(0);
  });

  test('newsletter form has data-newsletter attribute', async ({ page }) => {
    await page.goto('/');
    // NewsletterBand + Footer both expose data-newsletter.
    const count = await page.locator('form[data-newsletter]').count();
    expect(count).toBeGreaterThan(0);
  });
});
