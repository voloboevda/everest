---
name: everest-clarify
description: >-
  Ask structured clarifying questions when blocked or facing multiple technical
  options on Everest Trade. Use for JS, HTML, CSS, GSAP, webhooks, analytics,
  Tilda, WeChat, fonts, colors. Russian questions with multiple choice.
---

# Everest Clarify

## When to activate

- Multiple valid implementation paths (CDN vs self-host, GA4 vs Matomo, etc.)
- Missing credentials or IDs (YouGile, Baidu, Telegram)
- Ambiguous design direction (which bundle, which reference pattern)
- Before irreversible Tilda publish or domain DNS changes

## How to ask

1. Call `AskQuestion` with **2–4 options in Russian**.
2. Always include: **«Другое / скажу голосом»**.
3. For technical topics, add short plain-language hints in option labels.
4. If user replies with free text (dictation), treat as «Другое» and proceed.
5. Log question + answer in `docs/agents-log.md`.

## Example topics

| Topic | Example options |
|-------|-----------------|
| GSAP | CDN в Tilda Head / файл на CDN репозитория |
| WeChat | QR placeholder / готовый QR / 企业微信 link |
| Fonts | Montserrat+Roboto (ТЗ) / альтернативный bundle из design-bundles |
| Form bridge | Cloudflare Worker / VPS Node / только email пока |

Do not guess on integrations when credentials are missing — ask or stub with clear TODO.
