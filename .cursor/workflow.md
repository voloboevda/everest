# Execution Workflow

Standard loop for any UI task in this repo.

## 1. Intake

- Read `.cursor/cursor-rules.md` + `project-context.md`
- Read `docs/design-taste.md`, recent `docs/agents-log.md`
- Clarify with user (Russian) if multiple paths — see `everest-clarify` rule

## 2. Plan (Planner)

- Scope · files · v1/v2/ui-lab · risks
- Assign agents
- Output plan before code

## 3. Design (Designer)

- User goal → content → hierarchy → layout → components
- No code

## 4. Implement (Engineer)

- Sandbox first (v2 or ui-lab)
- Follow design system
- List files changed

## 5. Observe

Run mental check against:

- `observers/ux_observer.md`
- `observers/ui_observer.md`
- `observers/complexity_observer.md`
- `observers/consistency_observer.md`

## 6. Critique (Critic)

- Pass/fail · P0/P1/P2 issues
- Fix P0 before continue

## 7. Simplify (Simplifier)

- Remove noise
- Re-verify primary action clarity

## 8. QA (QA)

- Responsive · a11n · i18n · build
- Preview URLs documented

## 9. Memory

- Append `docs/agents-log.md`
- Update `docs/design-taste.md` if stakeholder decision
- Update `docs/NEW-CHAT.md` table if new task type

## 10. Stabilize

Mark feature state: **stabilized**. Do not revisit without user request.

---

## Product state per feature

```
idea → designed → implemented → validated → simplified → stabilized
```

---

## Self-improvement loop

```
build → evaluate → simplify → refactor → store decision → stabilize
```

---

## Quick paths

| Task | Path |
|------|------|
| Tilda section edit | v2 sandbox → preview → approve → v1 merge |
| 21st.dev component | ui-lab → build → port plan → Tilda vanilla |
| Copy change | `everest-i18n.js` + `content-ru-en-chi.md` |
| Deploy | `docs/tilda-deploy-guide.md`, `build-t123-single.sh` |

---

## Verify commands

```bash
# Tilda v2
cd "/home/vda/cursor/web design/tilda" && python3 -m http.server 8080
# → http://localhost:8080/preview-v2.html

# UI Lab
cd "/home/vda/cursor/web design/ui-lab" && npm run dev
# → http://localhost:5173

# Production bundle
cd "/home/vda/cursor/web design" && ./scripts/build-t123-single.sh
```
