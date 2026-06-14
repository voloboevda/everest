# Decision Log

Design and product decisions are stored in **`docs/agents-log.md`** (chronological) and **`docs/design-taste.md`** § Decisions (stakeholder approvals).

This file is a pointer — do not duplicate logs here.

## When to log

After every agent session:

- What changed
- Why (user input or design rationale)
- Files touched
- Preview/build verify steps

## Evolution format (optional append to agents-log)

```
## YYYY-MM-DD — Title

Issue: [problem observed]
Decision: [what we chose]
Result: [outcome / metric if known]
Files: [list]
```

## Rule

If a decision is logged → future agents must preserve it unless user explicitly overrides.

See also `.cursor/observers/consistency_observer.md`
