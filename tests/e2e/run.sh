#!/usr/bin/env bash
# Manual lifecycle for two preview servers + Playwright. We attempted to
# use Playwright's built-in `webServer` orchestration, but its spawn path
# didn't survive multi-stage compound shell commands cleanly in this
# environment. A wrapper gives us full control.
#
# Brings up:
#   :4321 — site built WITH  PUBLIC_POSTHOG_KEY/HOST baked in (the SDK
#           init path; tests assert capture calls reach the configured host).
#   :4322 — site built WITHOUT PUBLIC_* (SDK must no-op; tests assert zero
#           outbound requests to any posthog host).
#
# Each build writes to a dedicated ASTRO_OUT_DIR so the static preview
# servers do not share files (Astro preview re-reads dist/ on each request).
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/../.." && pwd)"
cd "$ROOT"

# --- preflight ---
fuser -k 4321/tcp 2>/dev/null || true
fuser -k 4322/tcp 2>/dev/null || true
sleep 1
rm -rf "$ROOT/dist-configured" "$ROOT/dist-disabled"

LOG_CONF="$ROOT/tests/e2e/.preview-4321.log"
LOG_DIS="$ROOT/tests/e2e/.preview-4322.log"
: > "$LOG_CONF"; : > "$LOG_DIS"

# --- configured build + preview (port 4321) ---
export ASTRO_OUT_DIR=dist-configured
export PUBLIC_POSTHOG_KEY=phc_e2e_test_key
export PUBLIC_POSTHOG_HOST=http://localhost:12345
npm run build >>"$LOG_CONF" 2>&1
(
  exec npx astro preview --port 4321 >>"$LOG_CONF" 2>&1
) &
PID_CONF=$!

wait_port() {
  local port=$1 deadline=$((SECONDS + 60))
  while (( SECONDS < deadline )); do
    if (echo > /dev/tcp/127.0.0.1/"$port") 2>/dev/null; then
      return 0
    fi
    sleep 0.3
  done
  return 1
}

if ! wait_port 4321; then
  echo "error: port 4321 did not bind" >&2
  tail -30 "$LOG_CONF" >&2 || true
  kill "$PID_CONF" 2>/dev/null || true
  exit 1
fi

# --- disabled build + preview (port 4322) ---
unset PUBLIC_POSTHOG_KEY PUBLIC_POSTHOG_HOST
export ASTRO_OUT_DIR=dist-disabled
npm run build >>"$LOG_DIS" 2>&1
(
  exec npx astro preview --port 4322 >>"$LOG_DIS" 2>&1
) &
PID_DIS=$!

cleanup() {
  kill "$PID_CONF" "$PID_DIS" 2>/dev/null || true
  wait "$PID_CONF" "$PID_DIS" 2>/dev/null || true
  fuser -k 4321/tcp 2>/dev/null || true
  fuser -k 4322/tcp 2>/dev/null || true
  rm -rf "$ROOT/dist-configured" "$ROOT/dist-disabled"
}
trap cleanup EXIT INT TERM

if ! wait_port 4322; then
  echo "error: port 4322 did not bind" >&2
  tail -30 "$LOG_DIS" >&2 || true
  exit 1
fi

# --- run playwright ---
exec npx playwright test "$@"
