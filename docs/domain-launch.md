# Domain launch — everestcentr.com

**When:** Last step, after site QA on tilda.ws.

## Checklist

- [ ] All 8 blocks complete on Tilda
- [ ] RU / ENG / CHI tested
- [ ] RFQ → email + Telegram + YouGile verified
- [ ] Analytics stubs replaced with live IDs (or documented)

## DNS (Tilda)

1. Tilda → Site Settings → Domain → add `everestcentr.com` and `www`
2. At registrar: A/CNAME per Tilda instructions
3. Wait SSL provisioning (usually automatic)

## Domain email

- Create mailbox e.g. `info@everestcentr.com` at registrar or Google Workspace
- Add to Tilda form notifications
- Update `NOTIFY_EMAILS` in bridge `.env`

## Post-launch

- Update Baidu property to production domain
- Re-run `china-review-checklist.md`
- Submit sitemap if Baidu SEO needed
