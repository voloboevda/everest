# China analytics setup

## Why dual stack

Google Analytics is unreliable from mainland China (blocked scripts, data loss). Use **Baidu Tongji (百度统计)** for CHI audience reporting.

## Global (stub)

File: `assets/js/analytics-global.js`  
Set `window.EVEREST_ANALYTICS.globalId` when Matomo or GA4 is chosen.

## Baidu Tongji

1. Register at https://tongji.baidu.com/ (often requires CN mobile)
2. Add site property for `everestcentr.com` (after domain live) or tilda.ws for testing
3. Copy tracking ID into `assets/js/analytics-china.js`
4. Embed via T123 on **Chinese language version only**

## Load strategy on Tilda

- All languages: `analytics-global.js`
- CHI/zh only: `analytics-china.js`

## Events to track

- `rfq_submit`
- `cta_hero_click`
- `lang_switch`
- `wechat_open`
