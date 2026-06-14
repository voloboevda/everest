# Новый чат / новый агент — шпаргалка

> **Живой файл.** Агенты дополняют таблицу «Узкие задачи», когда появляется новый тип работ.  
> Также пишите в `docs/agents-log.md` после каждой сессии.

---

## Шаблон первого сообщения

Скопируйте в **новый чат** (workspace должен быть `web design`):

```
Проект: Everest Trade, Tilda B2B лендинг.
Папка: /home/vda/cursor/web design
Сайт: https://lovingly-nominal-crow.tilda.ws/
Домен (позже): everestcentr.com

Прочитай: .cursor/cursor-rules.md, .cursor/project-context.md, docs/NEW-CHAT.md, README.md, docs/design-taste.md
Правила и skills в .cursor/ — не создавай глобальные (~/.cursor/skills).
Workflow: .cursor/workflow.md

Задача: [ОПИШИТЕ ЗДЕСЬ]

После работы: docs/agents-log.md + при новом типе задачи — строка в docs/NEW-CHAT.md.
Вопросы мне — по-русски. Технические файлы — English.
```

---

## Готовый промпт: 21.dev / shadcn компонент (UI Lab)

Скопируйте в **новый чат** и подставьте URL компонента с [21st.dev](https://21st.dev):

```
Проект Everest Trade, /home/vda/cursor/web design.
Прочитай docs/NEW-CHAT.md, docs/design-taste.md.

Задача: интегрировать React-компонент в UI Lab (не в Tilda напрямую).
CLI (если нужен): npx shadcn@latest add [URL с 21st.dev]

Контекст:
- Песочница: ui-lab/ (Vite, React 19, TS, Tailwind v4, shadcn)
- Компоненты: ui-lab/components/ui/
- Алиасы: @/components/ui, @/lib/utils (см. ui-lab/components.json)
- Токены Everest: ui-lab/src/index.css (Bundle A)
- Основной сайт — Tilda/vanilla; React только для прототипов

Компонент: [URL или имя, напр. contact-card / joly-button]
Демо: обновить ui-lab/src/App.tsx под Everest B2B (RFQ, не 21.dev placeholder)
Зависимости: npm install в ui-lab/, проверить npm run build

После: docs/agents-log.md + строка в таблице «Узкие задачи» при новом типе.
```

**Быстрый старт UI Lab:**

```bash
cd "/home/vda/cursor/web design/ui-lab" && npm install && npm run dev
```

→ http://localhost:5173

---

## Open Design рядом с Everest

Open Design **не ставится внутрь** `web design`, `ui-lab/` или Tilda-файлов. Это отдельный sibling-проект:

- Open Design: `/home/vda/cursor/open-design`
- Everest: `/home/vda/cursor/web design`

### 1. Запуск (web-режим, без desktop Electron)

```bash
cd "/home/vda/cursor/open-design"
npx -y -p node@24 -p pnpm@10.33.2 pnpm exec tools-dev start web
npx -y -p node@24 -p pnpm@10.33.2 pnpm exec tools-dev status
```

Открыть web URL из `status` (порт меняется после перезапуска).

### 2. Подключить Everest (не upload, а import локальной папки)

**В UI:** New project → **Open folder** → выбрать `/home/vda/cursor/web design`

**CLI:**

```bash
cd "/home/vda/cursor/open-design"
npx -y -p node@24 -p pnpm@10.33.2 node apps/daemon/dist/cli.js project import "/home/vda/cursor/web design" --name "Everest Trade"
```

Open Design читает/пишет **прямо в эту папку**. Отдельной «заливки» нет.

### 3. Агент / коннекторы

| Что | Нужно? | Статус |
|-----|--------|--------|
| **Cursor Agent CLI** (`cursor-agent`) | **рекомендуется** — тот же аккаунт, что Cursor IDE | установлен: `~/.local/bin/cursor-agent` |
| **Cursor IDE** (`cursor`) | редактор | отдельно от Open Design |
| **Codex CLI** | опционально | есть, но может давать 403 — не использовать по умолчанию |
| **API BYOK** | fallback | Settings → Anthropic/OpenAI/Gemini + API key |

**Важно:** путь `/home/vda/cursor/web design` — это **имя папки на диске**, не «агент Cursor». Open Design сам выбирает CLI в Settings → Execution mode.

#### Переключить Open Design на Cursor (не Codex)

1. В терминале один раз залогиниться:

```bash
cursor-agent login
cursor-agent status   # должно быть: Logged in
```

2. Перезапустить Open Design с PATH, где есть `cursor-agent`:

```bash
cd "/home/vda/cursor/open-design"
npx -y -p node@24 -p pnpm@10.33.2 pnpm exec tools-dev stop
PATH="$HOME/.local/bin:$PATH" CURSOR_AGENT_BIN="$HOME/.local/bin/cursor-agent" \
  npx -y -p node@24 -p pnpm@10.33.2 pnpm exec tools-dev start web
```

3. В UI Open Design: **Settings (⚙) → Execution mode → Local CLI → Cursor Agent** → **Rescan** → Save.

4. В чате проекта убедиться, что в шапке не выбран Codex.

Доп. MCP-коннекторы: глобально в `~/.cursor/mcp.json` (github, playwright, context7, figma, 21st-magic, filesystem, brave-search). Перезапуск Cursor после изменений.

### 5. Промпт: полный аудит + план улучшений (Open Design)

**Настройки перед отправкой:**
- Project: **Everest Trade**
- Skill: `web-prototype` (или без skill — agent читает repo)
- Design system: не менять на первом проходе (или `Neutral Modern`)
- Execution mode: **Local CLI → Cursor Agent** (не Codex)

**Фаза 1 — только анализ, без правок файлов.** Скопируйте целиком:

```
You are auditing an imported local project: Everest Trade B2B landing.

Project root: /home/vda/cursor/web design
Live Tilda draft: https://lovingly-nominal-crow.tilda.ws/
Target domain (later): everestcentr.com

PHASE 1 ONLY — READ & ANALYZE. Do NOT edit any files yet.

Read these first (in order):
1. docs/customer-brief-landing.md — 8-block structure
2. docs/design-taste.md — stakeholder taste + decisions log
3. docs/design-bundles.md — Bundle D (Wibify dark) is ACTIVE
4. docs/NEW-CHAT.md — task map + preview commands
5. docs/agents-log.md — recent session decisions (2026-06-12 … 2026-06-14)
6. tilda/preview-v2.html + tilda/embed-body-v2.html + tilda/css/everest-site-v2.css — current v2 sandbox
7. tilda/preview.html + tilda/embed-body.html — stable v1 (do not break deploy)
8. assets/js/everest-animations.js, everest-sector-cards.js, tilda/js/everest-i18n.js
9. ui-lab/ — React prototype sandbox (optional improvements here first)

Context from prior work (must respect):
- Premium international B2B partner tone — NOT startup, NOT founders story
- Do NOT emphasize Russia→China as primary narrative
- Languages: RU | ENG | CHI (中文). Switcher labels: РУ | ENG | 中文
- Active visual direction: Bundle D (Wibify dark) — DM Sans + Instrument Serif, blue #3D7F96 + gold #C8A45A accents
- Single RFQ funnel: one primary CTA in Hero → #request; header = logo + WeChat + lang only
- No theme toggle; no neon/AI-purple gradients; no visual clutter
- v2 sandbox: preview-v2.html / embed-body-v2.html — sectors (4 cards), expertise (static 6-card grid), hero stars/glow
- v1 stable: preview.html — Tilda deploy source (embed-head/body/footer)
- Animations: GSAP corporate tempo; respect prefers-reduced-motion
- WeChat QR = placeholder; domain connect is LAST step

Deliverables (structured report):

## A. Executive summary (5–8 bullets)
What works, what feels inconsistent, biggest UX/visual gaps.

## B. Architecture map
How v1 vs v2 vs ui-lab relate; which files are deploy-critical vs sandbox.

## C. Block-by-block review [01]–[08]
For each section: status (good / needs work / broken), specific file refs, mobile risk.

## D. Design system alignment
Does current CSS match Bundle D + design-taste.md? List drift (fonts, colors, spacing, buttons).

## E. i18n & content
RU/ENG/CHI coverage gaps in everest-i18n.js vs content-ru-en-chi.md.

## F. Animation & performance
Hero reveal, section flow, globe, sector cards — what to keep, simplify, or remove.

## G. Improvement plan (phased)
- Phase A: safe wins in v2 sandbox only (no deploy files)
- Phase B: ui-lab prototypes worth porting to Tilda
- Phase C: v1 merge + Tilda deploy prep

For each phase: 3–5 concrete tasks, estimated risk (low/med/high).

## H. Questions for the stakeholder (IN RUSSIAN)
Ask 8–12 multiple-choice or A/B questions before any edits. Examples:
- Keep Wibify dark only vs offer lighter variant?
- Prioritize v2 polish vs finish v1 deploy?
- Hero: stars+split vs simpler corporate photo hero?
- Sectors: 4 cards final or restore removed categories?
- Expertise: static grid vs scroll interaction?
Include option «Другое / скажу голосом» on each.

## I. Optional quick wins
If I approve Phase A immediately after your report, list exact files you would touch first.

Rules:
- Questions to me in Russian (Cyrillic).
- Report in Russian for sections H; technical sections can be English.
- Do not create new markdown files unless I ask.
- Do not modify tilda/embed-body.html, embed-head.html, embed-footer.html in Phase 1.
```

**Фаза 2 — после ваших ответов.** Отправьте:

```
PHASE 2 — IMPLEMENT approved items from your Phase A plan only.
Work in tilda/preview-v2.html sandbox + everest-site-v2.css + related assets/js.
Do not touch embed-head/footer/body (v1 deploy) until I explicitly approve merge.
After edits: list files changed + how to verify at http://localhost:8080/preview-v2.html
Log summary for docs/agents-log.md (English).
```

---

### 4. Первый тест на Everest (короткий промпт)

1. Открыть проект **Everest Trade** в Open Design UI  
2. Skill: `web-prototype` или `saas-landing`  
3. Design system: `Neutral Modern` или `Warm Editorial`  
4. Execution mode: **Local CLI → Codex** (или API BYOK)  
5. Промпт (пример):

```
Read docs/design-taste.md and tilda/preview-v2.html.
Propose a cleaner B2B hero section for Everest Trade.
Edit only ui-lab/ or tilda/css/everest-site-v2.css — do not break Tilda deploy files.
Tone: premium corporate partner, RU/ENG/CHI later, no Russia→China emphasis.
```

6. Preview Everest отдельно:

```bash
cd "/home/vda/cursor/web design/tilda" && python3 -m http.server 8080
```

→ http://localhost:8080/preview-v2.html

### Важно

- Не запускайте `pnpm tools-dev` без аргументов — он тянет desktop Electron и блокирует import папки.
- Используйте `tools-dev start web`.
- Open Design = прототип/редактирование файлов; Tilda deploy остаётся через `docs/tilda-deploy-guide.md`.

---

## Готовый промпт: карта и география

```
Проект Everest Trade, /home/vda/cursor/web design.
Прочитай docs/NEW-CHAT.md и docs/design-taste.md.

Задача: обновить блок «География торговли».
Файл: tilda/embed-body.html (секция .geo-section, .everest-globe-root), assets/js/everest-globe.js.
Нужно: [новая картинка карты / URL / файл] + при необходимости поправить позиции точек (left/top %).
Равноправные регионы, без акцента RU→CN.
Проверь на http://localhost:8080/preview.html
```

---

## Узкие задачи → отдельный чат

| # | Задача | Основные файлы | Чат |
|---|--------|----------------|-----|
| 1 | **Карта, точки на карте, география** | `tilda/embed-body.html` | 🗺 отдельно |
| 2 | **Иконки секторов / экспертизы** | `tilda/embed-body.html` (img src) | отдельно |
| 3 | **Hero: фото, заголовок, CTA** | `tilda/embed-body.html`, `tilda/css/everest-site.css`, `assets/css/everest-wibify-ui.css` | отдельно |
| 25 | **Hero radial glow + full viewport** | `ui-lab/components/ui/radial-glow-background.tsx`, `everest-wibify-ui.css` | отдельно |
| 26 | **Hero stars + split layout + whipped type** | `ui-lab/components/ui/stars.tsx`, `assets/js/everest-hero-stars.js`, `tilda/embed-body.html` | отдельно |
| 27 | **Block eyebrows [01]–[08] + title accents** | `tilda/embed-body.html`, `everest-i18n.js`, `everest-wibify-ui.css` | отдельно |
| 28 | **GlobePulse (cobe) ui-lab + Tilda globe** | `ui-lab/components/ui/cobe-globe-pulse.tsx`, `assets/js/everest-globe.js` | отдельно |
| 4 | **Блок логистика FOB/CIF/CPT** | `tilda/embed-body.html`, `tilda/js/everest-i18n.js` | отдельно |
| 5 | **Стили, цвета, шрифты** | `tilda/css/everest-site.css`, `docs/design-tokens.md`, `docs/design-bundles.md` | отдельно |
| 6 | **Тексты RU / ENG / CHI** | `tilda/js/everest-i18n.js`, `docs/content-ru-en-chi.md` | отдельно |
| 7 | **Переключатель языков CHI** | `tilda/embed-body.html`, `everest-i18n.js` | отдельно |
| 8 | **WeChat кнопка + QR** | `assets/js/everest-wechat.js`, header в embed-body | отдельно |
| 9 | **Форма RFQ** (модал + блок `#request`, Wibify fields) | `tilda/embed-body.html`, `everest-app.js`, `everest-wibify-ui.css`, `rec2091691681` | отдельно |
| 10 | **Деплой на Tilda (заливка)** | `docs/tilda-deploy-guide.md`, `embed-head/footer/body` | отдельно |
| 11 | **YouGile + Telegram + webhook** | `integrations/tilda-form-bridge/`, `docs/yougile-integration.md` | отдельно |
| 12 | **Аналитика global + Baidu CHI** | `assets/js/analytics-*.js`, `docs/china-analytics-setup.md` | отдельно |
| 13 | **GSAP анимации** | `assets/js/everest-animations.js` | отдельно |
| 29 | **Hero Reveal + section flow + card stacks** | `everest-animations.js`, `embed-body.html`, `everest-site.css` | отдельно |
| 30 | **Hero loop video (image → MP4/WebM)** | `scripts/generate-hero-loop.py`, `assets/video/hero-ship-loop.*` | отдельно |
| 30 | **Wibify cards v2: sectors + expertise static grid** | `preview-v2.html`, `embed-body-v2.html`, `everest-sector-cards.js`, `everest-site-v2.css` | отдельно |
| 32 | **v3 editorial sandbox (A/B vs v2)** | `preview-v3.html`, `embed-body-v3.html`, `everest-site-v3.css`, `everest-animations-v3.js` | отдельно |
| 31 | **Open Design setup / web mode** | sibling `/home/vda/cursor/open-design`, `docs/NEW-CHAT.md` | отдельно |
| 14 | **Мобильная вёрстка** | `tilda/css/everest-site.css`, preview 320–980px | отдельно |
| 15 | **Логотип** | `assets/img/everest-logo*.png`, `tilda/embed-body.html`, `embed-head.html` (favicon) | отдельно |
| 16 | **Документы PDF** (когда будут) | новая секция в embed-body | отдельно |
| 17 | **Домен everestcentr.com** | `docs/domain-launch.md` — **последний шаг** | отдельно |
| 18 | **Ревью CHI для партнёров** | `docs/china-review-checklist.md` | отдельно |
| 19 | **QA перед publish** | `docs/qa-checklist.md` | отдельно |
| 20 | **UI Lab — 21.dev / shadcn компонент** | `ui-lab/components/ui/`, `ui-lab/src/App.tsx`, `ui-lab/components.json` | отдельно |
| 21 | **Футер (21.dev layout)** | `tilda/embed-body.html`, `tilda/css/everest-site.css`, `everest-i18n.js` | отдельно |
| 22 | **Frosted glass cards (tilt + glare)** | `ui-lab/components/ui/interactive-frosted-glass-card.tsx`, `assets/js/everest-frosted-cards.js`, `tilda/css/everest-site.css` | отдельно |
| 23 | **Wibify dark style (фазы)** | `tilda/css/everest-site.css`, `assets/js/everest-animations.js`, `docs/design-bundles.md` (#D) | отдельно |
| 24 | **Hero: типографика (A/B/C)** | `tilda/js/everest-hero-variants.js`, `everest-i18n.js`, `docs/content-ru-en-chi.md` | отдельно |

---

## Готовый промпт: Hero типографика

```
Проект Everest Trade, /home/vda/cursor/web design.
Прочитай docs/content-ru-en-chi.md (§ Hero display typography).

Задача: [новый вариант текста / правка A|B|C / другой акцент]
Консоль preview: everestSetHeroVariant('a'|'b'|'c'), everestClearHeroVariant()
Файлы: tilda/js/everest-i18n.js, tilda/js/everest-hero-variants.js, tilda/css/everest-site.css
```

---

## Tilda block IDs (напоминание)

| ID | Что |
|----|-----|
| `rec2091586451` | Head: CSS, config (`embed-head.html`) |
| `rec2091603121` | Тело сайта (`embed-body.html`) |
| `rec2091691681` | Скрытая нативная форма Tilda (submit) |

---

## Локальный preview

```bash
cd "/home/vda/cursor/web design/tilda" && python3 -m http.server 8080
```

→ http://localhost:8080/preview.html (Ctrl+Shift+R после правок)

**Preview v2 (Wibify cards sandbox):**

```bash
cd "/home/vda/cursor/web design/tilda" && python3 -m http.server 8080
```

→ http://localhost:8080/preview-v2.html — не трогает `preview.html`

**Preview v3 (editorial clarity — сравнение с v2):**

→ http://localhost:8080/preview-v3.html — отдельная ветка, Stripe/Linear-подход

Симлинк `tilda/assets` → `../assets` нужен для preview (JS, CSS, `world-dots.svg`).

Белый фон — норма (светлая тема). Контент должен быть виден целиком.

---

## Правило для агентов

После узкой задачи:

1. `docs/agents-log.md` — что сделано  
2. Если задачи не было в таблице выше — **добавить строку** в «Узкие задачи»  
3. Не дублировать skills/rules в глобальные папки

---

## История дополнений

| Дата | Добавлено |
|------|-----------|
| 2026-06-12 | Файл создан, 19 узких задач, промпт для карты |
| 2026-06-12 | #20 UI Lab / joly-button (React shadcn) |
| 2026-06-12 | Промпт «21.dev / shadcn» + contact-card в ui-lab |
| 2026-06-12 | #22 frosted glass cards — UI Lab + Tilda sector/expertise |
| 2026-06-12 | Theme toggle отменён — одна тональность, без light/dark |
| 2026-06-12 | #23 Wibify dark Bundle D — фаза 1: токены, шрифты, header, кнопки, GSAP |
| 2026-06-12 | #24 Hero display typography A/B/C — RU/ENG/CHI, console switcher |
| 2026-06-12 | #25 Hero radial glow blue+gold + full viewport | `radial-glow-background.tsx`, `everest-wibify-ui.css`, `everest-site.css` |
| 2026-06-12 | #26 Hero stars (white/blue/gold), 50/50 split, whipped headline | `stars.tsx`, `everest-hero-stars.js`, hero i18n + CSS |
| 2026-06-12 | #27 Block eyebrows [01]–[08], blue/gold title accents, section subtitles |
| 2026-06-12 | #9 RFQ — Wibify modal + `#request` block forms (dual) |
| 2026-06-12 | #29 Hero Reveal, section flow, card stacks (About + Cooperation) |
| 2026-06-14 | Hero beam CSS removed — static image only |
| 2026-06-14 | #30 Wibify [03]→sectors, [04]→expertise stack; preview-v2 sandbox |
| 2026-06-14 | #31 Open Design sibling install + web-mode launch notes |
| 2026-06-14 | Open Design Phase 1 audit prompt (full project review) |
