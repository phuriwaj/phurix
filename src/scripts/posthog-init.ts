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
}
