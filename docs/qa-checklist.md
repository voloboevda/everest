# QA checklist — pre-publish

## Structure (customer brief)

- [ ] Hero with dual CTA
- [ ] About
- [ ] 5–6 sectors
- [ ] Expertise (5 items)
- [ ] **Logistics** FOB / CIF / CPT + cargo types
- [ ] Geography — 5 regions equal weight
- [ ] Cooperation buyers / producers
- [ ] RFQ form — name, company, country, email, message

## Languages

- [ ] Switcher shows **RU | ENG | CHI**
- [ ] CHI content is 中文 (not English)
- [ ] No duplicate visible form (`rec2091691681` hidden)

## Design taste

- [ ] Light background, no dark mud
- [ ] No particle canvas / visual clutter
- [ ] Gold accent used sparingly
- [ ] Mobile 320 / 480 / 640 / 980 / 1200 OK

## Integrations

- [ ] RFQ → Tilda email notify
- [ ] RFQ → webhook bridge (when URL set)
- [ ] Telegram + YouGile (when keys set)
- [ ] WeChat button opens QR placeholder
- [ ] Analytics stubs load (console debug OK)

## China

- [ ] Run `docs/china-review-checklist.md`
- [ ] Baidu snippet on CHI only (when ID ready)

## Launch

- [ ] tilda.ws QA pass
- [ ] Domain everestcentr.com — **last step** per `docs/domain-launch.md`
