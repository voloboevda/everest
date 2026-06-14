# Everest Trade — Agent Map

Project workspace: `/home/vda/cursor/web design`  
All skills and rules live **here only** — never in global `~/.cursor/skills/`.

## Product Studio (master system)

**Start here:** `.cursor/ARCHITECTURE.md`

| File | Purpose |
|------|---------|
| `.cursor/cursor-rules.md` | Master agent rules — read every session |
| `.cursor/project-context.md` | Product facts + repo map |
| `.cursor/workflow.md` | Execution loop |
| `.cursor/design-system.md` | Spacing, grid, components |
| `.cursor/design-brain.md` | UX thinking order |
| `.cursor/anti-patterns.md` | Hard prohibitions |
| `.cursor/agents/*.md` | Role prompts |
| `.cursor/observers/*.md` | Self-improvement checks |
| `.cursor/prompts/*.txt` | Reusable task templates |

Living decisions: `docs/agents-log.md` · `docs/design-taste.md`

## Parent agent

Orchestrates work, delegates to sub-agents, uses `everest-clarify` when blocked.

Follow workflow: **Plan → Design → Engineer → Observe → Critic → Simplify → QA → Memory**

**Language:** prompts and docs in English; questions to user in Russian (Cyrillic).

## Sub-agents (Everest domain)

| Agent | When to use | Primary outputs |
|-------|-------------|-----------------|
| **planner** | Start of any task | Plan in chat (see `.cursor/agents/planner.md`) |
| **design-agent** | Tokens, bundles, UI decisions | `docs/design-tokens.md`, `docs/design-bundles.md` |
| **designer** | UX structure before code | Layout spec (see `.cursor/agents/designer.md`) |
| **tilda-build-agent** | Zero Block, GSAP, CSS, T123 | `assets/*`, `docs/tilda-embed-guide.md` |
| **engineer** | Implementation | Code in v2 sandbox or ui-lab |
| **i18n-agent** | RU / ENG / CHI copy | `docs/content-ru-en-chi.md` |
| **integrations-agent** | Forms, YouGile, Telegram | `integrations/*` |
| **critic** | Review before ship | Pass/fail report |
| **simplifier** | Remove noise | Simplified UI |
| **qa-agent** | Pre-publish checks | QA in `docs/agents-log.md` |

## Mandatory behaviors

1. **Memory:** Read `.cursor/cursor-rules.md` + `project-context.md` + recent `agents-log.md`
2. **Clarify:** Russian AskQuestion + «Другое / скажу голосом» when paths diverge
3. **Taste:** Read `docs/design-taste.md` before visual work
4. **Doc sync:** Update relevant `docs/*.md` and append `docs/agents-log.md`
5. **Positioning:** B2B partner tone; no Russia→China emphasis; RU|ENG|CHI
6. **Simplify:** Never skip simplifier pass on UI work

## Skills (`.cursor/skills/`)

- `everest-clarify` — structured questions
- `everest-design-taste` — clean premium UI
- `everest-tilda-build` — Tilda Zero Block, GSAP, forms
- `everest-china-ux` — CHI version + China analytics
- `everest-doc-living` — changelog discipline
- `ui-ux-pro-max` — design intelligence
- `impeccable` — audit/polish

## External links

- Tilda draft: https://lovingly-nominal-crow.tilda.ws/
- YouGile: https://ru.yougile.com/team/c62d8c489480/Everest%3A-Trade-%26-Operations
- Domain (final step): everestcentr.com
