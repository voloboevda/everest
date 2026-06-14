---
name: everest-doc-living
description: >-
  Maintain living documentation for Everest Trade — update docs and agents-log,
  notify user in Russian after significant changes.
---

# Everest Living Docs

## Files to keep current

| File | Purpose |
|------|---------|
| `docs/agents-log.md` | Dated decision log |
| `docs/design-taste.md` | Stakeholder UI preferences |
| `docs/design-bundles.md` | Font/color bundle options |
| `docs/tilda-block-map.md` | Tilda block IDs |
| `docs/content-ru-en-chi.md` | Trilingual copy |
| `docs/yougile-integration.md` | YouGile mapping |

## On each significant change

1. Edit the relevant doc(s).
2. Append to `agents-log.md`:

```markdown
## YYYY-MM-DD — Short title
- **Decision:** ...
- **Files:** ...
- **User input:** (if any)
```

3. Tell user in Russian what changed and where to look.

Do not spam log for trivial typo fixes.
