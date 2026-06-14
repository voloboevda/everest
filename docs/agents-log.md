# Agents log

Chronological decisions for Everest Trade web project.

## 2026-06-14 — Tilda deploy via GitHub CDN (no Tilda file storage)

- **Decision:** Tilda removed file storage. All assets served from public GitHub repo via jsDelivr. Three T123 paste blocks: head / body / footer. Form integration paused (`tildaFormSelector: ""`).
- **Files:** `scripts/build-tilda-paste.sh`, `docs/tilda-deploy-guide.md`, `tilda/embed-head.html`, `docs/tilda-embed-guide.md`, `README.md`
- **Next:** Paste `paste-block-1/2/3.html` into Tilda T123 blocks. Repo: https://github.com/voloboevda/everest CDN: `https://cdn.jsdelivr.net/gh/voloboevda/everest@main`

## 2026-06-14 — Repo cleanup + v2-only production path

- **Decision:** User approved simplifier pass before GitHub + Tilda deploy. Production = **v2 only**. Removed v1/v3 sandboxes, `*.artifact.json`, `.tmp-*`, unused hero/logo duplicates (~7 MB). Kept prod images: hero mobile/tablet/desktop, `everest-logo-nav.png`, favicons, `expertise/*.png`. `preview-v2.html` → `preview.html`. Git repo init prepared (full scope: tilda + assets + docs + ui-lab + .cursor, no node_modules).
- **Files removed:** `tilda/preview-v3.html`, `embed-body.html`, `embed-body-v3.html`, `_legacy-body.html`, `everest-site-v3.css`, 7× `*.artifact.json`, 12 unused images in `assets/img/`
- **Files updated:** `.gitignore`, `README.md`, `.cursor/project-context.md`, `docs/tilda-block-map.md`, `docs/tilda-deploy-guide.md`, `tilda/preview.html`
- **Next:** User uploads files to Tilda Site Files, pastes `t123-single.html`, publishes; GitHub push after repo created.

## 2026-06-14 — Hero secondary CTA: partnership copy

- **Decision:** Replaced placeholder `Selected work` with B2B copy for outline hero CTA → `#cooperation`. RU «Модели сотрудничества», ENG «Partnership models», CHI «合作模式». Primary RFQ unchanged.
- **Files:** `tilda/js/everest-i18n.js`, `tilda/embed-body.html`, `tilda/embed-body-v2.html`, `tilda/t123-single.html`, `ui-lab/src/App.tsx`
- **User input:** Try option 1 first; may remove secondary button later.

## 2026-06-14 — Contact form eyebrow: gold accent

- **Decision:** `.cta-form-eyebrow--accent` («Брифинг») switched from teal `--accent` to `--gold` `#C8A45A` per user browser selection.
- **File:** `assets/css/everest-wibify-ui.css`

## 2026-06-14 — Cooperation column eyebrow: accent blue

- **Decision:** `.coop-v2__track` (Закупка / Поставка labels) switched from gold tint to `--accent-blue` `#72D8F5` per user browser selection.
- **File:** `tilda/css/everest-site-v2.css`

## 2026-06-14 — Global MCP stack (web design / frontend)

- **Decision:** User requested all recommended MCP servers enabled globally for every Cursor project.
- **File:** `~/.cursor/mcp.json` — github, playwright, context7, figma, 21st-magic, filesystem, brave-search.
- **Secrets via env:** `GITHUB_TOKEN`, `MAGIC_API_KEY`, `BRAVE_API_KEY`.
- **Action:** Restart Cursor; authenticate Figma/GitHub in MCP Tools if prompted.

## 2026-06-14 — v3 rebuilt (clarity fork of v2, fixes black hero)

- **Decision:** First v3 attempt failed — wireframe CSS fought base styles; hero hidden by `hero--pending-reveal` without reveal JS. Rebuilt v3 as v2 fork: Wibify shell, shiny-cta, block eyebrows; removed stars/glow, secondary CTA, frosted sector cards, scroll-pin expertise. Added v3 branch in `everest-animations.js` (static hero + sections like v2).
- **Files:** `tilda/embed-body-v3.html`, `tilda/css/everest-site-v3.css`, `tilda/preview-v3.html`, `assets/js/everest-animations.js`
- **Preview:** http://localhost:8080/preview-v3.html

## 2026-06-14 — v3 editorial sandbox (fresh build for A/B)

- **Decision:** Built v3 from scratch using Product Studio rules — editorial Stripe/Linear direction vs v2 Wibify motion. Fixed slim header (logo + nav + WeChat + lang), hero with one CTA scroll to `#request` (no stars/glow/secondary button), bordered sector grid, expertise timeline (no scroll-pin), minimal footer. Reuses i18n, forms, globe.
- **Compare:** v2 = agency motion richness · v3 = clarity and whitespace
- **Files:** `tilda/preview-v3.html`, `tilda/embed-body-v3.html`, `tilda/css/everest-site-v3.css`, `assets/js/everest-animations-v3.js`
- **Preview:** http://localhost:8080/preview-v3.html

## 2026-06-14 — Cursor Product Studio consolidated

- **Decision:** Merged entire Cursor SaaS design-system conversation into one production-ready `.cursor/` structure: master rules, design constraints, agent roles, observers, workflow, prompts. Adapted for Everest dual-stack (Tilda production + ui-lab React). No new ideas — consolidation only.
- **Files:** `.cursor/ARCHITECTURE.md`, `cursor-rules.md`, `project-context.md`, `design-system.md`, `typography.md`, `color-system.md`, `design-brain.md`, `anti-patterns.md`, `product-logic.md`, `system-rule.md`, `workflow.md`, `agents/*.md`, `observers/*.md`, `prompts/*.txt`; updated `AGENTS.md`, `README.md`, `docs/NEW-CHAT.md`
- **Entry point:** `.cursor/ARCHITECTURE.md` → read order in `cursor-rules.md`

## 2026-06-12 — GlobePulse (21.dev) + 2-route cycle

- **Decision:** Integrated `cobe-globe-pulse.tsx` in ui-lab (`cobe` npm). Production `everest-globe.js`: 21.dev palette unchanged; 2 non-overlapping arcs per 8s hold + 2s gap; arc labels on globe (no legend); cyan #33ccdd pulses.
- **Files:** `ui-lab/components/ui/cobe-globe-pulse.tsx`, `ui-lab/src/GlobePulseDemo.tsx`, `assets/js/everest-globe.js`, `tilda/css/everest-site.css`, `ui-lab/src/App.tsx`

## 2026-06-12 — Globe: dark dot map (revert decor)

- **Decision:** User rejected rings/orbs decor. Reverted. White sphere was cobe `dark:0` + white `baseColor` (land = bright dots on light ball). Switched to `dark:1` + site bg `baseColor` + logo-blue `glowColor`; softer `mapBrightness`. Labels: dark square chips.
- **Files:** `assets/js/everest-globe.js`, `tilda/css/everest-site.css`

## 2026-06-12 — Globe: legend removed + unidirectional routes

- **Decision:** Legend under map removed — globe labels + arc chip are enough. Routes: one arc per country pair only (`j > i`), no Russia→India and India→Russia in rotation. 10 routes instead of 20.
- **Files:** `assets/js/everest-globe.js`

## 2026-06-12 — Globe legend square + form «Briefing»

- **Decision:** Geography legend chips `border-radius: 0` (site is square, not pill). Block `#request` form card: Контакт → Брифинг / Briefing / 简报; title «Краткий брифинг.» (left contact column unchanged).
- **Files:** `assets/css/everest-wibify-ui.css`, `tilda/js/everest-i18n.js`, `tilda/embed-body.html`

## 2026-06-12 — Blocks [01]–[07], coop title, legend polish

- **Decision:** Sequential numbering through Contact `[07]` (no gap). Cooperation title: «Сотрудничество с Everest Trade» (gold accent on brand). Contact accent flipped to blue — fixes double-gold with coop. Section title accents use per-lang `--hero-font-accent` (same as Hero). Globe legend: body font, logo-blue dots, gold rim on active route pill.
- **Files:** `tilda/embed-body.html`, `tilda/js/everest-i18n.js`, `assets/css/everest-wibify-ui.css`, `tilda/css/everest-site.css`

## 2026-06-12 — Logistics block removed; accent tuning

- **Decision:** Removed `#logistics` section, menu and footer links. Renumbered: Geography `[05]`, Cooperation `[06]`, Contact `[08]` unchanged. Expertise — one gold accent word. Geography blue / Cooperation gold per odd-even rhythm. Hero `hero-accent--blue` aligned to logo `--accent` `#3d7f96` (was bright `#72d8f5`).
- **Files:** `tilda/embed-body.html`, `tilda/js/everest-i18n.js`, `tilda/css/everest-site.css`, `assets/css/everest-wibify-ui.css`

## 2026-06-12 — Unified block headers [01]–[08] + blue/gold title accents

- **Decision:** All 8 sections use `block-eyebrow` (line + `[NN]` + label) + display title with alternating `title-accent--blue` / `title-accent--gold` + subtitle where copy exists. Geography `[06]` and Cooperation `[07]` were missing eyebrows; Contact renumbered to `[08]`. Short titles get one accent; Expertise (long) gets both colors.
- **Files:** `tilda/embed-body.html`, `tilda/js/everest-i18n.js`, `assets/css/everest-wibify-ui.css`, `tilda/css/everest-site.css`

## 2026-06-12 — Nav logo: full mark from everest-logo.png (ibb 404)

- **Decision:** `i.ibb.co/gb6j3Gv9/logo.png` returns 404. Nav uses trimmed **full** logo from `everest-logo.png` (mountain + EVEREST + TRADE CO., LIMITED) → `everest-logo-nav.png`, brighten only, no line crop. Height 3.5rem in bar.
- **Files:** `assets/img/everest-logo-nav.png`, `tilda/embed-body.html`, `assets/css/everest-wibify-ui.css`
- **User input:** Previous nav crop wrong; use normal logo URL; TRADE CO. line OK.

## 2026-06-12 — Nav logo: re-cut from stakeholder master file

- **Decision:** New source `everest-logo-source.png` from user upload (1024²). Nav asset `everest-logo-header-nav.png` = mountain + EVEREST only (full glyphs, padding before TRADE CO.). Slight brighten in export. Nav height 3rem.
- **Files:** `assets/img/everest-logo-source.png`, `everest-logo-header-nav.png`, `everest-logo-header.png`, `tilda/embed-body.html`, `assets/css/everest-wibify-ui.css`
- **User input:** Previous crop cut letter S; provided correct logo file.

## 2026-06-12 — Menu: vertical center, no blue leak, flat lang, full logo

- **Decision:** Menu block vertically centered (left gutter unchanged). Char-roll accent hidden until hover (`opacity: 0`). Lang segments: reset pill/glow from `everest-site.css` — text-only active state. Nav logo back to full `everest-logo-header.png` + brightness filter (trimmed asset cut glyphs).
- **Files:** `assets/css/everest-wibify-ui.css`, `tilda/embed-body.html`
- **User input:** Blue chars visible at rest; round lang switches; logo S cut off; menu higher on screen.

## 2026-06-12 — Menu overlay: left align, char roll, lang segments

- **Decision:** Port 21.dev animated menu to Tilda (`everest-menu-roll.js` per-letter stagger). Menu left-aligned to `--container` gutter; staggered slide-in on open. Lang switcher → 3-cell bordered grid (menu + footer). React reference in `ui-lab/components/ui/animated-menu.tsx`.
- **Files:** `tilda/embed-body.html`, `assets/css/everest-wibify-ui.css`, `assets/js/everest-menu-roll.js`, `tilda/embed-footer.html`, `tilda/preview.html`, `ui-lab/components/ui/animated-menu.tsx`, `ui-lab/lib/utils.ts`
- **User input:** Hamburger opens menu; left edge not center; adequate RU|ENG|CHI switches with dividers.

## 2026-06-12 — Nav: wider gaps, CTA height ≈ burger

- **Decision:** `--nav-item-gap: 1.2rem` between logo / CTA / burger; burger `2.5rem`, CTA `2.35rem` fixed height.
- **Files:** `assets/css/everest-wibify-ui.css`
- **User input:** More space between all three; button nearly same height as burger, slightly smaller.

## 2026-06-12 — Nav: spacing + trimmed logo asset

- **Decision:** More `nav-inner` padding/gap; added `everest-logo-header-nav.png` (trimmed top dead space from header PNG) for optical centering with CTA/burger; logo height ~3rem.
- **Files:** `assets/img/everest-logo-header-nav.png`, `tilda/embed-body.html`, `assets/css/everest-wibify-ui.css`
- **User input:** Elements too tight; logo sat low due to PNG top padding.

## 2026-06-12 — Nav: logo + compact RFQ + burger (shrink-wrap bar)

- **Decision:** Replaced wordmark with `everest-logo-header.png`. Added compact `shiny-cta nav-cta` between logo and burger. `nav-inner` is `fit-content` flex (no `1fr` gap); CTA and burger share bar height.
- **Files:** `tilda/embed-body.html`, `assets/css/everest-wibify-ui.css`
- **User input:** Logo visible; RFQ like header but smaller; burger as second button; rectangle hugs content, no internal division.

## 2026-06-12 — Hero dev panel removed

- **Decision:** User tuned copy in preview panel but reload reset (panel wrote localStorage only). Panel removed; texts fixed in `everest-i18n.js`. CHI left as draft. To edit: change `hero_title_a` etc. in i18n file.
- **Files:** deleted `assets/js/everest-hero-dev.js`, `tilda/preview.html`, `tilda/js/everest-hero-variants.js`, `docs/content-ru-en-chi.md`

## 2026-06-12 — Hero: serif accent restored, dev panel, no image

- **Decision:** Restored `hero-accent` serif + blue (not bold emphasis / no underline). Eyebrow one muted line `[01] Everest Trade`. Font pairs: ENG Switzer+Instrument Serif, RU Onest+PT Serif, CHI Noto Sans/Serif SC. Hero image removed. Preview editor: `?hero_dev=1` / `everestHeroDev(true)` in `assets/js/everest-hero-dev.js`.
- **Files:** `tilda/embed-body.html`, `tilda/css/everest-site.css`, `tilda/js/everest-i18n.js`, `assets/js/everest-hero-dev.js`, `tilda/embed-head.html`, `docs/content-ru-en-chi.md`

## 2026-06-12 — Hero: no emphasis, lang fonts, eyebrow line

- **Decision:** Removed all serif/emphasis from hero (user feedback). Accent line 72px before `[01]`. Per-lang display fonts: ENG Switzer, RU Onest, CHI Noto Sans SC (smaller clamp). RU/CHI copy shortened for line rhythm.
- **Files:** `tilda/embed-body.html`, `tilda/css/everest-site.css`, `tilda/js/everest-i18n.js`, `tilda/embed-head.html`, `docs/content-ru-en-chi.md`

## 2026-06-12 — Hero display typography (variants A/B/C)

- **Decision:** Mixed-type hero like agency reference — Switzer/DM Sans bold + Instrument Serif italic accent + wavy underline on second emphasis word. Eyebrow `[01] Everest Trade`. Three copy variants (partnership / global reach / execution) in RU, ENG, CHI. Console switcher: `everestSetHeroVariant('a'|'b'|'c')`, `everestClearHeroVariant()` for plain title.
- **Files:** `tilda/js/everest-hero-variants.js`, `tilda/js/everest-i18n.js`, `tilda/embed-body.html`, `tilda/css/everest-site.css`, `docs/content-ru-en-chi.md`, `docs/NEW-CHAT.md` (#24)

## 2026-06-12 — Nav: single rectangle (no internal dividers)

- **Fix:** One bordered `nav-inner` box; logo + CTA + burger as siblings with padding/gap only (Wibify reference). Removed column border lines.
- **Files:** `tilda/embed-body.html`, `assets/css/everest-wibify-ui.css`

## 2026-06-12 — Wibify shell: square nav, burger menu, RFQ modal

- **Decision:** Square header (not pill), border-trace CTA, wordmark logo for contrast, hamburger full-screen menu with text-roll, RFQ opens dark modal, lang RU/ENG/CHI in menu footer + page footer. Font: Switzer.
- **Files:** `tilda/embed-body.html`, `assets/css/everest-wibify-ui.css`, `assets/js/everest-shell-ui.js`, `tilda/embed-head.html`, `tilda/embed-footer.html`, `tilda/js/everest-i18n.js`

## 2026-06-12 — Wibify UI redo (logo accent, no gold/blue mix)

- **Decision:** User rejected blue+gold combo. Accent sampled from logo (`#003048` → interactive `#5EC8E8`). Port Wibify nav (logo | shiny-cta | lang | burger), lang-switcher, contact-field form, grain overlay. HTML source from user.
- **Files:** `assets/css/everest-wibify-ui.css`, `tilda/embed-body.html`, `tilda/embed-head.html`, `tilda/preview.html`, `tilda/js/everest-app.js`, `docs/design-tokens.md`, `docs/design-bundles.md`, `docs/design-taste.md`

## 2026-06-12 — Wibify dark style, phase 1 (foundation)

- **Decision:** Stakeholder chose full dark adaptation of [wibify.agency](https://wibify.agency/) with Everest palette (navy + gold, not lime). Phase 1: tokens, fonts (DM Sans, Instrument Serif, JetBrains Mono), floating pill header, dark glass buttons, blur scroll animations.
- **Files:** `tilda/css/everest-site.css`, `tilda/embed-body.html`, `tilda/embed-head.html`, `tilda/preview.html`, `assets/js/everest-animations.js`, `assets/css/everest-overrides.css`, `docs/design-bundles.md` (Bundle D), `docs/design-tokens.md`, `docs/design-taste.md`, `docs/NEW-CHAT.md` (#23)
- **Next:** Phase 2 — 4-card scroll process (logistics/cooperation), gray line-art map, sector icons, hero serif emphasis in i18n copy.

## 2026-06-12 — Theme toggle cancelled (single tonality)

- **Decision:** User rejected light/dark switching. Site stays **one color / one tonality** (Bundle A light), adapted to fixed visuals — no theme toggle on UI Lab or Tilda.
- **Action:** Removed `theme-toggle`, `theme-provider`, `ThemeToggleDemo`, `.dark` tokens, `next-themes`. Reverted `App.tsx`, `main.tsx`, `index.css`.
- **Files:** deleted theme files; `docs/NEW-CHAT.md` (#23 removed)

## 2026-06-12 — Logo integrated (header, footer, favicon)

- **Decision:** User-provided navy mountain logo added. Header uses cropped variant (mountain + EVEREST); footer uses full mark with TRADE CO., LIMITED. Favicon 32/192 from mountain icon. Transparent PNG works on light header and navy footer.
- **Files:** `assets/img/everest-logo.png`, `everest-logo-header.png`, `everest-favicon-*.png`, `tilda/embed-body.html`, `tilda/css/everest-site.css`, `tilda/embed-head.html`, `tilda/preview.html`, `docs/tilda-deploy-guide.md`, `docs/design-taste.md`, `docs/NEW-CHAT.md`

## 2026-06-12 — Legend pulse centered on dot

- **Decision:** Pulse ring via `::after` on `.legend-dot` (was misaligned at `left: 14px` on `li`). Globe untouched.
- **Files:** `tilda/css/everest-site.css`

## 2026-06-12 — Project scaffold

- **Decision:** Created project repo with local `.cursor/skills` and rules (not global).
- **Files:** `AGENTS.md`, `.cursor/rules/*`, `.cursor/skills/everest-*`
- **User input:** Domain everestcentr.com (connect last); WeChat QR placeholder; analytics stubs; start build.

## 2026-06-12 — Design direction

- **Decision:** Bundle A (customer brief) active; B/C documented for future choice.
- **Files:** `docs/design-bundles.md`, `docs/design-taste.md`
- **User input:** Clean presentable sites; inspiration Awwwards + 21.dev; remember taste over time.

## 2026-06-12 — Integrations naming fix

- **Decision:** YouGile (not Yojail) for task creation from RFQ.
- **Files:** `docs/yougile-integration.md`, `integrations/tilda-form-bridge/`

## 2026-06-12 — Build phase 1 complete

- **Decision:** Project scaffold created; domain everestcentr.com at final step; WeChat QR placeholder; analytics stubs.
- **Files:** Full tree under `/home/vda/cursor/web design` — assets, docs, `.cursor/skills`, integrations bridge
- **Note:** ui-ux-pro-max installed via GitHub clone (npm uipro-cli unavailable)

## 2026-06-12 — Tilda audit + light rebuild

- **Decision:** Live site uses 3 T123/T678 blocks; dark theme replaced with light corporate CSS per customer brief; Logistics section added; duplicate form hidden.
- **Files:** `tilda/embed-body.html`, `tilda/css/everest-site.css`, `tilda/js/everest-i18n.js`, `tilda/js/everest-app.js`, `docs/tilda-block-map.md`, `docs/tilda-deploy-guide.md`
- **Block IDs:** rec2091586451 (head), rec2091603121 (body), rec2091691681 (hidden form)

## 2026-06-12 — Preview white screen fix

- **Decision:** preview.html loaded GSAP before content; `.will-animate` stayed at opacity 0. Fixed script order + CSS fallback.
- **Files:** `tilda/preview.html`, `tilda/embed-body.html`, `tilda/css/everest-site.css`, `assets/js/everest-animations.js`

## 2026-06-12 — Globe label typography + 2s routes

- **Decision:** Point labels match arc chip (11px, uppercase). Active endpoints keep label above blue pulse. Routes rotate every 2s.
- **Files:** `assets/js/everest-globe.js`, `tilda/css/everest-site.css`

## 2026-06-12 — Blue legend + short globe labels

- **Decision:** Legend dots/contour blue (active = blue pulse). Globe: short country chips (Mid-East, SE Asia); hidden when blue hub pulses. Route chip uses short names not IATA.
- **Files:** `assets/js/everest-globe.js`, `tilda/css/everest-site.css`

## 2026-06-12 — Blue globe pulse on route endpoints

- **Decision:** Active route countries pulse blue on globe (hub overlay); legend gold pulse unchanged; only from/to hubs, not other countries.
- **Files:** `assets/js/everest-globe.js`, `tilda/css/everest-site.css`

## 2026-06-12 — Gold arcs + legend pulse on active route

- **Decision:** Arcs gold (wider). Legend: full i18n region names; active route endpoints pulse gold ring. Hub codes on globe/arc label only.
- **Files:** `assets/js/everest-globe.js`, `tilda/css/everest-site.css`

## 2026-06-12 — IATA codes on globe routes

- **Decision:** Route and hub labels use ticket-style English codes: MOW, PEK, DEL, DXB, SIN. Full region name in `title` tooltip + legend.
- **Files:** `assets/js/everest-globe.js`

## 2026-06-12 — Random route arcs with labels (demo ref)

- **Decision:** 20 directed routes (5×4), one random arc ~3.6s with floating label «Регион → Регион» on arc apex (cobe anchor). Navy arcs, gold markers. User ref: 21st map demo screenshot.
- **Files:** `assets/js/everest-globe.js`, `tilda/css/everest-site.css`

## 2026-06-12 — Light globe only, sequential thin arcs

- **Decision:** Dark globe + theme toggle removed. Trade arcs: one at a time (~2.8s), thin semi-transparent gold; short pause between arcs. User chose animated sequential + subtle lines (like map.tsx demo).
- **Files:** `assets/js/everest-globe.js`, `tilda/embed-body.html`, `tilda/css/everest-site.css`

## 2026-06-12 — Dual cobe globes + trade arcs

- **Decision:** Light white globe (gold markers/arcs) + dark GlobePulse (cyan); theme toggle in geo section; 8 regional trade arcs between Moscow/Beijing/Delhi/Dubai/Singapore.
- **Files:** `assets/js/everest-globe.js`, `tilda/embed-body.html`, `tilda/css/everest-site.css`, `tilda/js/everest-i18n.js`, `tilda/embed-footer.html`, `tilda/preview.html`

## 2026-06-12 — WorldMap template restore (21st.dev)

- **Decision:** Globe removed; dotted-map WorldMap template ported verbatim (viewBox 800×400, projectPoint, runtime dotted-map SVG). Only 5 real lat/lng markers changed (Moscow, Beijing, Delhi, Dubai, Singapore).
- **Files:** `assets/js/everest-world-map.js`, `tilda/embed-body.html`, `tilda/css/everest-site.css`, `tilda/embed-footer.html`, `tilda/preview.html`

## 2026-06-12 — Cobe 3D globe for geography

- **Decision:** Dotted flat map replaced with cobe WebGL globe; 5 markers at real coords (Moscow, Beijing, New Delhi, Dubai, Singapore); gold markers, no trade-route arcs; legend fallback for i18n.
- **Files:** `assets/js/everest-globe.js`, `tilda/embed-body.html`, `tilda/css/everest-site.css`, `tilda/embed-footer.html`, `tilda/preview.html`

## 2026-06-12 — Map pin alignment fix

- **Decision:** Overlay viewBox aligned to dotted-map SVG (210×100); region pins use getPin coordinates (Moscow, Beijing, Delhi, Dubai, Singapore). No React/shadcn — Tilda vanilla JS only.
- **Files:** `assets/js/everest-world-map.js`, `tilda/css/everest-site.css`

## 2026-06-12 — Interactive geography map

- **Decision:** Static PNG map replaced with dotted SVG + 5 interactive region points (gold pulse, i18n tooltips). No trade-route arcs (equal regions, no RU→CN emphasis).
- **Files:** `assets/js/everest-world-map.js`, `assets/img/world-dots.svg`, `tilda/embed-body.html`, `tilda/css/everest-site.css`, `tilda/embed-footer.html`, `tilda/preview.html`, `tilda/js/everest-app.js`, `tilda/assets` symlink for preview

## 2026-06-12 — Plan implementation complete

- **Decision:** All deliverables in repo; Tilda editor paste + file upload required for live site update.
- **Files:** `docs/qa-checklist.md`, `docs/design-system-reasoning.md`

## 2026-06-12 — Tilda: contact-card layout on RFQ form (#request)

- **Decision:** User chose site form (not UI Lab only). Ported 21.dev contact-card grid to `#request` in Tilda embed: info column (email, phone, offices) + form column; corner + accents in gold. JS/form fields unchanged.
- **Files:** `tilda/embed-body.html`, `tilda/css/everest-site.css`, `tilda/js/everest-i18n.js`
- **Preview:** `cd tilda && python3 -m http.server 8080` → http://localhost:8080/preview.html#request

## 2026-06-12 — Tilda: footer-section port (21.dev layout)

- **Decision:** Ported multi-column footer from `ui-lab/footer-section` to main Tilda page. Navy theme, rounded top, gold glow line, 4 link columns + brand block. Section anchors: `#about`, `#sectors`, `#logistics`, `#geography`. i18n RU/ENG/CHI for all labels. GSAP fade-in on scroll (`will-animate-footer`).
- **Files:** `tilda/embed-body.html`, `tilda/css/everest-site.css`, `tilda/js/everest-i18n.js`, `assets/js/everest-animations.js`
- **Preview:** `cd tilda && python3 -m http.server 8080` → scroll to footer

## 2026-06-12 — UI Lab: footer-section (21.dev + shadcn)

- **Decision:** Integrated `footer-section` from 21.dev into `ui-lab/`. Everest wordmark (no logo), B2B link columns (Navigate, Company, Legal, Connect). `motion` + `lucide-react` already present; shadcn CLI failed (network) — component added manually. Demo: `App.tsx` stacks ContactCard + Footer.
- **Files:** `ui-lab/components/ui/footer-section.tsx`, `ui-lab/src/App.tsx`
- **Run:** `cd ui-lab && npm run dev` → http://localhost:5173

## 2026-06-12 — UI Lab: contact-card (21.dev + shadcn)

- **Decision:** Integrated `contact-card` from 21.dev into existing `ui-lab/` sandbox. Added shadcn primitives (`button`, `input`, `label`, `textarea`) alongside `joly-button`. Demo in `App.tsx` uses Everest RFQ copy and Bundle A tokens. Updated `docs/NEW-CHAT.md` with reusable prompt template for future 21.dev integrations.
- **Files:** `ui-lab/components/ui/contact-card.tsx`, `button.tsx`, `input.tsx`, `label.tsx`, `textarea.tsx`, `ui-lab/src/App.tsx`, `docs/NEW-CHAT.md`
- **Deps:** `@radix-ui/react-label` (others already present)
- **Run:** `cd ui-lab && npm run dev` → http://localhost:5173

## 2026-06-12 — UI Lab: joly-button (shadcn + Motion)

- **Decision:** Main site stays Tilda/vanilla; React playground added at `ui-lab/` for button prototyping (21.dev joly-button). shadcn aliases → `components/ui/`. Everest tokens mapped (navy primary, gold accent); added `gold` variant. `glow`/`shimmer` kept as lab-only (anti-pattern per design-taste).
- **Files:** `ui-lab/` (Vite, React 19, TS, Tailwind v4, `components/ui/joly-button.tsx`, `components.json`, `lib/utils.ts`)
- **Run:** `cd ui-lab && npm install && npm run dev` → http://localhost:5173

## 2026-06-12 — Tilda: joly glow + shimmer buttons

- **Decision:** User approved port of ui-lab button effects to main Tilda page. Hero/cooperation/form CTAs: primary → `btn-glow`, secondary → `btn-shimmer`; mouse-follow spotlight via `everest-buttons.js`. i18n updated for `.btn-text` inner span.
- **Files:** `tilda/css/everest-site.css`, `tilda/embed-body.html`, `assets/js/everest-buttons.js`, `tilda/js/everest-app.js`, `tilda/embed-footer.html`, `tilda/preview.html`

## 2026-06-12 — Buttons: brand colors, distinct variants

- **Decision:** User feedback — purple glow removed. Primary stays `btn-primary` (navy + gold aura); outline stays `btn-outline` (light void, navy border, gold shimmer). Effects kept via `.btn-joly` spotlight.
- **Files:** `tilda/css/everest-site.css`, `tilda/embed-body.html`

## 2026-06-12 — Buttons: soft redesign (user taste)

- **Decision:** Primary default = blue→navy gradient only; hover = soft gold gradient + gentle glow. Outline = 1px border (map-legend spec); hover = `rgba(200,164,90,0.75)` rim + `0 0 14px` gold shadow. Removed scale, shimmer, spotlight, thick borders.
- **Files:** `tilda/css/everest-site.css`, `tilda/embed-body.html`

## 2026-06-12 — Hero CTA invisible fix

- **Decision:** GSAP `from(opacity:0)` on `.hero-cta` left button clickable but invisible. Hero anim uses translateY only; CSS `opacity:1` on `.hero-cta`; fallback label text in HTML.
- **Files:** `assets/js/everest-animations.js`, `tilda/css/everest-site.css`, `tilda/embed-body.html`

## 2026-06-12 — CTA simplification (one button)

- **Decision:** User feedback — «Отправить запрос» and «Связаться» are same funnel; removed duplicate CTAs from header, about, logistics, cooperation. Kept: Hero primary (lg) + form submit. `btn_contact` i18n keys retained for later.
- **Files:** `tilda/embed-body.html`, `tilda/css/everest-site.css`, `docs/design-taste.md`

## 2026-06-12 — Tilda: coss buttons site-wide

- **Decision:** Ported coss-button styles to all Tilda CTAs. Primary (default) + outline pattern: header RFQ, hero lg, about outline, logistics pair, cooperation, form submit with loading spinner. Lang switcher: thin gold-active rim (prep for i18n polish).
- **Files:** `tilda/css/everest-site.css`, `tilda/embed-body.html`, `tilda/js/everest-app.js`

## 2026-06-12 — ui-lab restored: shiny-button only (exact prompt)

- **Decision:** User: clean ui-lab (not delete); copy 21.dev shiny-button verbatim (`border-radius: 360px`). Removed second hero button + dot. ui-lab = only `ShinyButton` + `DemoOne`. CSS in `components/ui/shiny-button.css` + `assets/css/shiny-button.css` (identical).
- **Files:** `ui-lab/`, `assets/css/shiny-button.css`, `tilda/embed-body.html`

## 2026-06-12 — Shiny button reset (21.dev exact)

- **Decision:** User rejected ui-lab demos + wibify border-trace “laser”. Deleted `ui-lab/`. Added `assets/css/shiny-button.css` — exact 21.dev CSS, only `border-radius: 0`. Removed `border-trace` from Tilda. Hero: shiny-cta + second with `shiny-cta-dot`. Nav CTA removed.
- **Files:** `assets/css/shiny-button.css`, `assets/css/everest-wibify-ui.css`, `tilda/embed-head.html`, `tilda/embed-body.html`, `tilda/preview.html`

## 2026-06-12 — Hero i18n + unified block eyebrows [01]–[06]

- **Decision:** Lang switch no longer falls back to plain «Everest Trade» hero (plain variant ignored in prod). Hero title/subtitle driven only by `everest-hero-variants.js` on `everest:langchange` with explicit lang. Unified `block-eyebrow` (muted line + `[NN]` + label, no accent) on Hero, About, Sectors, Expertise, Logistics, Contact.
- **Files:** `tilda/embed-body.html`, `tilda/js/everest-hero-variants.js`, `tilda/js/everest-i18n.js`, `assets/css/everest-wibify-ui.css`

## 2026-06-12 — RFQ: Wibify dual forms (modal + block)

- **Decision:** User reference wibify.agency contact UI. Modal on Hero/menu CTA (`data-open-rfq`): «Start an inquiry» layout. Block `#request`: left contacts «Let's talk» + right inline «short briefing» form. Fields 1:1: first/last name, email, phone (required); company, website, message (optional); single privacy consent. Footer `#request` links scroll to block, not modal. Tilda map: name = first+last; phone/website appended to Message.
- **Files:** `tilda/embed-body.html`, `tilda/js/everest-i18n.js`, `tilda/js/everest-app.js`, `assets/css/everest-wibify-ui.css`, `assets/js/everest-shell-ui.js`, `docs/content-ru-en-chi.md`

## 2026-06-12 — UI Lab: shiny-button square (21.dev) [removed]

- **Decision:** Ported 21.dev ShinyButton to `ui-lab/components/ui/shiny-button.tsx` — square (`border-radius: 0`), variants `default` + `marked` (square accent dot). Colors from `everest-wibify-ui.css` (#72d8f5 accent), not changed. Demo: Start a project / Selected work + Everest labels.
- **Files:** `ui-lab/components/ui/shiny-button.tsx`, `ui-lab/src/shiny-button.css`, `ui-lab/src/ShinyButtonDemo.tsx`, `ui-lab/src/index.css`, `ui-lab/src/App.tsx`

## 2026-06-12 — UI Lab: coss-button (Everest palette)

- **Decision:** Integrated `coss-button.tsx` in `ui-lab/components/ui/`; variants match approved Tilda buttons (blue gradient default, gold hover; thin outline + gold rim). `button.tsx` re-exports coss-button. Radius 6px.
- **Files:** `ui-lab/components/ui/coss-button.tsx`, `ui-lab/components/ui/button.tsx`, `ui-lab/src/ButtonVariantsDemo.tsx`, `ui-lab/src/App.tsx`, `ui-lab/src/index.css`

## 2026-06-12 — Globe: hide labels on active route endpoints

- **Decision:** When arc/route selected, country name at from/to points hidden (`is-hidden-for-route`); hub pulse stays. Logged in `design-taste.md`.
- **Files:** `assets/js/everest-globe.js`, `tilda/css/everest-site.css`, `docs/design-taste.md`

## 2026-06-12 — Frosted glass cards (21.dev interactive)

- **Decision:** Integrated `interactive-frosted-glass-card` in UI Lab (React/TS/Tailwind, Everest Bundle A). Ported tilt + cursor glare to Tilda: `.frosted-card` on about/sectors/expertise cards; vanilla `everest-frosted-cards.js`. Tilt capped at 6°; `prefers-reduced-motion` disables glare/tilt. shadcn CLI unavailable (network) — component added manually.
- **Files:** `ui-lab/components/ui/interactive-frosted-glass-card.tsx`, `ui-lab/src/FrostedGlassCardsDemo.tsx`, `ui-lab/src/index.css`, `ui-lab/src/App.tsx`, `assets/js/everest-frosted-cards.js`, `tilda/css/everest-site.css`, `tilda/embed-body.html`, `tilda/embed-footer.html`, `tilda/preview.html`, `docs/NEW-CHAT.md`

## 2026-06-12 — Frosted cards: logistics + cooperation

- **Decision:** Extended `.frosted-card` to logistics (FOB/CIF/CPT) and cooperation blocks. User noted glare/transparency is subtle on all-white sections — deferred color/contrast tuning for later.
- **Files:** `tilda/embed-body.html`

## 2026-06-12 — Shiny CTA: square, logo accent, arrow align, slow glow

- **Decision:** `shiny-cta` — `border-radius: 0` (90° corners); highlight from logo `#003048` family (`#2a5f73` / `#3d7f96`), not bright blue; `--duration: 8s`, softer shimmer; arrow in separate `.shiny-cta__arrow` with `top: -0.1em`; i18n `btn_request` without `→`.
- **Files:** `assets/css/shiny-button.css`, `ui-lab/components/ui/shiny-button.css`, `tilda/embed-body.html`, `tilda/js/everest-i18n.js`

## 2026-06-12 — Shiny CTA: remove arrow square glow

- **Fix:** Nested spans caused `.shiny-cta span::before` breathe glow on arrow; scoped to `.shiny-cta > span::before` only.
- **Files:** `assets/css/shiny-button.css`, `ui-lab/components/ui/shiny-button.css`

## 2026-06-12 — Hero outline secondary button

- **Decision:** Second hero CTA — `.outline-cta` (Wibify ref): square, thinner border, smaller rectangle (`0.7rem`/`1.65rem`, `0.875rem` text vs shiny `1.25rem`/`2.5rem`), square dot; hover = foggy blur glow, white → dim logo accent (`#2a5f73`). Placeholder `btn_hero_secondary` → `#cooperation`.

## 2026-06-12 — Outline CTA: height + white glow tune

- **Decision:** `.outline-cta` near primary height (`1.1rem`/`2.1rem`, `1.0625rem` text); hover glow white, minimal blur; dot full accent `#72d8f5` + small glow; extra gap so glow does not touch text.
- **Files:** `assets/css/shiny-button.css`, `ui-lab/components/ui/shiny-button.css`
- **Files:** `assets/css/shiny-button.css`, `ui-lab/components/ui/shiny-button.css`, `tilda/embed-body.html`, `tilda/js/everest-i18n.js`, `ui-lab/src/App.tsx`

## 2026-06-12 — Hero split headline reverted

- **Decision:** Split-screen hero typography (viewport 50/50 grid) removed — user rejected approach. Restored variant A with `<br>` + `.hero-accent` spans.
- **Files:** `tilda/js/everest-i18n.js`, `everest-hero-variants.js`, `tilda/css/everest-site.css`, `docs/content-ru-en-chi.md`

## 2026-06-12 — CTA polish: lift left copy, subtle focus, no grain, muted accent

- **Decision:** Left column `translateY(-3.25rem)` — align to fields/consent, not submit. All form fields: thin gold focus bar (`1px`), no blue glow. Removed `.grain` overlay + hero grid `::before`. Accent `#3D7F96` (logo/button family) replaces bright `#72D8F5` in text and UI.
- **Files:** `everest-wibify-ui.css`, `everest-site.css`, `embed-body.html`, `shiny-button.css`, `ui-lab/*`
- **User input:** Center too low; gold bar on all fields but thinner; remove noise; darker noble blue like logo.

## 2026-06-12 — CTA block: left column center, contact i18n, gold name focus

- **Decision:** `#request` grid `align-items: center` — left copy vertically centered to form card. Form header: `block_form_eyebrow` / `block_form_title` → Контакт / Contact / 联系 (replaces RFQ + short briefing). Name/surname focus: gold bottom bar only, no blue glow.
- **Files:** `assets/css/everest-wibify-ui.css`, `tilda/js/everest-i18n.js`, `tilda/embed-body.html`
- **User input:** Center left text to form height; localize contact label; gold bar on first/last name focus.

## 2026-06-12 — Hero orbs brighter + softer shiny CTA

- **Decision:** Orbs +~15% opacity, slight path tweak. `.shiny-cta` fill `#242c34` + light rim (was pure `#000`) — softer/lighter, not harsher.
- **Files:** `everest-wibify-ui.css`, `everest-hero-glow.js`, `stars.tsx`

## 2026-06-12 — Hero layer fix: stars + orbs above image

- **Decision:** Stack reordered — image z1 (no screen blend), stars z2, orbs z3, copy z4. Gold orb top-right near beam; blue left→center near CTA. Stars slightly brighter over image.
- **Files:** `embed-body.html`, `everest-site.css`, `everest-wibify-ui.css`, `everest-hero-glow.js`, `everest-hero-stars.js`, `stars.tsx`, `App.tsx`

## 2026-06-12 — Hero responsive picture (4K / tablet / mobile)

- **Decision:** `<picture>` breakpoints: ≥1200 → `hero-ship-full-desktop.jpg` (2560w from 6688×3764), 980–1199 → tablet 1448w, ≤979 → portrait mobile 1080w. JPEG optimized. object-position tuned per breakpoint.
- **Files:** `assets/img/hero-ship-full-*.jpg`, `embed-body.html`, `everest-site.css`, `ui-lab/src/App.tsx`

## 2026-06-12 — Hero image 1448×1086 (ChatGPT export from Downloads)

- **Decision:** ChatGPT estuary URL 403 without session. Used `Загрузки/ChatGPT Image 12 июн. 2026 г., 17_19_32.png` → `hero-ship-full.png`. User can overwrite with 3840×2160 export same path.
- **Files:** `assets/img/hero-ship-full.png`, `embed-body.html`, `ui-lab/public/hero-ship-full.png`

## 2026-06-12 — Hero image swap (higher-res)

- **Decision:** Replaced `hero-ship-full.png` with user asset (1024×576). Same full-bleed + screen blend + left shade stack.
- **Files:** `assets/img/hero-ship-full.png`, `ui-lab/public/hero-ship-full.png`, `embed-body.html`

## 2026-06-12 — Hero: full image overlay (no cutout)

- **Decision:** User PNG `hero-ship-full.png` covers entire hero (`object-fit: cover`). Black sky → `mix-blend-mode: screen` so stars/glow show through. `.hero-scene-shade` darkens left for text. Removed cutout + synthetic beam. Stack: glow → stars → image → shade → copy.
- **Files:** `assets/img/hero-ship-full.png`, `embed-body.html`, `everest-site.css`, `everest-animations.js`, `ui-lab/src/App.tsx`

## 2026-06-12 — Hero beam: CSS layer to viewport top

- **Decision:** Auto-cutout ate beam → strip beam from PNG, add `.hero-beam` gradient `top:0` to ship (full height). Image `height:100%` cover, no max-height clip. Subtle beam pulse. User can send ship-only PNG for cleaner composite.
- **Files:** `hero-ship-planet-cutout.png`, `embed-body.html`, `everest-site.css`, `everest-animations.js`

## 2026-06-12 — Hero scene: full-bleed cutout, scroll fade

- **Decision:** Ship/planet moved to `.hero-scene` absolute full hero (not right column). Sky removed → `hero-ship-planet-cutout.png` (auto alpha from dark pixels). Ship anchored bottom-right; left mask for text. GSAP scrub: opacity + y on scroll. User can replace with hand-cut transparent PNG.
- **Files:** `embed-body.html`, `everest-site.css`, `everest-animations.js`, `assets/img/hero-ship-planet-cutout.png`, `ui-lab/src/App.tsx`

## 2026-06-12 — Hero visual: ship over planet image

- **Decision:** User asset → `assets/img/hero-ship-planet.png` (1692×930). Right column `.hero-visual` ≥980px; left-edge mask blend; subtle float animation. i18n `hero_image_alt` RU/ENG/CHI.
- **Files:** `embed-body.html`, `everest-site.css`, `everest-i18n.js`, `everest-app.js`, `ui-lab/public/hero-ship-planet.png`, `ui-lab/src/App.tsx`

## 2026-06-12 — Globe: SE Asia hub label SEA / ЮВА / 东南亚

- **Decision:** Southeast Asia pin renamed from Singapore to regional short labels: ENG `SEA`, RU `ЮВА`, CHI `东南亚` (parallel to UAE / ОАЭ).
- **Files:** `tilda/js/everest-i18n.js`, `ui-lab/components/ui/cobe-globe-pulse.tsx`

## 2026-06-12 — Globe: ENG UAE short label (like RU ОАЭ)

- **Decision:** English middle-east pin label `United Arab Emirates` → `UAE` (parallel to RU `ОАЭ`). CHI `阿联酋` unchanged.
- **Files:** `tilda/js/everest-i18n.js`, `ui-lab/components/ui/cobe-globe-pulse.tsx`

## 2026-06-12 — Globe: full country names RU/ENG/CHI (UAE, Singapore)

- **Decision:** Points and routes use full `geo_*` names per language (no abbrev on globe). Middle East pin → UAE (ОАЭ / UAE / 阿联酋); SE Asia pin → Singapore. Routes e.g. «Россия → Китай», «Russia → China».
- **Files:** `tilda/js/everest-i18n.js`, `assets/js/everest-globe.js`, `ui-lab/components/ui/cobe-globe-pulse.tsx`

## 2026-06-12 — Globe labels: uniform abbreviations everywhere

- **Decision:** Point chips and arc labels use the same `geo_abbr_*` strings (no mix of full names vs abbrev). RU abbrev without trailing dots (Кит, Инд). Matching chip border style on arcs.
- **Files:** `assets/js/everest-globe.js`, `tilda/js/everest-i18n.js`, `tilda/css/everest-site.css`, `ui-lab/components/ui/cobe-globe-pulse.tsx`

## 2026-06-12 — Globe route labels i18n (abbr RU/ENG/CHI)

- **Decision:** Country chips use full `geo_*` names; arc labels use `geo_abbr_*` per language (e.g. RU: «РФ → Кит.», ENG: «RUS → CHN», CHI: «俄 → 中»). Refreshes on `everest:langchange`.
- **Files:** `tilda/js/everest-i18n.js`, `assets/js/everest-globe.js`, `ui-lab/components/ui/cobe-globe-pulse.tsx`

## 2026-06-12 — Globe: country labels, route swap, adaptive spin

- **Decision:** Country names at markers (i18n). Active route endpoints hide country chip; arc label shows on path. Spin faster when no routes (`0.0055`), slower when routes visible (`0.002`). Route cycle 5s hold / 1.2s gap.
- **Files:** `assets/js/everest-globe.js`, `tilda/css/everest-site.css`, `ui-lab/components/ui/cobe-globe-pulse.tsx`

## 2026-06-12 — Globe UX revert (user request)

- **Decision:** Rolled back last globe pass — removed country name labels, overlap hiding, faster spin/routes, blue contour ring. Restored: 21.dev points + matching arc color, 2 routes / 8s + 2s gap, arc labels only, cyan pulses.
- **Files:** `assets/js/everest-globe.js`, `tilda/css/everest-site.css`, `ui-lab/components/ui/cobe-globe-pulse.tsx`

## 2026-06-12 — Hero glow tune: faster, stronger, gold top / blue bottom

- **Decision:** Glow ~2.5× faster; opacity up (gold ~0.36–0.46, blue ~0.28–0.37); larger orbs, less blur. Gold anchored top-right zone, blue bottom-right — prep for ship/planet visual. Not neon-heavy.
- **Files:** `everest-hero-glow.js`, `everest-wibify-ui.css`, `ui-lab/components/ui/stars.tsx`

## 2026-06-12 — Hero ambient glow animation (gold + blue drift)

- **Decision:** Animated `.hero-glow` orbs — slow Lissajous drift + opacity breathe; on scroll glow shifts down and fades (~40%). Static gold/blue radials removed from `.hero` CSS. `everest-hero-glow.js` + `prefers-reduced-motion` static fallback.
- **Files:** `assets/js/everest-hero-glow.js`, `everest-wibify-ui.css`, `embed-body.html`, `preview.html`, `embed-footer.html`

## 2026-06-12 — Hero polish: remove visual frame, accent blue+gold, header glass on scroll

- **Decision:** Removed `.hero-visual__frame` square (right column empty for future asset). Header on scroll → card-like glass `rgba(255,255,255,0.02)` + border `0.08`. Hero accents fixed: explicit `--blue` `#72d8f5` / `--gold` `#c8a45a` (nth-of-type failed inside `.hero-line`).
- **Files:** `embed-body.html`, `everest-site.css`, `everest-wibify-ui.css`, `everest-i18n.js`, `ui-lab/src/App.tsx`

## 2026-06-12 — Hero: stars + split layout + whipped typography

- **Decision:** Port 21.dev `StarsBackground` to UI Lab (`stars.tsx`, `motion`); Tilda canvas starfield (`everest-hero-stars.js`) with muted white `#dde8ee`, blue `#6aafc4`, gold `#c4a872`. Hero 50/50 grid: copy left, `.hero-visual__frame` placeholder right (≥980px). Headlines variant A/B/C use `.hero-line` whipped blocks (2–3 words, last line solo). Header: light glass at top → transparent on scroll (`is-scrolled`).
- **Files:** `ui-lab/components/ui/stars.tsx`, `ui-lab/src/App.tsx`, `assets/js/everest-hero-stars.js`, `tilda/embed-body.html`, `everest-site.css`, `everest-wibify-ui.css`, `everest-i18n.js`, `docs/content-ru-en-chi.md`, `docs/NEW-CHAT.md` (#26)
- **User input:** Starry sky; split screen for future visual; dense whipped headline; transparent header on scroll.

## 2026-06-12 — Hero: radial blue+gold, full viewport, left align

- **Decision:** Port 21.dev radial glow to hero (`circle 500px` gold at 100px + blue at 200px). Hero `min-height: 100dvh`, flex center; content left-aligned to `.container` (removed `max-width: 920px`). Title `.hero-accent` odd=blue `#72D8F5`, even=gold `#C8A45A`. Outline CTA hover rim gold. React ref: `ui-lab/components/ui/radial-glow-background.tsx`.
- **Files:** `assets/css/everest-wibify-ui.css`, `tilda/css/everest-site.css`, `assets/css/shiny-button.css`, `ui-lab/components/ui/radial-glow-background.tsx`, `ui-lab/src/App.tsx`, `docs/design-taste.md`
- **User input:** Blue-gold background on hero; first block fills window; buttons/text align left; only change accent hex, no new gradient design.

## 2026-06-12 — Footer: Wibify-style wordmark layout

- **Decision:** Replaced footer logo with large caps wordmark `EVEREST` + serif italic gold accent line (like Wibify tagline). Five columns: Contact, Offices, Sitemap, Legal, Social (↗ on external). Bottom mono bar: © + badge. Lang switcher kept below bar.
- **Files:** `tilda/embed-body.html`, `tilda/css/everest-site.css`, `tilda/js/everest-i18n.js`, `assets/css/everest-wibify-ui.css`
- **User input:** Simple footer from Wibify reference; large inscription instead of logo.

## 2026-06-12 — Footer: logo back, column grid fix, lang labels

- **Decision:** Restored footer logo (removed EVEREST wordmark). Column grid: full-width until 1200px, then brand + 5 cols; `min-width: 0` + wrap on contact/offices. Lang switcher: **РУ** | ENG | **中文** (menu + footer); no uppercase on lang buttons.
- **Files:** `tilda/embed-body.html`, `tilda/css/everest-site.css`, `assets/css/everest-wibify-ui.css`, `tilda/js/everest-i18n.js`

## 2026-06-12 — Footer: plain layout, text Everest, legal nowrap

- **Decision:** Stripped 21.dev/Wibify footer decor (glow, rounded corners, gradients, badge, ↗ icons, headline). Logo → modest text «Everest». Shorter legal link labels (`footer_link_privacy` / `footer_link_terms`); legal col `nowrap` on desktop. Copyright + lang in one bottom row.
- **Files:** `tilda/embed-body.html`, `tilda/css/everest-site.css`, `assets/css/everest-wibify-ui.css`, `tilda/js/everest-i18n.js`

## 2026-06-12 — Footer: bg EVEREST wordmark, gold ↗, blue hover

- **Decision:** Full-height background caps `EVEREST` (blue/gold gradient watermark); columns full width. Social ↗ gold → blue on hover; all footer links hover `--accent` not white.
- **Files:** `tilda/embed-body.html`, `tilda/css/everest-site.css`

## 2026-06-12 — Footer: wordmark position, equal columns, social hover

- **Decision:** EVEREST watermark — Onest 700, anchored bottom (82% height), smaller size so glyphs fit. Columns `repeat(5, 1fr)` + equal fluid gaps. Social hover: text blue, ↗ stays gold.
- **Files:** `tilda/embed-body.html`, `tilda/css/everest-site.css`

## 2026-06-12 — Footer: oversized EVEREST crop (fix misunderstanding)

- **Decision:** User wanted huge background caps with intentional bottom clip, not smaller fit. `clamp(5.5rem, 21vw, 17.5rem)`, centered ~54% height, `overflow:hidden` crops lower glyphs. Desktop columns: `flex` + `space-between` (first/last flush container edges).
- **Files:** `tilda/css/everest-site.css`

## 2026-06-12 — Footer: EVEREST below © line, thicker, equal cols

- **Decision:** Per user screenshot — EVEREST anchored `bottom: -0.14em` so glyphs dip below divider/© row and crop at footer edge. Onest 800 + light text-stroke. Columns back to `repeat(5, 1fr)` equal gaps.
- **Files:** `tilda/css/everest-site.css`, `tilda/embed-head.html`, `tilda/preview.html`

## 2026-06-12 — Footer outline + edges; CTA full width; globe spin constant

- **Decision:** EVEREST stroke-only (no fill), spans container width (`17cqi`), inside `footer-shell`. Columns `max-content` + `space-between`. Block #7 `cta-inner` full container width (removed 1120px cap). Globe `SPIN_SPEED` constant 0.0042 (no route phase slow/fast).
- **Files:** `tilda/embed-body.html`, `everest-site.css`, `everest-wibify-ui.css`, `everest-globe.js`

## 2026-06-12 — Block #7 container rhythm; EVEREST SVG gradient outline

- **Decision:** #7 → `container` + `cta-grid` (like blocks 02–06, not end-to-end). EVEREST → SVG gradient stroke in `footer-main` (contacts→social width), lowered `translateY(34%)`, bottom crop.
- **Files:** `tilda/embed-body.html`, `everest-site.css`, `everest-wibify-ui.css`

## 2026-06-12 — Footer: remove EVEREST, equal column gaps

- **Decision:** Removed background EVEREST (SVG + wrap). Desktop columns: `flex` + `space-between` + fixed `gap: 1.5rem` for equal spacing; first/last flush container edges.
- **Files:** `tilda/embed-body.html`, `tilda/css/everest-site.css`

## 2026-06-12 — Footer: fix uneven gaps (flex space-between)

- **Decision:** `1fr` grid made equal cells but uneven visual gaps (nav column wider). Desktop → `flex` + `justify-content: space-between`, cols `flex: 0 0 auto` — equal space between column groups, edges flush.
- **Files:** `tilda/css/everest-site.css`

## 2026-06-12 — Hero Reveal + section flow + card stacks

- **Decision:** Pre-scroll Hero Reveal — scene scale/fade, stars/glow, eyebrow line draw, whipped title line stagger, CTAs. Section flow — choreographed header (eyebrow → title → subtitle) + soft scrub lift between sections. Card stacks in About (#02) and Cooperation (#06): overlapped deck fans out on scroll (desktop 2-col, mobile vertical).
- **Files:** `assets/js/everest-animations.js`, `tilda/embed-body.html`, `tilda/css/everest-site.css`

## 2026-06-12 — Animation fix: hero parallax race, section opacity, card stack scrub

- **Decision:** User report: hero image vanished on scroll-back; sections/cards invisible or erratic. Fixes: hero parallax only after reveal completes (`fromTo` opacity 1→0.92, reversible scrub); restored simple section fade-up (no child opacity split, no section lift); card stacks use scroll-scrub fan-out (visible overlap, reverses on scroll-up).
- **Files:** `assets/js/everest-animations.js`, `tilda/css/everest-site.css`

## 2026-06-12 — Hero CTA flash fix; remove card anims; section curtain scroll

- **Decision:** Hero «Отправить запрос» flashed 2× (GSAP `clearProps` + CSS `opacity:1` on `.hero-cta`) — animate `.hero-buttons` wrapper with `autoAlpha`, no per-button opacity. Removed all card/stack scroll animations (grid-2 restored). Section curtain: top blocks darken on exit (scrub), bottom blocks unfold on enter (container opacity/y/blur scrub); hero copy fades on scroll-out.
- **Files:** `assets/js/everest-animations.js`, `tilda/embed-body.html`, `tilda/css/everest-site.css`

## 2026-06-14 — Hero type + expertise stack darken fix

- **Decision:** Hero v2: title color `rgba(232,236,242,0.92/0.62)` + `--hero-font-sans` (not pure `#fff` / DM Sans h1). Expertise: `section--stack-pin` skips section curtain darken (root cause of whole-page dimming during long pin). Stack: pin `stage` not full section, px-based end, one card visible at a time.
- **Files:** `everest-site-v2.css`, `everest-animations.js`, `everest-expertise-stack.js`, `embed-body-v2.html`

- **Decision:** Sectors: equal-height grid (`grid-auto-rows: 1fr`), line-art icons, title typography aligned with blocks (Instrument Serif accent + muted rest, blue/gold alternation). Tags as mono uppercase. Expertise: Wibify [04] scroll-pinned fold stack (6 steps), static fallback mobile/reduced-motion. Phase 3: `everest-animations-v2.js` section header stagger. Sprite: `assets/img/sector-icons.svg` + inline in embed-body-v2.
- **Files:** `tilda/embed-body-v2.html`, `tilda/css/everest-site-v2.css`, `assets/js/everest-sector-cards.js`, `assets/js/everest-expertise-stack.js`, `assets/js/everest-animations-v2.js`, `tilda/js/everest-i18n.js`, `tilda/preview-v2.html`

## 2026-06-14 — Typography revert + v2 visibility fix

- **Decision:** User: hero text must be white; block font (DM Sans + Instrument Serif accents) everywhere — revert v2 Switzer/Onest overrides. Disabled section curtain darken/blur in v2. Sector cards stay visible (inner elements animate only). Hero reveal: safety timeout + re-init via `EverestAnimationsInit` after async preview chain.
- **Files:** `tilda/css/everest-site-v2.css`, `assets/js/everest-animations.js`, `assets/js/everest-sector-cards.js`, `tilda/preview-v2.html`


- **Decision:** User: remove «Международная торговля» and «Агентские услуги» — not commodity sectors. Sectors block → 4 cards only (metals, energy, agri, minerals), Wibify [03] layout: large outline watermark `01–04`, icon rotates + gold on hover, mono tag pills with micro icons, arrow CTA. Expertise stack: re-init after async preview chain (`EverestExpertiseStackInit`), pin `stage` with crossfade timeline; `preview-v2.html` calls v2 inits + `ScrollTrigger.refresh()` after all scripts.
- **Files:** `tilda/embed-body-v2.html`, `tilda/css/everest-site-v2.css`, `assets/js/everest-sector-cards.js`, `assets/js/everest-expertise-stack.js`, `assets/js/everest-animations-v2.js`, `tilda/preview-v2.html`

## 2026-06-14 — Stack scroll + sector numbers/icons fix

- **Decision:** Expertise stack: crossfade only (no scale/y drift), scroll 140px/step (~700px for 6 cards vs 2400), kill duplicate ScrollTriggers on reinit. Sectors: watermark font DM Sans (no slashed zero in 0), arrow bottom-right off numbers, icons redrawn (ingot/flame/wheat/gem).
- **Files:** `everest-expertise-stack.js`, `everest-site-v2.css`, `embed-body-v2.html`, `assets/img/sector-icons.svg`

## 2026-06-14 — Expertise fold stack (Wibify [04])

- **Decision:** Expertise block: true fold stack (folded strips at top + active card below), 6 steps `01/06` after user confirmed full cycle. Icons placeholder — user adds later.
- **Files:** `everest-expertise-stack.js`, `everest-site-v2.css`, `embed-body-v2.html`


## 2026-06-14 — About + Cooperation: editorial layout (no cards)

- **Decision:** User: card layout in About and Cooperation feels cramped/redundant. Removed frosted cards. About: split editorial — lead paragraph left, numbered principles (01–02) right. Cooperation: two typographic columns with dash markers, vertical divider. Updated RU/ENG/CHI copy for clearer B2B tone.
- **Files:** `tilda/embed-body-v2.html`, `tilda/css/everest-site-v2.css`, `tilda/js/everest-i18n.js`

## 2026-06-14 — Hero beam CSS removed

- **Decision:** User rejected `.hero-beam` overlay — hero back to plain static image only. No video, no beam animation.
- **Files:** `tilda/embed-body.html`, `tilda/embed-body-v2.html`, `tilda/css/everest-site.css`

## 2026-06-14 — Hero option A: static image + CSS beam pulse

- **Decision:** User rejected AI/local video loops. Hero stays static JPG; added `.hero-beam` overlay — subtle screen-blend shimmer (7s loop), no ship/planet motion. `prefers-reduced-motion` → static beam.
- **Files:** `tilda/embed-body.html`, `tilda/embed-body-v2.html`, `tilda/css/everest-site.css`

## 2026-06-14 — Hero loop video v2 (static ship fix)

- **Decision:** v1 wrongly bobbed the ship. v2: ship mask frozen, only earth strip scrolls (200px/loop), beam brightness shimmer. Honest limit: single flat JPG cannot do true 3D planet spin — only 2D scroll of horizon lights.
- **Files:** `scripts/generate-hero-loop.py`, `assets/video/hero-ship-loop.mp4`, `.webm`

## 2026-06-14 — Hero loop video (local, no Kling)

- **Decision:** Kling AI rotated camera / turned ship bow. Generated seamless 12s loop locally from `hero-ship-full-desktop.jpg`: static framing, earth horizon scroll, micro ship bob (~2px), beam shimmer. Outputs MP4 + WebM. Script reusable: `scripts/generate-hero-loop.py`.
- **Files:** `assets/video/hero-ship-loop.mp4`, `assets/video/hero-ship-loop.webm`, `scripts/generate-hero-loop.py`

## 2026-06-14 — Open Design sibling setup

- **Decision:** Open Design belongs next to the Everest workspace, not inside `web design` / `ui-lab` / Tilda assets. Installed repo at `/home/vda/cursor/open-design`. Current system Node is `v22.22.0` and `pnpm` was missing, while Open Design requires Node `~24` and pnpm `>=10.33.2`; use `npx -y -p node@24 -p pnpm@10.33.2 ...` for this workspace.
- **Status:** Dependencies installed. Reliable path: `tools-dev start web` (no desktop Electron). Everest folder imported as project `Everest Trade`. Switched recommended agent to **Cursor Agent CLI** (`cursor-agent` at `~/.local/bin`); Codex was failing with 403. User must run `cursor-agent login` + select Cursor Agent in Open Design Settings.
- **Files:** `docs/NEW-CHAT.md`, sibling `/home/vda/cursor/open-design`

## 2026-06-14 — Font unification & scroll-pinned Expertise fold stack in v2

- **Decision:** Unified body font variables to "Switzer" across `tilda/css/everest-site-v2.css` and `assets/css/everest-wibify-ui.css` to prevent rendering drift. Implemented the interactive scroll-pinned fold stack (Wibify [04]) for the Expertise block in v2 sandbox. Created `assets/js/everest-expertise-stack.js` from scratch, which dynamically generates horizontal strips on desktop, handles GSAP ScrollTrigger pinning and crossfading, and translates strip titles on language change. Added `.expertise-card-v2__content` wrappers to `tilda/embed-body-v2.html` for clean horizontal layout.
- **Files:** `tilda/css/everest-site-v2.css`, `tilda/embed-body-v2.html`, `assets/js/everest-expertise-stack.js`, `tilda/preview-v2.html`

## 2026-06-14 — Redesign to Premium Sticky-Split Vertical Flow for Expertise Section

- **Decision:** Redesigned the Expertise block from clunky horizontal tabs to an ultra-premium, asymmetrical **sticky-split vertical scroll-linked flow**. On desktop, the section header stays pinned on the left (`position: sticky; top: 130px`) with generous spacing, while the 6 expertise cards scroll vertically on the right. Each card has a subtle, high-contrast dark container, a large gold index, and a blue-glowing active state. As the user scrolls, each card smoothly lights up (`opacity: 1`, glowing border/icon) when entering the viewport center, while inactive cards are elegantly dimmed (`opacity: 0.35`). On mobile, it collapses naturally into a clean, fully readable vertical list of cards.
- **Files:** `tilda/css/everest-site-v2.css`, `assets/js/everest-expertise-stack.js`

## 2026-06-14 — Premium Editorial Redesign of About & Cooperation Blocks & Globe High-DPI Fix

- **Decision:** Reassembled blocks [02] (About) and [06] (Cooperation) to completely remove clinical, thin 1px lines (stripes/dividers) and list dashes, replacing them with a premium, high-end visual layout.
  - **About [02]**: Removed the top border line. Styled the principles with an elegant, low-opacity large gold index (`font-size: 2.25rem`, `opacity: 0.25`) sitting behind/next to the text, matching premium editorial layouts.
  - **Cooperation [06]**: Removed the top border and vertical divider. Reassembled the two columns into gorgeous, solid-dark frosted cards (`background: rgba(12, 18, 28, 0.4)`, `border: 1px solid rgba(255, 255, 255, 0.05)`) with smooth hover states and glowing borders/glows. Replaced thin horizontal dashes with beautiful, minimal gold dots.
  - **Globe High-DPI Fix**: Solved the globe pixelation and blurry marker issue. The WebGL canvas was initializing with a small layout width before the container fully expanded, causing the browser to stretch the low-resolution canvas. Fixed by modifying `assets/js/everest-globe.js` to always render at a high-definition resolution of `520 * dpr` (up to 1040px), ensuring the globe and its trade routes/markers are always perfectly crisp and sharp.
- **Files:** `tilda/css/everest-site-v2.css`, `assets/js/everest-globe.js`

- **Decision:** Form focus reverted to brand gold rim only (no blue ring/glow). Removed `scrollIntoView` on validation (modal no longer jumps). Submit in form: focus without blue gradient animation.
- **Files:** `assets/css/everest-wibify-ui.css`, `assets/css/shiny-button.css`, `tilda/js/everest-app.js`

## 2026-06-14 — Hero + form a11y audit fixes

- **Decision:** `/impeccable audit` pass on hero + forms — fixed silent validation (P0), focus-visible rings on inputs/CTAs, placeholder/label contrast, 44px touch targets (burger, modal close), mobile hero CTA stack, form error/success states with i18n `form_invalid`.
- **Files:** `tilda/js/everest-app.js`, `tilda/js/everest-i18n.js`, `assets/css/everest-wibify-ui.css`, `assets/css/shiny-button.css`, `tilda/css/everest-site.css`

## 2026-06-14 — Motion performance pass (GSAP + CTA micro-feedback)

- **Decision:** Creative-director pass — keep corporate tempo, drop GPU-heavy `filter` scrub (blur/brightness) from GSAP; animate opacity/transform only. Tightened hero reveal (~2.6s safety), section curtain scrub, v2 section-header stagger, expertise card CSS transitions. CTA `:active` → `scale(0.97)` (Emil); `prefers-reduced-motion` disables shiny-cta infinite animation + expertise transitions.
- **Files:** `assets/js/everest-animations.js`, `assets/js/everest-animations-v2.js`, `tilda/css/everest-site-v2.css`, `assets/css/shiny-button.css`

- **Decision:** User feedback — Cooperation card boxes (especially «Для производителей») felt cramped vs About [02]. Reverted [06] to editorial two-column layout matching About: no card backgrounds/borders/hover glow, wider column gap, gold dot lists. Removed `box-shadow` from all content blocks: `.card`, `.frosted-card`, `.contact-card` (everest-site.css); `.coop-v2__column`, `.expertise-card-v2` default + scroll-guided `.is-active` (everest-site-v2.css). Scroll guidance now uses border/opacity only — no drop shadows.
- **Files:** `tilda/css/everest-site-v2.css`, `tilda/css/everest-site.css`

## 2026-06-14 — Selective scroll reveal + globe palette (canvas only)

- **Decision:** Scroll content reveal limited to About + Cooperation (headers still all sections). Sectors/Expertise/Globe/Contact unchanged. Globe cobe params: navy sphere (#0B1F3B family), softer land dots (mapBrightness 3.4), teal markers (#3D7F96), gold arcs, subtle teal glow — overlays/labels untouched.
- **Files:** `assets/js/everest-animations-v2.js`, `assets/js/everest-globe.js`

- **Decision:** Port lightweight site scroll choreography from Xtract/Landio (fade-up + stagger on section content; header line draw unchanged). Applied to About, Cooperation, Geography, Contact — not Sectors (existing reveal) or Expertise (stack). Cooperation [06]: kept buyer/producer split; added track eyebrow, column intro, 4 titled items per side with full RU/ENG/CHI copy.
- **Files:** `assets/js/everest-animations-v2.js`, `tilda/embed-body-v2.html`, `tilda/css/everest-site-v2.css`, `tilda/js/everest-i18n.js`, `tilda/t123-single.html`

- **Decision:** User feedback — Najaf sticky stack only in [04] Expertise (scale/dim/scrub 0.1). Reverted [02] About to editorial 2-col (lead + 4 principles grid with gold indices), [03] Sectors to 2×2 Wibify cards, [06] Cooperation to editorial columns. Expertise cards: icon/visual left, text right (DOM order). About readability: sticky lead, clearer principle grid, higher contrast copy.
- **Files:** `tilda/embed-body-v2.html`, `tilda/css/everest-site-v2.css`, `assets/js/everest-stack-cards.js`, `assets/js/everest-sector-cards.js`, `tilda/t123-single.html`

- **Decision:** Same Najaf sticky-stack scroll on all card sections: [03] Sectors (4), [04] Expertise (6), [06] Cooperation (2). Unified `stack-cards` + `stack-card` markup; sector reveal JS skipped when stack layout active.
- **Files:** `tilda/embed-body-v2.html`, `tilda/css/everest-site-v2.css`, `assets/js/everest-sector-cards.js`, `tilda/js/everest-i18n.js`, `scripts/build-t123-single.sh`, `tilda/t123-single.html`

## 2026-06-14 — Najaf-style sticky stack cards in About [02]

- **Decision:** Port Framer Najaf «4 layers on scroll» to Everest v2 About section: `position: sticky` cards + GSAP ScrollTrigger scrub (scale/brightness on covered layers). Four principles with RU/ENG/CHI copy; mobile = static vertical list; `prefers-reduced-motion` disables pin/scrub.
- **Files:** `assets/js/everest-stack-cards.js`, `tilda/embed-body-v2.html`, `tilda/t123-single.html`, `tilda/css/everest-site-v2.css`, `tilda/js/everest-i18n.js`, `tilda/embed-footer.html`, `tilda/preview-v2.html`

- **Decision:** `tilda/t123-single.html` — один блок T123: CSS + HTML v2 + все скрипты. Заменить `__EVEREST_BASE__` на URL файлов Tilda. Сборка: `scripts/build-t123-single.sh`.
- **Files:** `tilda/t123-single.html`, `scripts/build-t123-single.sh`, `tilda/embed-head.html`, `tilda/embed-footer.html`, `docs/tilda-deploy-guide.md`, `docs/tilda-embed-guide.md`

## 2026-06-14 — Expertise text: left align + larger type
- **Decision:** User rejected centered micro-copy. Text column left-aligned, vertically centered; title ~1.35–1.75rem, body ~15–17px, tags 10px. Grid rebalanced ~50/50 visual/text.
- **Files:** `tilda/css/everest-site-v2.css`

## 2026-06-14 — Final palette + typography lock

- **Decision:** User approved 3-color logo system (Navy `#003048` + Teal `#3D7F96` + Gold `#C8A45A`). Removed near-black backgrounds (`#0A0A0B`, `#000` on CTAs), cyan globe (`#33ccdd`), green WeChat/status colors. Unified fonts: Switzer everywhere + Instrument Serif accents + JetBrains Mono labels; dropped Onest, PT Serif, DM Sans, Inter. Globe keeps 5 trade regions; sphere navy, markers teal, arcs gold. Offices/phone unchanged (user will update later).
- **Files:** `assets/css/everest-wibify-ui.css`, `assets/css/shiny-button.css`, `assets/css/everest-overrides.css`, `tilda/css/everest-site.css`, `tilda/css/everest-site-v2.css`, `assets/js/everest-globe.js`, `assets/js/everest-hero-stars.js`, `tilda/embed-head.html`, `tilda/t123-single.html`, `tilda/preview*.html`, `docs/design-tokens.md`, `docs/design-taste.md`

## 2026-06-14 — Sector block [03] Lucide icons

- **Decision:** Block `#sectors` [03] — replaced hand-drawn SVG with Lucide icons (ISC). Main: layers / fuel / wheat / gem. Tags: package, clipboard-check, truck, file-text, warehouse, files, badge-check, globe, calendar, building-2, shield-check, ship. Arrow: arrow-right. Sprite source: `assets/svg/everest-sector-icons.svg`.
- **Files:** `tilda/embed-body-v2.html`, `tilda/t123-single.html`, `tilda/css/everest-site-v2.css`, `assets/svg/everest-sector-icons.svg`

## 2026-06-14 — Premium black restore + sector nums + globe + About polish

- **Decision:** User disliked all-navy/teal flood. Restored premium black palette (`#0A0A0B`, black CTAs). Sector [03] giant outline numbers → compact gold mono index with line. Globe: deep ocean (not flat black), land brighter, white markers + thin gold arcs, unified label styling (no country/route color split). About [02]: 4 principle cards with Lucide icons (handshake, route, globe, award), frosted icon boxes, lead first-line emphasis.
- **Files:** `assets/css/everest-wibify-ui.css`, `tilda/css/everest-site.css`, `assets/css/everest-overrides.css`, `assets/css/shiny-button.css`, `assets/js/everest-globe.js`, `assets/js/everest-hero-stars.js`, `tilda/embed-body-v2.html`, `tilda/css/everest-site-v2.css`, `tilda/t123-single.html`, `docs/design-taste.md`

## 2026-06-14 — Text accents: international blue + gold

- **Decision:** Two accent colors in headings only: `--accent-blue` `#72D8F5` (international/global words) + `--gold` `#C8A45A` (brand/partnership). Fixed v2 CSS bug where blue accents were gold-tinted. i18n: hero variant B + expertise titles — international words → blue.
- **Files:** `assets/css/everest-wibify-ui.css`, `tilda/css/everest-site-v2.css`, `tilda/css/everest-site.css`, `tilda/js/everest-i18n.js`

## 2026-06-14 — Hero AI upscale (Real-ESRGAN 4x)

- **Decision:** User hero pixelated at 1024×768 on wide screens. Upscaled with Real-ESRGAN `realesrgan-x4plus` (4096×3072) → responsive JPEG set at 3840/2560/1920px width; same composition, no crop. Tool: `tools/realesrgan/`, script: `scripts/build-hero-images.py`.
- **Files:** `assets/img/hero-ship-full-desktop.jpg`, `hero-ship-full-tablet.jpg`, `hero-ship-full-mobile.jpg`, `hero-ship-full.jpg`, `tilda/embed-body-v2.html`, `tilda/t123-single.html`, `scripts/build-hero-images.py`

## 2026-06-14 — Footer oversized wordmark

- **Decision:** Footer bottom gets cropped display typography «everest» (faizur/COSMOS pattern): Switzer 800, lowercase, muted white on dark bg, clipped at container edge. Columns + copyright/lang unchanged above.
- **Files:** `tilda/css/everest-site.css`, `tilda/t123-single.html`, `tilda/embed-body-v2.html`, `tilda/embed-body.html`, `tilda/embed-body-v3.html`, `tilda/embed-head.html`

## 2026-06-14 — Footer wordmark: position tune

- **Decision:** Wordmark pinned to footer bottom edge (no gap); ~62% letter height visible; overlay behind columns/copyright.
- **Files:** `tilda/css/everest-site.css`, `tilda/t123-single.html`, `tilda/embed-body-v2.html`, `tilda/embed-body.html`, `tilda/embed-body-v3.html`


