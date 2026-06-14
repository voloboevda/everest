---
name: everest-tilda-build
description: >-
  Build Everest Trade on Tilda — Zero Block, GSAP, T123 embeds, 8-block
  single-page structure, RU/ENG/CHI, forms and webhooks.
---

# Everest Tilda Build

## Page structure (8 blocks)

1. Hero — port/terminal imagery, CTAs
2. About
3. Sectors (5 items)
4. Expertise
5. Geography — equal regions, no dominant route
6. Logistics — FOB, CIF, CPT; container + bulk
7. Cooperation — buyers / producers
8. RFQ form

## Implementation

- Prefer Zero Block for hero, sectors grid, logistics cards, header (lang + WeChat).
- Link `assets/css/everest-overrides.css` and JS from CDN in Site Settings.
- GSAP: subtle fade-up, stagger; disable with `prefers-reduced-motion`.
- Language switcher top-right: RU | ENG | CHI.
- WeChat: `.everest-wechat-btn` opens popup with QR placeholder image.

## Forms

- Fields: name, company, country, email, message
- Enable Tilda webhook → `integrations/tilda-form-bridge`
- Email notify + Telegram + YouGile task (when keys ready)

## Gap vs current site

- Add Logistics block
- Remove duplicate form fields
- Hide partner/doc placeholders until real assets
- Document block IDs in `docs/tilda-block-map.md`

## Publish order

1. tilda.ws draft QA
2. Custom domain **everestcentr.com** last
3. Domain email (e.g. info@everestcentr.com) with DNS
