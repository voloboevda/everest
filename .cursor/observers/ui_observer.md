# UI Observer

Detects visual system drift. If detected → normalize to design system.

## Detect

- Spacing not on scale (4–96)
- Typography drift (new font sizes)
- Color outside brand tokens
- Icon mismatch or mixed libraries
- Inconsistent button styles
- Shadow/glow where removed by decision

## Everest-specific

- Gold+blue fighting on same element
- Square CTAs rounded incorrectly
- v2 styles leaking into v1 deploy files unintentionally

## Action

Map violations to token · fix in sandbox first · log in agents-log.
