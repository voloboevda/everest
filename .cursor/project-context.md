# Product Context — Everest Trade

## Product

International commodity trading B2B landing. Premium corporate partner — **not** startup hype, **not** founders story.

- **Live draft:** https://lovingly-nominal-crow.tilda.ws/
- **Domain (last step):** everestcentr.com
- **Languages:** RU · ENG · CHI (switcher: **РУ** | ENG | **中文**)

## Users

Procurement teams · producers · trading partners · international buyers.

## Design DNA

Linear / Stripe / Vercel restraint + Wibify dark motion patterns (Bundle D).

**Active bundle:** D — see `docs/design-bundles.md`

**Stakeholder taste:** `docs/design-taste.md` (living document — always read before visual work)

## Brand colors (fixed)

| Token | Value | Use |
|-------|-------|-----|
| BG | `#0A0A0B` | Page background |
| Logo navy | `#003048` | Brand anchor |
| Accent blue | `#3D7F96` | Interactive, text accents |
| Gold | `#C8A45A` | Secondary accent, sparingly |

Do not invent additional brand colors.

## Typography (active)

- Body: Switzer / DM Sans
- Emphasis: Instrument Serif
- Labels: JetBrains Mono
- CHI: Noto Sans SC

## Icons

Lucide in ui-lab. Tilda: custom SVG / sector sprite. No emoji. No mixed libraries.

## Animations

GSAP corporate tempo in production. Motion in ui-lab. Subtle only. Hero: static ship image (no video/beam per 2026-06-14 decision).

## Primary funnel

One primary CTA in Hero → `#request`. Header: logo + WeChat + lang only. No duplicate section CTAs.

## Positioning rules

- Equal-weight geography — no RU→CN emphasis
- B2B professional tone
- No theme toggle (single dark tonality)
- WeChat QR = placeholder until live asset

## Repo map

| Path | Role |
|------|------|
| `tilda/` | Deploy-ready T123 blocks |
| `assets/` | Shared CSS/JS, images, video |
| `ui-lab/` | React/shadcn prototype sandbox |
| `docs/` | Briefs, guides, taste, i18n |
| `integrations/` | Form bridge (email, Telegram, YouGile) |
| `.cursor/` | Agent system (this folder) |

## Deploy vs sandbox

| Version | Preview | Deploy files |
|---------|---------|--------------|
| v2 production | `preview.html` | `t123-single.html` (or `embed-head` + `embed-body-v2` + `embed-footer`) |

Build single paste: `./scripts/build-t123-single.sh`

## Goal

Every new feature must feel like the same product. Read memory before changes:

- `docs/agents-log.md`
- `docs/design-taste.md`
- `.cursor/design-system.md`

## Open Design (sibling)

Optional design tool at `/home/vda/cursor/open-design` — imports this folder. See `docs/NEW-CHAT.md` § Open Design.
