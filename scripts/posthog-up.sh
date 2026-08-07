#!/usr/bin/env bash
#
# Bootstrap a self-hosted PostHog stack alongside this Astro site. The
# official PostHog Docker images depend on a checked-out posthog/posthog repo
# (Rust services build from `./posthog/rust`), so we clone it sibling-side
# and defer to `bin/start` — the upstream entry point.
#
# Idempotent. Re-running is safe.
#
# Required env vars (see .env.posthog.example):
#   POSTHOG_SECRET    long random string used for SECRET_KEY + cookie signing
#   DOMAIN            hostname pointing at the proxy (https://$DOMAIN)
#
# The Astro side is unaware: it just reads PUBLIC_POSTHOG_HOST=https://$DOMAIN
# from its own .env (src/scripts/posthog-init.ts). No coupling between this
# script and the site build.

set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
SERVER_DIR="$ROOT/.posthog-server"

# Load PostHog env if present. Astro's .env is not consumed here.
if [ -f "$ROOT/.env.posthog" ]; then
  set -a
  # shellcheck disable=SC1091
  source "$ROOT/.env.posthog"
  set +a
fi

if [ -z "${POSTHOG_SECRET:-}" ] || [ -z "${DOMAIN:-}" ]; then
  echo "error: POSTHOG_SECRET and DOMAIN must be set." >&2
  echo "       Copy .env.posthog.example to .env.posthog and fill them in." >&2
  exit 1
fi

if [ ! -d "$SERVER_DIR" ]; then
  echo "→ Cloning posthog/posthog into $SERVER_DIR (shallow)"
  git clone --depth 1 https://github.com/PostHog/posthog.git "$SERVER_DIR"
fi

# bin/start expects .env.local with POSTHOG_SECRET + DOMAIN. Materialise from
# .env.posthog so the user only edits one file.
ln -sf "$ROOT/.env.posthog" "$SERVER_DIR/.env.local"

cd "$SERVER_DIR"
exec bin/start
