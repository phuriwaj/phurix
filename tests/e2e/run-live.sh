#!/usr/bin/env bash
# Live PostHog smoke. Drives every wired event against the real EU
# endpoint (phc_Dbejcx2Scw5WubeGusFaQosg7CGbSHBeBZYU7MLvX436), polls
# the PostHog events API for server-side receipt.
#
# The local preview is served over HTTPS via http-server with a
# throwaway self-signed cert — required because the browser blocks
# mixed active content (an HTTP page can't POST to HTTPS endpoints
# without a flag, and even with the flag the SDK's batching pipeline
# gets brittle in that mode). HTTPS local = same-protocol = clean
# capture pipeline.
set -euo pipefail
ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$ROOT"

LOG="$ROOT/tests/e2e/.preview-live.log"
: > "$LOG"

if [[ ! -f "$ROOT/.env" ]]; then
  echo "error: .env missing at repo root (needed for real key)" >&2
  exit 1
fi
# shellcheck disable=SC1091
set -a; source "$ROOT/.env"; set +a

# Personal API key for server-side events-API verification (same key
# the MCP server uses). Falls back to env so a CI runner can inject.
export PERSONAL_POSTHOG_API_KEY="${PERSONAL_POSTHOG_API_KEY:-phx_PpXGhnZMNkmNX38YGGxeoAWUgs24R8nfLw3WU7pRumc2PnZ8}"

# Project key comes from .env (PUBLIC_POSTHOG_KEY) — same one used at
# build time. Exported so the Node-based spec can read it.

# Self-signed cert for HTTPS local preview. Regenerated each run; the
# browser ignores server cert verification for localhost per Playwright
# `ignoreHTTPSErrors: true`.
CERT_DIR="$ROOT/tests/e2e/.ssl"
mkdir -p "$CERT_DIR"
if [[ ! -f "$CERT_DIR/cert.pem" || ! -f "$CERT_DIR/key.pem" ]]; then
  openssl req -x509 -newkey rsa:2048 \
    -keyout "$CERT_DIR/key.pem" \
    -out "$CERT_DIR/cert.pem" \
    -days 1 -nodes -subj '/CN=localhost' >/dev/null 2>&1
fi

# Build with real key into dist-live/.
export ASTRO_OUT_DIR=dist-live
rm -rf "$ROOT/dist-live"
npm run build >>"$LOG" 2>&1

fuser -k 4323/tcp 2>/dev/null || true
sleep 0.5

# http-server (npx) serves dist-live/ over HTTPS on 4323. We install
# it on demand because it's only needed for this single script.
(
  exec npx --yes http-server@14 "$ROOT/dist-live" \
    --port 4323 \
    --ssl \
    --cert "$CERT_DIR/cert.pem" \
    --key "$CERT_DIR/key.pem" \
    --silent \
    --proxy "http://localhost:4323?" \
    >>"$LOG" 2>&1
) &
PID=$!

cleanup() {
  kill "$PID" 2>/dev/null || true
  wait "$PID" 2>/dev/null || true
  fuser -k 4323/tcp 2>/dev/null || true
  rm -rf "$ROOT/dist-live"
}
trap cleanup EXIT INT TERM

deadline=$((SECONDS + 60))
while (( SECONDS < deadline )); do
  if (echo > /dev/tcp/127.0.0.1/4323) 2>/dev/null; then break; fi
  sleep 0.3
done
if ! (echo > /dev/tcp/127.0.0.1/4323) 2>/dev/null; then
  echo "error: port 4323 did not bind" >&2
  tail -30 "$LOG" >&2 || true
  exit 1
fi

exec npx playwright test "$@" \
  --config=playwright.live.config.ts \
  tests/e2e/posthog-live.spec.ts