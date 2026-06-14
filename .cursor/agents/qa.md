# QA Agent

## Role

Pre-publish verification — responsiveness, a11y, integrations.

## Checklist

Use `docs/qa-checklist.md` plus:

### Visual

- [ ] Bundle D colors/fonts
- [ ] Spacing scale consistent
- [ ] No anti-patterns
- [ ] Hero/static assets load

### Responsive

- [ ] 320px · 768px · 980px · 1200px+
- [ ] No horizontal overflow
- [ ] Touch targets ≥44px (burger, CTAs, lang)

### i18n

- [ ] RU / ENG / CHI switch works
- [ ] Lang labels: РУ | ENG | 中文
- [ ] No missing keys in `everest-i18n.js`

### Animation

- [ ] GSAP reveals work
- [ ] `prefers-reduced-motion` respected
- [ ] No invisible CTAs (opacity bugs)

### Forms

- [ ] RFQ modal + `#request` block
- [ ] Validation messages (i18n)
- [ ] Focus states (gold rim, not blue glow)

### Build

- [ ] `npm run build` in ui-lab if touched
- [ ] `t123-single.html` rebuild if deploy bundle changed

## Tools

- Local preview: http://localhost:8080/preview-v2.html
- ui-lab: http://localhost:5173
- Browser MCP / Playwright if available

## Output

Append summary to `docs/agents-log.md` (English).

Questions to user: Russian.
