#!/usr/bin/env bash
# Abort deploy if PORT is taken by another process (not our PM2 app).
set -euo pipefail
PORT="${1:-3010}"
APP_NAME="${2:-all-scams}"

if ! command -v ss >/dev/null 2>&1; then
  echo "ss not found; skipping port check"
  exit 0
fi

LINE="$(ss -tlnp 2>/dev/null | grep -E ":${PORT}\\b" || true)"
if [[ -z "$LINE" ]]; then
  echo "Port ${PORT} is free."
  exit 0
fi

if echo "$LINE" | grep -q "next-server\|node"; then
  # Allow if PM2 already runs our app on this port
  if command -v pm2 >/dev/null 2>&1 && pm2 jlist 2>/dev/null | grep -q "\"name\":\"${APP_NAME}\""; then
    echo "Port ${PORT} already used by ${APP_NAME} — OK to reload."
    exit 0
  fi
fi

echo "ERROR: Port ${PORT} is already in use by another process:"
echo "$LINE"
echo "Choose a free port before deploying all-scams.com."
exit 1
