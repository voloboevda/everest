# Design taste — stakeholder preferences

> Living document. Agents update § Decisions when user approves or dictates preferences.

## Core taste

- **Clean, very presentable** — premium B2B, no visual clutter
- **No muddy/darkened palettes** — crisp contrast, intentional navy not black soup
- **No decorative noise** — no excessive gradients, particles, or “startup hype”
- Inspiration (patterns only): [Awwwards](https://www.awwwards.com/), [21.dev](https://21.dev/) — buttons, micro-interactions, restrained layouts

## Default (customer brief)

- Colors: `#0B1F3B`, `#2E2E2E`, `#C8A45A`, `#FFFFFF`
- Fonts: Montserrat (headings), Roboto (body), Noto Sans SC (CHI)

## UI patterns to prefer

- Generous whitespace, clear section rhythm
- Subtle shadows (soft, low blur) — not neumorphism
- Gold accent used sparingly (CTA, dividers, icons)
- GSAP: fade-up / stagger only; corporate tempo

## Anti-patterns

- Neon, purple AI gradients, brutalism, chaotic maximalism
- Stock-photo collage overload
- Russia→China arrow hero graphics

## Decisions log

| Date | Decision | Notes |
|------|----------|-------|
| 2026-06-12 | Clean premium default | User prefers presentable sites without visual garbage |
| 2026-06-12 | Logo approved | Navy mountain mark + EVEREST / TRADE CO., LIMITED; header crop + full footer; transparent PNG |
| 2026-06-12 | WeChat QR placeholder | Live QR later |
| 2026-06-12 | Buttons approved | Primary: blue gradient default, gold gradient + soft glow on hover. Outline: 1px border, gold rim on hover (globe-legend spec). No scale/shimmer/heavy effects. |
| 2026-06-12 | Globe route UX | Active route endpoints: country label hidden, blue pulse visible |
| 2026-06-12 | CTA strategy | Single funnel: one primary button in Hero → #request; Submit in form. No duplicate CTAs per section. «Связаться» deferred until distinct action exists. Header: logo + WeChat + lang only. |
| 2026-06-12 | No theme switch | Single tonality; site tuned to fixed visuals — no light/dark toggle |
| 2026-06-12 | Wibify reference adopted | Full dark style (Bundle D): wibify.agency patterns — nav, shiny-cta, lang-switcher, contact-field form |
| 2026-06-12 | Logo-only accent | Drop gold+navy UI mix. Accent from logo `#003048` → UI `#5EC8E8`. File: `assets/css/everest-wibify-ui.css` |
| 2026-06-12 | Blue + gold accents | Hero radial: gold `#C8A45A` + blue `#72D8F5`; title accents alternate odd=blue / even=gold; outline CTA gold rim on hover |
| 2026-06-12 | Muted logo accent | Text/UI accent `#3D7F96` (logo `#003048` family, matches shiny-cta); no grain overlay; flat backgrounds |
| 2026-06-12 | Lang switcher labels | **РУ** \| ENG \| **中文** (native script on RU/CHI; ENG stays Latin) |
| 2026-06-14 | Hero motion | Plain static ship JPG only — no video, no beam CSS |
| 2026-06-14 | Final palette lock | 3 logo colors: Navy `#003048` bg, Teal `#3D7F96` accent, Gold `#C8A45A` highlights. Globe: navy sphere, teal pins, gold arcs. Typography unified: Switzer + Instrument Serif + JetBrains Mono (+ Noto Sans SC for CHI). Offices/phone left as placeholders. |
| 2026-06-14 | Premium black restored | User reverted full-navy look. BG back to `#0A0A0B` + black hero/CTA; gold-led accents (less teal flood). Sector indices: compact mono badge. Globe: deep ocean base, unified label chrome, warm markers. About [02]: Lucide icons + card layout. |
| 2026-06-14 | Footer wordmark | Oversized cropped «everest» at footer bottom (faizur/COSMOS pattern), Switzer 800, muted on dark bg |

## Adaptation rule

When user picks a bundle or dictates a preference, append here. Future proposals should align with accumulated decisions.
