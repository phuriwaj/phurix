// Engagement tracking — detail-page-only.
// Wired from each src/pages/<collection>/[slug].astro via:
//   import '@/scripts/engagement';
// Captures:
//   - scroll_milestone   (25/50/75/100%) — fires once per milestone
//   - text_copied        when reader selects >= 12 chars inside the prose body
//   - code_block_copied  when reader copies content from a fenced code block
//   - reading_time       emitted via window.__phurixMaxScroll (pageleave reads it)
// Scroll max is exposed at window.__phurixMaxScroll (0..1) so the
// $pageleave event in posthog-init can include $max_scroll_pct.
// Self-guards: every capture is via optional-chaining on window.posthog, so
// this script is a no-op when the SDK hasn't initialised (no key, DNT opt-out,
// or disabled branch).

// eslint-disable-next-line @typescript-eslint/no-explicit-any
type Ph = any;

const SCROLL_MILESTONES = [0.25, 0.5, 0.75, 1] as const;
const COPY_MIN_CHARS = 12;

function init(): void {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ph: Ph = (window as any).posthog;
  const prose = document.querySelector<HTMLElement>('.prose');
  if (!prose || !ph?.capture) return;

  const fired = new Set<number>();
  let maxScroll = 0;
  let rafPending = false;

  const onScroll = () => {
    if (rafPending) return;
    rafPending = true;
    requestAnimationFrame(() => {
      rafPending = false;
      const doc = document.documentElement;
      const max = Math.max(1, doc.scrollHeight - window.innerHeight);
      const pct = Math.min(1, Math.max(0, window.scrollY / max));
      if (pct > maxScroll) {
        maxScroll = pct;
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (window as any).__phurixMaxScroll = maxScroll;
      }
      for (const m of SCROLL_MILESTONES) {
        if (pct >= m && !fired.has(m)) {
          fired.add(m);
          ph.capture('scroll_milestone', {
            milestone: Math.round(m * 100),
            source_path: window.location.pathname,
          });
        }
      }
    });
  };

  // Defer to next tick so layout is settled (esp. on astro:after-swap).
  requestAnimationFrame(onScroll);
  window.addEventListener('scroll', onScroll, { passive: true });
  window.addEventListener('astro:after-swap', () => {
    maxScroll = 0;
    fired.clear();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    (window as any).__phurixMaxScroll = 0;
    requestAnimationFrame(onScroll);
  }, { once: true });

  // --- copy-text capture ---
  document.addEventListener('copy', () => {
    const sel = window.getSelection();
    const text = sel?.toString().trim() ?? '';
    if (text.length < COPY_MIN_CHARS) return;
    if (!sel?.anchorNode || !sel.focusNode) return;
    const range = document.createRange();
    range.setStart(sel.anchorNode, sel.anchorOffset);
    range.setEnd(sel.focusNode, sel.focusOffset);
    const host = range.commonAncestorContainer;
    const insideProse =
      host instanceof Element
        ? host.closest('.prose') !== null
        : host.parentElement?.closest('.prose') !== null;
    if (!insideProse) return;
    ph.capture('text_copied', {
      char_count: text.length,
      word_count: text.split(/\s+/).filter(Boolean).length,
      source_path: window.location.pathname,
    });
  });

  // --- code-block copy delegate ---
  document.addEventListener('copy', (e) => {
    const sel = window.getSelection();
    if (!sel?.toString()) return;
    const target = (e.target as Node | null);
    if (!target) return;
    const el = target instanceof Element ? target : target.parentElement;
    const pre = el?.closest('pre');
    if (!pre) return;
    ph.capture('code_block_copied', {
      char_count: sel.toString().length,
      source_path: window.location.pathname,
    });
  });
}

document.addEventListener('astro:page-load', init);

export {};
