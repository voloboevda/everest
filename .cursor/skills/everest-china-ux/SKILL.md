---
name: everest-china-ux
description: >-
  China-facing UX and analytics for Everest Trade CHI version — Baidu Tongji,
  WeChat, native 中文 tone, review checklist for partners.
---

# Everest China UX

## CHI version goals

- Native B2B partner presentation, not literal RU translation
- Noto Sans SC or equivalent; test line height for 中文
- WeChat contact prominent on CHI (and optionally global header)

## Analytics (dual stack)

- **Global:** `assets/js/analytics-global.js` — stub until Matomo/GA4 ID
- **China:** `assets/js/analytics-china.js` — Baidu Tongji stub; load **only on zh/CHI**
- GA4 unreliable from mainland China — do not rely on it for CN reporting

## Review

Before showing Chinese partners, run `docs/china-review-checklist.md`.

## Performance in China

- Avoid blocked Google Fonts if possible; provide system/CN CDN fallback in CSS
- Keep page weight low; compressed WebP images
