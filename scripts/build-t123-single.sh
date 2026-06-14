#!/usr/bin/env bash
# Build one T123 paste file: tilda/t123-single.html
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
OUT="$ROOT/tilda/t123-single.html"
BASE="${1:-__EVEREST_BASE__}"

HEAD="$ROOT/tilda/embed-head.html"
BODY="$ROOT/tilda/embed-body-v2.html"
FOOTER="$ROOT/tilda/embed-footer.html"

replace_base() {
  sed "s|BASE_URL|${BASE}|g"
}

fix_body_paths() {
  sed -e "s|src=\"../assets/|src=\"${BASE}/assets/|g" \
      -e "s|srcset=\"../assets/|srcset=\"${BASE}/assets/|g" \
      -e "s|src=\"assets/|src=\"${BASE}/assets/|g"
}

{
  echo "<!-- Everest Trade — single T123 block (paste entire file into one HTML block) -->"
  echo "<!-- 1) Push repo to GitHub. 2) Pass jsDelivr base: https://cdn.jsdelivr.net/gh/USER/REPO@main -->"
  echo ""
  cat "$HEAD" | replace_base
  echo ""
  cat "$BODY" | fix_body_paths
  echo ""
  cat "$FOOTER" | replace_base
  cat <<'BOOT'

<script>
(function () {
  function boot() {
    if (window.EverestAnimationsInit) window.EverestAnimationsInit();
    if (window.EverestSectorCardsInit) window.EverestSectorCardsInit();
    if (window.EverestStackCardsInit) window.EverestStackCardsInit();
    if (window.EverestAnimationsV2Init) window.EverestAnimationsV2Init();
    if (typeof ScrollTrigger !== "undefined") ScrollTrigger.refresh();
  }
  if (document.readyState === "loading") {
    document.addEventListener("DOMContentLoaded", boot);
  } else {
    boot();
  }
})();
</script>
BOOT
} > "$OUT"

echo "Wrote $OUT (base: $BASE)"
