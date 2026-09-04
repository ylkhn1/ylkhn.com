#!/usr/bin/env sh
# Renders og.png and apple-touch-icon.png with headless Chrome. Run from the repo root.
set -e
CHROME="${CHROME:-google-chrome-stable}"
"$CHROME" --headless=new --disable-gpu --hide-scrollbars --window-size=1200,630 \
  --screenshot="$PWD/og.png" "file://$PWD/tools/og.html"
"$CHROME" --headless=new --disable-gpu --hide-scrollbars --window-size=180,180 \
  --screenshot="$PWD/apple-touch-icon.png" "file://$PWD/tools/icon.html"
