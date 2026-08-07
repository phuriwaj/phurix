/// <reference types="astro/client" />

interface ImportMetaEnv {
  /** PostHog project API key. Unset → analytics disabled (no SDK init). */
  readonly PUBLIC_POSTHOG_KEY?: string;
  /** PostHog ingest host. Defaults to https://us.i.posthog.com. */
  readonly PUBLIC_POSTHOG_HOST?: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}

/** GPC + legacy DNT — missing from default lib types. */
interface Navigator {
  readonly globalPrivacyControl?: boolean;
  readonly doNotTrack?: string | null;
}
