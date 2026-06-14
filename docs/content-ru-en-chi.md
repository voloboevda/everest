# Content — RU / ENG / CHI

Source of truth for copy. CHI requires partner review before external show.

## Hero

### Eyebrow (all langs)

`[01] Everest Trade`

### Display headline — variant A (default)

Eyebrow: one muted line — `[01] Everest Trade` (low contrast). Accent words: `<span class="hero-accent">` in serif + logo blue.

| | RU (Onest + PT Serif) | ENG (Switzer + Instrument Serif) | CHI (Noto Sans SC + Noto Serif SC) |
|---|-----|-----|-------------|
| **Headline** | Whipped lines (2–3 words): Мы выстраиваем / *международную* торговлю / для *промышленных* / партнёров | We structure / *international* trade / for *industrial* / partners. | 我们构建*国际*贸易 / 为*工业* / 合作伙伴 |
| **Subtitle** | Промышленные, энергетические и сельскохозяйственные ресурсы — структурированные поставки для глобальных партнёров. | Industrial, energy, and agricultural commodities — structured supply for global partners. | 工业、能源及农业资源 — 为全球合作伙伴提供结构化贸易与供应。 |

**Source of truth:** `tilda/js/everest-i18n.js` (`hero_title_a` …). Reload always reads from there, not localStorage.

### Variant B — global reach

| | RU | ENG | CHI (draft) |
|---|-----|-----|-------------|
| **Headline** | Мы поставляем *ресурсы* на / *глобальные* рынки | We move *commodities* across / *global* markets. | 我们将*大宗商品*输送至 / *全球*市场 |
| **Subtitle** | Металлы, энергия, агропродукция и минеральное сырьё — сквозные торговые операции по всему миру. | Metals, energy, agriculture, and minerals — end-to-end trading operations worldwide. | 金属、能源、农产品及矿物原料 — 覆盖全球的一体化贸易运营。 |

### Variant C — execution / trust

| | RU | ENG | CHI (draft) |
|---|-----|-----|-------------|
| **Headline** | *Надёжное* исполнение сделок / для *серьёзных* партнёров | *Reliable* trade execution / for *serious* partners. | *可靠*贸易执行 / 服务*专业*合作伙伴 |
| **Subtitle** | Структурирование контрактов, логистика и сопровождение — от запроса до поставки. | Contract structuring, logistics, and execution — from inquiry to delivery. | 合同结构设计、物流与全程跟进 — 从询盘到交付。 |

### Plain fallback (no mixed typography)

| RU | ENG | CHI |
|----|-----|-----|
| Everest Trade | Everest Trade | Everest Trade |
| Международная торговая компания… | International trading company… | 专注于工业、能源及农业资源市场的国际贸易公司。 |

**Preview switch (browser console):** `everestSetHeroVariant('a'|'b'|'c')` · reset: `everestClearHeroVariant()`  
Keys: `tilda/js/everest-i18n.js` · script: `tilda/js/everest-hero-variants.js`

### CTA

| RU | ENG | CHI (draft) |
|----|-----|-------------|
| Отправить запрос | Send inquiry | 发送询盘 |
| Связаться с нами | Contact us | 联系我们 |

## About (short)

| RU | ENG | CHI (draft) |
|----|-----|-------------|
| Everest Trade — международная торговая компания, работающая на глобальных рынках сырьевых ресурсов. | Everest Trade operates in global commodity markets, partnering with producers and industrial buyers across Asia, Europe, and the CIS. | Everest Trade 致力于全球大宗商品市场，与亚洲、欧洲及独联体地区的生产商与工业客户建立长期合作。 |

## Sectors

- Металлы и металлургическое сырьё / Metals & metallurgical raw materials / 金属及冶金原料
- Энергетические ресурсы / Energy resources / 能源
- Сельскохозяйственная продукция / Agricultural products / 农产品
- Минеральное и химическое сырьё / Mineral & chemical raw materials / 矿物及化工原料
- Международная торговля и агентские услуги / International trade & agency services / 国际贸易与代理服务

## Logistics (new block)

| RU | ENG | CHI (draft) |
|----|-----|-------------|
| Логистика | Logistics | 物流 |
| FOB · CIF · CPT | FOB · CIF · CPT | FOB · CIF · CPT |
| Контейнерные и навалочные перевозки | Container and bulk shipments | 集装箱及散货运输 |

## Form labels (Wibify RFQ — modal + block)

| Field | RU | ENG | CHI |
|-------|-----|-----|-----|
| first name | Имя | First name | 名 |
| last name | Фамилия | Last name | 姓 |
| email | Email | Email | 电子邮箱 |
| phone | Телефон | Phone number | 电话号码 |
| company | Компания (optional) | Company name (optional) | 公司名称（选填） |
| website | Сайт компании (optional) | Current website (optional) | 公司网站（选填） |
| message | Сообщение (optional) | Message (optional) | 留言（选填） |

**Modal** (Hero / menu CTA): «Начать запрос.» / «Start an inquiry.»  
**Block** `#request`: left «Обсудим сделку.» + contacts; right «Краткий брифинг.» + inline form.

> CHI marked draft — run `china-review-checklist.md` before partner demo.
