import posthog from 'posthog-js';

// No key configured → no-op. Local dev stays clean, no third-party requests
// (and no console noise) until a real PUBLIC_POSTHOG_KEY is set in .env.
const key = import.meta.env.PUBLIC_POSTHOG_KEY;
if (!key) {
  // eslint-disable-next-line no-console
  console.info('[posthog] PUBLIC_POSTHOG_KEY not set — analytics disabled.');
} else {
  // Project 243278 is EU-hosted. Override via PUBLIC_POSTHOG_HOST for US
  // or self-hosted targets.
  const host = import.meta.env.PUBLIC_POSTHOG_HOST ?? 'https://eu.i.posthog.com';

  posthog.init(key, {
    api_host: host,
    // Astro sites use ClientRouter for view transitions, so initial pageload
    // already auto-captures `$pageview`. Re-fire on every soft navigation.
    capture_pageview: false,
    // Web Vitals (LCP, FID/INP, CLS, FCP, TTFB) emitted as $web_vitals events.
    // Cheap; the perf budget is small for a static site.
    capture_performance: true,
    // Single-author personal site; no session recording by default. Flip on
    // in PostHog project settings or override here if desired.
    disable_session_recording: true,
    // Respect Do-Not-Track / Global Privacy Control — wire to PostHog's
    // opt-out path. Pass `undefined` to default.
    respect_dnt: true,
    // Keep the bundled SDK small-ish.
    loaded: (ph) => {
      if (navigator.doNotTrack === '1' || navigator.globalPrivacyControl) {
        ph.opt_out_capturing();
      }
    },
  });

  posthog.capture('$pageview');

  // ClientRouter soft-nav → re-capture pageview with the new pathname.
  // `astro:after-swap` fires AFTER the new document is in place.
  document.addEventListener('astro:after-swap', () => {
    posthog.capture('$pageview');
  });

  // Delegated outbound-link tracker. Catches every external `a` click (any
  // origin that isn't ours), captures `outbound_link`, then lets the click
  // proceed naturally. Attached once on first load; re-attached on each
  // view-transition swap so soft-nav doesn't strand the listener.
  const wireOutboundLinks = () => {
    document.addEventListener(
      'click',
      (e) => {
        const a = (e.target as HTMLElement | null)?.closest<HTMLAnchorElement>('a[href]');
        if (!a) return;
        const href = a.getAttribute('href') ?? '';
        // Skip non-navigating, same-origin, mailto/tel, and protocol-relative
        // anchors — only true http(s) cross-origin hits count.
        if (!/^https?:\/\//i.test(href)) return;
        try {
          const url = new URL(href);
          if (url.host === window.location.host) return;
        } catch {
          return;
        }
        posthog.capture('outbound_link', {
          href,
          text: (a.textContent ?? '').trim().slice(0, 120),
          source_path: window.location.pathname,
        });
      },
      { capture: true },
    );
  };
  wireOutboundLinks();
  document.addEventListener('astro:after-swap', wireOutboundLinks);
}
