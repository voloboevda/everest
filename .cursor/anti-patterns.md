# Anti-Patterns

Agents follow prohibitions more reliably than abstract advice. **Never do:**

## Visual

- Random gradients or neon/AI-purple
- Multiple accent colors competing on one element
- Excessive shadows or drop shadows on content blocks (Everest 2026-06-14: removed)
- Excessive border radius where square is established (CTAs, nav)
- Decorative lines, badges, particles without purpose
- Centered text everywhere
- Giant hero sections with no message hierarchy
- Stock-photo collage overload
- Russia→China arrow hero graphics

## Icons

- Emojis as UI icons
- Mixed icon libraries
- Random icons that don't match semantic meaning
- Decorative icons where text alone suffices

## Animation

- Bounce, spin, flashy effects
- Filter/blur scrub in GSAP (GPU-heavy — use opacity/transform only)
- Decorative animation without UX purpose
- Ignoring `prefers-reduced-motion`

## UX / Content

- Generic SaaS copy ("Welcome to our platform")
- Multiple primary CTAs per section (Everest: one funnel)
- Theme toggle (single tonality only)
- Sections that exist only to fill space
- 12-section landing bloat on single-page site

## Code / Process

- Editing v1 deploy files while experimenting (use v2 sandbox)
- React in Tilda deploy without approved port
- Duplicated skills/rules in global `~/.cursor/`
- Skipping `docs/agents-log.md` after session
- Inventing new colors outside brand tokens

## AI-specific failures

- Starting from components before content/hierarchy
- Adding features when task is to simplify
- Redesigning established patterns without request
- Generating multiple stylistic variants
- "Swedish buffet" of inconsistent design choices

## When uncertain

Choose: simpler · cleaner · easier to maintain · more readable.

Do not optimize for visual complexity.

## Stop generating

When enough quality is achieved — stop. Do not add sections, effects, or features.
