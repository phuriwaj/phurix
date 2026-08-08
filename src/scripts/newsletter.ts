// Newsletter submit capture — fires newsletter_submit_attempt on form submit.
// Site-wide (imported from Layout) so both NewsletterBand + Footer forms
// are tracked regardless of which page renders them.
//
// self-guarded via optional-chaining on window.posthog — no-op when SDK
// hasn't initialised (no PUBLIC_POSTHOG_KEY, DNT opt-out, or disabled).

function init(): void {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const ph: any = (window as any).posthog;
  if (!ph?.capture) return;
  document.querySelectorAll<HTMLFormElement>('[data-newsletter]').forEach((form) => {
    form.addEventListener('submit', () => {
      const email = (form.querySelector<HTMLInputElement>('input[type="email"]')?.value ?? '').trim();
      ph.capture('newsletter_submit_attempt', {
        source_path: window.location.pathname,
        source: form.getAttribute('data-source') ?? 'unknown',
        email_domain: email.includes('@') ? email.split('@')[1] : null,
      });
    });
  });
}

document.addEventListener('astro:page-load', init);

export {};
