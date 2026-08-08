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

  // Expose to window so other scripts (engagement.ts, newsletter.ts) and
  // the e2e tests can fire captures via `window.posthog.capture(...)`.
  (window as unknown as { posthog: typeof posthog }).posthog = posthog;

  posthog.capture('$pageview');

  // ClientRouter soft-nav → re-capture pageview with the new pathname.
  // `astro:after-swap` fires AFTER the new document is in place.
  document.addEventListener('astro:after-swap', () => {
    posthog.capture('$pageview');
  });

  // --- UTM extraction ---
  // First-touch attribution. Read once at init, store as person properties
  // via $set_once so repeat visits don't overwrite. Re-applied on each
  // astro:after-swap (UTMs change rarely but cheap to re-check).
  const captureUtms = () => {
    const params = new URL(window.location.href).searchParams;
    const utms: Record<string, string> = {};
    for (const k of ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content']) {
      const v = params.get(k);
      if (v) utms[k] = v;
    }
    if (Object.keys(utms).length > 0) {
      posthog.capture('$pageview', { ...utms });
      posthog.setPersonProperties({}, utms);
    }
  };
  captureUtms();
  document.addEventListener('astro:after-swap', captureUtms);

  // --- Failed-resource capture ---
  // Network errors (404 images, missing fonts) bubble as 'error' events on
  // window in capture phase. Listen there to catch resource errors that
  // don't reach .onerror handlers on individual elements.
  window.addEventListener(
    'error',
    (e) => {
      const target = e.target as HTMLElement | null;
      if (!target || !(target instanceof HTMLImageElement ||
          target instanceof HTMLLinkElement ||
          target instanceof HTMLScriptElement ||
          target instanceof HTMLSourceElement ||
          target instanceof HTMLAudioElement ||
          target instanceof HTMLVideoElement)) {
        return;
      }
      const src =
        (target instanceof HTMLLinkElement ? target.href : '') ||
        (target as HTMLImageElement | HTMLSourceElement | HTMLScriptElement | HTMLMediaElement).src ||
        '';
      posthog.capture('$resource_error', {
        tag: target.tagName.toLowerCase(),
        src,
        source_path: window.location.pathname,
      });
    },
    true, // capture phase — required for resource errors
  );

  // --- Page engagement (pageleave with time_on_page) ---
  // Accumulates visible-time. Fires $pageleave on document hidden / unload
  // so we can compute avg time on page per route. Re-armed on every soft nav.
  let visibleSince = performance.now();
  let visibleMs = 0;
  let currentPath = window.location.pathname;

  const armPageleave = (path: string) => {
    visibleSince = performance.now();
    visibleMs = 0;
    currentPath = path;
  };
  armPageleave(currentPath);

  document.addEventListener('visibilitychange', () => {
    if (document.visibilityState === 'hidden') {
      visibleMs += performance.now() - visibleSince;
    } else {
      visibleSince = performance.now();
    }
  });

  const firePageleave = () => {
    if (document.visibilityState === 'visible') {
      visibleMs += performance.now() - visibleSince;
    }
    if (visibleMs > 100) {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const maxScroll = (window as any).__phurixMaxScroll ?? 0;
      posthog.capture('$pageleave', {
        $current_url: window.location.href,
        $pathname: currentPath,
        $time_on_page_ms: Math.round(visibleMs),
        $max_scroll_pct: maxScroll,
      });
    }
  };

  window.addEventListener('pagehide', firePageleave);
  // Astro soft-nav: arm a new window before swap.
  document.addEventListener('astro:before-swap', () => firePageleave());
  document.addEventListener('astro:after-swap', () => armPageleave(window.location.pathname));

  // --- Delegated TopicChip click tracker ---
  // TopicChip renders as `<a data-topic-chip>` (when href set) or
  // `<span data-topic-chip>` (GardenCard preview chips). Match either
  // — capture the chip label so PostHog sees topic affinity per session.
  const wireTopicChips = () => {
    document.addEventListener(
      'click',
      (e) => {
        const chip = (e.target as HTMLElement | null)?.closest<HTMLElement>('[data-topic-chip]');
        if (!chip) return;
        posthog.capture('topic_chip_click', {
          label: chip.getAttribute('data-topic-chip') ?? (chip.textContent ?? '').trim(),
          href: chip.getAttribute('href') ?? '',
          tag: chip.tagName.toLowerCase(),
          source_path: window.location.pathname,
        });
      },
      { capture: true },
    );
  };
  wireTopicChips();
  document.addEventListener('astro:after-swap', wireTopicChips);

  // --- Delegated Hero CTA click tracker ---
  // hero-section-5.tsx React island renders `<a data-hero-cta="primary|secondary">`.
  // Capture variant + href so headline-A/B tests have signal.
  const wireHeroCtas = () => {
    document.addEventListener(
      'click',
      (e) => {
        const a = (e.target as HTMLElement | null)?.closest<HTMLAnchorElement>('a[data-hero-cta]');
        if (!a) return;
        posthog.capture('hero_cta_click', {
          variant: a.getAttribute('data-hero-cta') ?? 'unknown',
          href: a.getAttribute('href') ?? '',
          text: (a.textContent ?? '').trim().slice(0, 60),
          source_path: window.location.pathname,
        });
      },
      { capture: true },
    );
  };
  wireHeroCtas();
  document.addEventListener('astro:after-swap', wireHeroCtas);

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
