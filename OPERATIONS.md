# Operations

Single-author site. No CI. This file is the operational index — anything
about *running* the site or its companion services lives here, not in code.

## Stack

- **Site**: Astro 7 static, Node ≥ 22.12. Built with `npm run build`;
  deployed as static files. Track in `package.json` `engines`.
- **Analytics**: PostHog, self-hosted. SDK is bundled into the site; the
  server stack lives in `.posthog-server/` (gitignored).

## Self-hosted PostHog

The PostHog stack is bootstrapped via `scripts/posthog-up.sh`, which
clones the upstream `posthog/posthog` repo to a sibling `.posthog-server/`
directory and runs its `bin/start`. This is necessary because PostHog's
Docker images depend on Rust services that build from `./posthog/rust`
within the upstream repo — there is no standalone compose published.

### Bring it up (local dev)

1. Copy env scaffold:
   ```sh
   cp .env.posthog.example .env.posthog
   ```
2. Fill in `DOMAIN` and `POSTHOG_SECRET` (generate the latter with
   `openssl rand -hex 32`).
3. Run:
   ```sh
   ./scripts/posthog-up.sh
   ```
   First run clones the posthog repo and starts the stack. Subsequent
   runs are idempotent.

### Wire the site to the stack

The Astro side reads two public env vars in `src/scripts/posthog-init.ts`:

```sh
PUBLIC_POSTHOG_KEY=<project-key-from-posthog-ui>
PUBLIC_POSTHOG_HOST=https://$DOMAIN
```

Get the key from the PostHog UI after first boot (`/project/settings`).
When both are unset, the SDK stays no-op — local site development is
unaffected by the analytics stack being up or down.

### Production (hobby)

`bin/deploy-hobby` is the upstream production entry point for single-VM
deployments. It is interactive and SSH-based, so it is *not* wrapped by
this repo — run it directly against your target host. Same `DOMAIN` +
`POSTHOG_SECRET` env contract.

## Deploys

TBD. Static build (`dist/`) needs uploading somewhere. NETLIFY / CLOUDFLARE
PAGES / NGINX all work — `output: "static"` in `astro.config.mjs` is the
only requirement.

## Secrets

`.env.posthog` and the site's `.env` are local-only (gitignored). Do not
commit. Rotate `POSTHOG_SECRET` separately from any cloud secrets.
