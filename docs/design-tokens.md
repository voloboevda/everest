# Design tokens — Everest Trade

Active bundle: **D** (Wibify UI + logo palette — see `design-bundles.md`)

## Color (logo-derived, 3-color system)

```css
.everest-root {
  --bg: #003048;           /* Navy — logo brand, page background */
  --bg-elevated: #002535;  /* Navy dark — cards, buttons, overlays */
  --brand: #003048;
  --accent: #3D7F96;       /* Teal — links, markers, focus, interactive */
  --gold: #C8A45A;         /* Gold — title accents, routes, CTA hover */
  --text: rgba(255, 255, 255, 0.92);
  --muted: rgba(255, 255, 255, 0.55);
  --border: rgba(255, 255, 255, 0.1);
}
```

No pure black (`#000`) in UI surfaces — shadows only.

## Typography

| Role | Family | Weight |
|------|--------|--------|
| H1–H3, body | Switzer | 400–700 |
| Emphasis words | Instrument Serif italic | 400 |
| Labels `[01]` | JetBrains Mono | 400–500 |
| CHI body | Noto Sans SC | 400–600 |

Loaded fonts: Switzer (Fontshare), Instrument Serif, JetBrains Mono, Noto Sans SC.

## Spacing

- Section padding: 80px desktop / 48px mobile
- Container max-width: 1200px
- Card gap: 24px

## Radius & shadow

- Button radius: 0 (square Wibify) / 4px legacy
- Card radius: 0–8px
- Shadow: `0 12px 48px rgba(0, 0, 0, 0.35)`

## Globe (Geography)

- Sphere: `#003048`
- Markers (5 regions): `#3D7F96`
- Trade arcs: `#C8A45A`
- Chip labels: navy bg + teal border; arc labels: navy bg + gold border

## Breakpoints (Tilda Zero)

320 · 480 · 640 · 980 · 1200
