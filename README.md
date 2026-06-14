# Everest Trade — Web Design (Tilda B2B)

Single-page corporate B2B landing for international commodity trading.

- **Live draft:** https://lovingly-nominal-crow.tilda.ws/
- **Target domain:** `everestcentr.com` (connect at final launch step)
- **Languages:** RU · ENG · CHI (中文 content)

## Repository layout

```
tilda/           Deploy-ready HTML/CSS/JS for Tilda T123 blocks
  preview.html      Local preview (v2 production)
  t123-single.html  One-paste deploy for Tilda T123
assets/          Shared CSS/JS (GSAP, analytics, WeChat)
docs/            Brief, deploy guide, QA, integrations
integrations/    Form bridge (Tilda → email, Telegram, YouGile)
ui-lab/          React/shadcn prototype sandbox
.cursor/         Product Studio: rules, agents, observers, prompts
  ARCHITECTURE.md   How the system fits together
  cursor-rules.md   Master agent behavior
  agents/           Role prompts (planner, designer, engineer, …)
  prompts/          Reusable task templates
```

## Deploy to Tilda

Assets live on **GitHub** (jsDelivr CDN). Tilda gets **3 HTML paste blocks** only.

1. Push repo to GitHub  
2. `./scripts/build-tilda-paste.sh YOUR_GITHUB_USER`  
3. Follow **`docs/tilda-deploy-guide.md`** — paste blocks 1, 2, 3  
4. Domain `everestcentr.com` — last step (`docs/domain-launch.md`)

## Quick start for agents

1. **System:** `.cursor/ARCHITECTURE.md` → `cursor-rules.md` → `project-context.md`
2. **New chat?** → `docs/NEW-CHAT.md` (шаблон + узкие задачи)
3. Read `AGENTS.md` for sub-agent roles and workflow
4. Read `docs/customer-brief-landing.md` for page structure
5. Read `docs/design-taste.md` for stakeholder UI preferences
6. Log decisions in `docs/agents-log.md`

## Tilda custom code

Host `assets/` on CDN or GitHub Pages, then link from Site Settings → More → Head/Footer.
