# Tilda embed guide (quick reference)

Full deploy: **`docs/tilda-deploy-guide.md`** — assets on **GitHub + jsDelivr**, not Tilda storage.

## Paste files (after `./scripts/build-tilda-paste.sh USER repo main`)

| File | Block |
|------|---------|
| `tilda/paste-block-1-head.html` | CSS, fonts, config |
| `tilda/paste-block-2-body.html` | Main HTML (v2) |
| `tilda/paste-block-3-footer.html` | GSAP + app scripts |

CDN: `https://cdn.jsdelivr.net/gh/USER/REPO@main/...`

Single-block fallback: `./scripts/build-t123-single.sh 'https://cdn.jsdelivr.net/gh/USER/REPO@main'`

## Local preview

```bash
cd "/home/vda/cursor/web design/tilda"
python3 -m http.server 8080
# open http://localhost:8080/preview.html
```

## Form (paused)

UI renders; Tilda submit not wired yet (`tildaFormSelector: ""`).
