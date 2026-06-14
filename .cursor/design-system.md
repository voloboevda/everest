# Design System

Hard constraints for all agents. Everest Bundle D values override generic defaults.

## Spacing scale

```
4, 8, 12, 16, 24, 32, 48, 64, 96
```

Use Tailwind/CSS variables where possible. No arbitrary spacing unless layout requires it — document why in agents-log.

## Border radius

| Token | Value | Use |
|-------|-------|-----|
| sm | 8px | Small chips |
| md | 12px | Cards (where rounded) |
| lg | 16px | Modals |
| square | 0 | shiny-cta, outline-cta, nav bar (Everest standard) |

## Grid

| Breakpoint | Columns |
|------------|---------|
| Desktop ≥1200 | 12 |
| Tablet 768–1199 | 8 |
| Mobile <768 | 4 |

Content aligns to `.container` gutter. Avoid random positioning.

## Layout rules

- One primary action per screen/section
- Mobile-first
- Prevent overflow and layout shift
- Generous whitespace — do not fill empty areas

## Section design

Every section needs: purpose · primary message · hierarchy. No filler sections.

## Component whitelist (prefer reuse)

**Tilda:** `.shiny-cta`, `.outline-cta`, `.block-eyebrow`, `.frosted-card`, `.contact-field`, `.lang-switcher`, sector cards v2, expertise scroll flow.

**ui-lab:** shadcn primitives, `joly-button`, `shiny-button`, `contact-card`, `footer-section`, `stars`, `cobe-globe-pulse`, `radial-glow-background`.

Before new component → check whitelist + shadcn + 21st.dev.

## File structure

```
tilda/          Deploy HTML/CSS/JS
assets/         Shared production assets
ui-lab/         React prototypes
  components/ui/
  lib/
docs/           Product documentation
integrations/   Backend bridges
```

## Design tokens (reference)

Full token list: `docs/design-tokens.md`  
Bundle comparison: `docs/design-bundles.md`  
Reasoning: `docs/design-system-reasoning.md`

## Production mode

Build as if maintained by a team. No hacks · no temporary fixes · no hardcoded one-offs outside token files.

## Senior designer check

Before finalizing: Would Linear ship this? Would Vercel ship this? If not → refine.

## Self-review checklist

- [ ] Visual hierarchy
- [ ] Spacing consistency
- [ ] Typography scale
- [ ] Accessibility
- [ ] Responsive 320–980px
- [ ] Matches Bundle D + design-taste
