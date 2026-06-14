# Tilda deploy — GitHub CDN (no Tilda file storage)

Tilda has **no file storage**. All CSS, JS, and images are served from **GitHub** via [jsDelivr CDN](https://www.jsdelivr.com/?docs=gh).

## 1. Push repo to GitHub

```bash
cd "/home/vda/cursor/web design"
git add -A
git commit -m "feat: Everest Trade v2 for Tilda via GitHub CDN"
git remote add origin https://github.com/YOUR_USER/everest-trade-web.git
git push -u origin main
```

After push, assets are available at:

`https://cdn.jsdelivr.net/gh/YOUR_USER/everest-trade-web@main/`

(jsDelivr may take 1–5 minutes to pick up a new repo.)

## 2. Build 3 paste files

```bash
chmod +x scripts/build-tilda-paste.sh
./scripts/build-tilda-paste.sh YOUR_GITHUB_USER everest-trade-web main
```

Outputs:

| File | Tilda destination |
|------|-------------------|
| `tilda/paste-block-1-head.html` | T123 block 1 **or** Site Settings → head |
| `tilda/paste-block-2-body.html` | T123 block 2 (main page) |
| `tilda/paste-block-3-footer.html` | T123 block 3 **or** Site Settings → before `</body>` |

## 3. Paste in Tilda editor

On page https://lovingly-nominal-crow.tilda.ws/:

1. **Block 1** (`rec2091586451` T123) — delete old code → paste `paste-block-1-head.html` → Save
2. **Block 2** (`rec2091603121` T123) — delete old HTML → paste `paste-block-2-body.html` → Save
3. **Block 3** (T123 at bottom) — paste `paste-block-3-footer.html` → Save
4. **Publish** (code runs only on published site, not in editor preview)
5. Check RU / ENG / CHI + mobile

**Form:** add hidden native Tilda form block (see below), set notification email, re-paste block 1 + 3 after `./scripts/build-tilda-paste.sh`.

### Form block (4th block on page)

1. In Tilda editor: **+ Add block → Form** (any simple template).
2. Place it **below** the three T123 blocks (order does not matter — JS hides it).
3. **Form fields** — set **variable names** exactly (Field settings → Variable):

| Label (any language) | Variable name | Required |
|------------------------|---------------|----------|
| Name | `name` | yes |
| Email | `Email` | yes |
| Company | `Company` | no |
| Country | `Country` | no |
| Message | `Message` | no |
| Consent | `Consent` | no (checkbox) |

4. **Form → Notifications:** email `itstabaluga@gmail.com` (test) or production address.
5. **Publish** the page.
6. Re-paste **block 1** and **block 3** from latest `paste-block-*.html` (config + `everest-app.js`).

JS auto-finds `form[id^="form"]` outside `.everest-root`, copies custom form data, clicks Tilda submit, hides parent `rec*` block. If bridge form is missing, user sees error (not fake success).

Optional override in `__EVEREST_CONFIG`: `tildaFormSelector: "#form123"`, `tildaFormRecId: "rec123"`.

## Alternative: Site Settings instead of block 1 and 3

- Block 1 content → **Настройки сайта → Ещё → HTML в head**
- Block 3 content → **Настройки сайта → Ещё → Перед `</body>`**
- Only block 2 stays as T123 on the page

## Local preview (unchanged)

```bash
cd tilda && python3 -m http.server 8080
# http://localhost:8080/preview.html
```

## Troubleshooting

| Problem | Fix |
|---------|-----|
| Styles/scripts 404 | Repo public? jsDelivr needs public repo. Wait 5 min after first push. |
| Globe not loading | ES module from CDN — check browser console for CORS/MIME |
| Old site still visible | Publish again; hard refresh Ctrl+Shift+R |
| Changes not live | Re-run `build-tilda-paste.sh` after code changes, re-paste blocks |

## Domain (last step)

`everestcentr.com` — see `docs/domain-launch.md`
