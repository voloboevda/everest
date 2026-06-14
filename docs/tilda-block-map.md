# Tilda block map — audit

**Site:** https://lovingly-nominal-crow.tilda.ws/  
**Project ID:** `23618486`  
**Page ID:** `129584086`  
**Domain (final):** everestcentr.com

## Live structure (3 blocks)

| Block ID | Type | Role | Action |
|----------|------|------|--------|
| `rec2091586451` | T123 | Inline dark CSS (~1500 lines), Inter/Manrope, canvas particles | **Replace** with `tilda/embed-head.html` + light CSS |
| `rec2091603121` | T123 | Full HTML page (main content) | **Replace** with `tilda/embed-body-v2.html` or `tilda/t123-single.html` |
| `rec2091691681` | T678 | Native Tilda form (EN labels, duplicate) | **Hide** — used as submit target for custom form via JS |

## Gap vs customer brief

| Item | Status | Fix |
|------|--------|-----|
| 8 sections | Partial | Add **Logistics** block (done in `embed-body.html`) |
| Light theme `#FFFFFF` | **Fail** — dark `#05050A` | New `tilda/css/everest-site.css` |
| Montserrat + Roboto | **Fail** — Inter + Manrope | Updated fonts |
| Lang RU / ENG / CHI | **Fail** — shows 中文 | Buttons: RU, ENG, CHI |
| WeChat button | Missing | Added in header |
| Duplicate RFQ form | **Fail** — visible EN form | Hide `rec2091691681`, one custom form |
| Partners carousel | Extra (not in brief) | Removed |
| Documents section | Extra (not in brief) | Removed from v1 embed (add when PDFs ready) |
| Canvas particle bg | Visual noise | Removed |
| Broken `css/styles.css` / `js/app.js` paths | **Fail** | Host files from repo / Tilda Site Files |

## Target section order (embed-body-v2.html)

1. Hero  
2. About  
3. Sectors  
4. Expertise  
5. **Logistics** (FOB, CIF, CPT)  
6. Geography  
7. Cooperation  
8. RFQ form  

## Deploy files

| File | Tilda destination |
|------|-------------------|
| `tilda/css/everest-site.css` | Site Files → link in head |
| `tilda/js/everest-i18n.js` | Site Files |
| `tilda/js/everest-app.js` | Site Files |
| `assets/css/everest-overrides.css` | Site Files |
| `assets/js/*.js` | Site Files |
| `tilda/embed-body-v2.html` | Paste into `rec2091603121` or use `t123-single.html` |
| `tilda/embed-head.html` | Replace `rec2091586451` or Site Settings Head |

See `docs/tilda-deploy-guide.md`.
