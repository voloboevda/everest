# Consistency Observer

Detects product drift across sessions and files.

## Detect

- v1 vs v2 visual mismatch without plan
- ui-lab prototype diverging from Bundle D
- New pattern introduced without agents-log entry
- Agent ignoring `docs/design-taste.md` decisions

## Memory sources

- `docs/agents-log.md`
- `docs/design-taste.md` § Decisions
- `.cursor/project-context.md`

## Action

If inconsistency detected → normalize to last approved decision. Do not invent compromise styles.

If user explicitly requested change → log new decision first, then implement.
