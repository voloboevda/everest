#!/usr/bin/env bash
# Build 3 T123 paste files for Tilda (assets hosted on GitHub via jsDelivr CDN).
# Usage: ./scripts/build-tilda-paste.sh GITHUB_USER [REPO_NAME] [BRANCH]
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
USER="${1:?Usage: $0 GITHUB_USER [repo-name] [branch]}"
REPO="${2:-everest}"
BRANCH="${3:-$(git rev-parse --short HEAD 2>/dev/null || echo main)}"
CDN="https://cdn.jsdelivr.net/gh/${USER}/${REPO}@${BRANCH}"

HEAD_SRC="$ROOT/tilda/embed-head.html"
BODY_SRC="$ROOT/tilda/embed-body-v2.html"
FOOTER_SRC="$ROOT/tilda/embed-footer.html"

OUT1="$ROOT/tilda/paste-block-1-head.html"
OUT2="$ROOT/tilda/paste-block-2-body.html"
OUT3="$ROOT/tilda/paste-block-3-footer.html"

replace_base() {
  sed "s|BASE_URL|${CDN}|g"
}

fix_body_paths() {
  sed -e "s|src=\"../assets/|src=\"${CDN}/assets/|g" \
      -e "s|srcset=\"../assets/|srcset=\"${CDN}/assets/|g" \
      -e "s|src=\"assets/|src=\"${CDN}/assets/|g"
}

{
  echo "<!-- Everest Trade — T123 block 1 (head). CDN: ${CDN} -->"
  echo "<!-- Paste into block rec2091586451 OR Site Settings → head -->"
  echo ""
  cat "$HEAD_SRC" | replace_base
} > "$OUT1"

{
  echo "<!-- Everest Trade — T123 block 2 (body). CDN: ${CDN} -->"
  echo "<!-- Paste into block rec2091603121 -->"
  echo ""
  cat "$BODY_SRC" | fix_body_paths
} > "$OUT2"

{
  echo "<!-- Everest Trade — T123 block 3 (scripts). CDN: ${CDN} -->"
  echo "<!-- Paste into third T123 block OR Site Settings → before </body> -->"
  echo ""
  cat "$FOOTER_SRC" | replace_base
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
} > "$OUT3"

echo "CDN base: ${CDN}"
echo "Wrote:"
echo "  $OUT1"
echo "  $OUT2"
echo "  $OUT3"
