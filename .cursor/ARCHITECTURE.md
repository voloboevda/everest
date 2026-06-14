# Cursor Product Studio — Architecture

Single coherent system for AI-first web design in this repo. Consolidated from the Cursor SaaS workflow research; adapted for **Everest Trade** (Tilda production + React ui-lab).

## How it works

```
Intent → Planner → Designer → Engineer → Observers → Critic → Simplifier → Memory
```

Every UI change passes through **clarity first**, then **implementation**, then **self-critique**, then **simplification**. Rules live in `.cursor/`; product facts live in `docs/`; decisions accumulate in `docs/agents-log.md`.

## Layers

| Layer | Path | Purpose |
|-------|------|---------|
| **Core rules** | `cursor-rules.md` | Master agent behavior — read every session |
| **Product memory** | `project-context.md` | What this product is; links to live docs |
| **Design constraints** | `design-system.md`, `typography.md`, `color-system.md` | Hard limits agents must not break |
| **Design thinking** | `design-brain.md`, `product-logic.md` | UX order: content → hierarchy → layout → components |
| **Guardrails** | `anti-patterns.md`, `system-rule.md` | What never to do; conflict resolution |
| **Agents** | `agents/*.md` | Role prompts for delegation |
| **Observers** | `observers/*.md` | Self-improvement triggers |
| **Workflow** | `workflow.md` | Step-by-step execution |
| **Prompts** | `prompts/*.txt` | Reusable task templates |
| **Decision memory** | `docs/agents-log.md`, `docs/design-taste.md` | Why choices were made |

## Dual stack (this repo)

| Surface | Stack | Use for |
|---------|-------|---------|
| **Production** | Tilda T123, vanilla JS, GSAP, CSS | Live site deploy |
| **Prototype** | `ui-lab/` — Vite, React 19, TS, Tailwind v4, shadcn, Motion, Lucide | 21st.dev / shadcn experiments before Tilda port |

Do not mix stacks without explicit port plan. React components stay in `ui-lab/` until approved for vanilla port.

## Product state machine

Each feature exists in one state:

`idea → designed → implemented → validated → simplified → stabilized`

Never skip **simplified**. Never redesign stabilized patterns without explicit user request.

## Self-improvement loop

```
build → observe → detect issues → simplify → refactor → store decision → stabilize
```

Observers auto-trigger refinement when: clutter, inconsistent spacing, multiple primary actions, typography drift, unnecessary complexity.

## Meta rule

If rules conflict, prefer in order:

1. Clarity
2. Simplicity
3. Consistency
4. Aesthetics
5. Animation

If a rule no longer improves output → delete it (see `decision-log.md`).

## File read order (new agent)

1. `.cursor/cursor-rules.md`
2. `.cursor/project-context.md`
3. `docs/design-taste.md` + `docs/design-bundles.md` (Bundle D active)
4. `docs/NEW-CHAT.md` (task map)
5. Role file in `.cursor/agents/` if delegated
6. `docs/agents-log.md` (recent decisions)

## MCP recommendations (optional)

| MCP | Use |
|-----|-----|
| Browser / Playwright | UI verification, responsive checks |
| Context7 | Library docs (shadcn, Motion, GSAP) |
| Figma | Design → code when mockups exist |
| GitHub | Repo operations |

Project-local rules and skills only — never copy to `~/.cursor/skills/`.
