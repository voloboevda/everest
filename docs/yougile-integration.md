# YouGile integration

**Project:** [Everest: Trade & Operations](https://ru.yougile.com/team/c62d8c489480/Everest%3A-Trade-%26-Operations)

## Flow

```
Tilda RFQ form → webhook POST → tilda-form-bridge → email + Telegram + YouGile task
```

## Credentials (fill when ready)

| Key | Value |
|-----|-------|
| `YOUGILE_API_KEY` | TBD — Settings → API (company admin) |
| `YOUGILE_BOARD_ID` | TBD |
| `YOUGILE_COLUMN_ID` | TBD — e.g. «Новые заявки» |
| `TELEGRAM_BOT_TOKEN` | TBD |
| `TELEGRAM_CHAT_ID` | TBD |
| `NOTIFY_EMAILS` | TBD — include future info@everestcentr.com |

## API reference

- Docs: https://ru.yougile.com/api-v2
- Optional MCP: https://github.com/nebelov/yougile-mcp (project-local only)

## Task template

**Title:** `RFQ: {company} — {country}`

**Description:**

```
Name: {name}
Company: {company}
Country: {country}
Email: {email}
Message: {message}
Language: {lang}
Tilda tranid: {tranid}
Source: {referer}
```

## Tilda webhook

Site Settings → Forms → Webhook URL → bridge endpoint  
Enable **WEBHOOK** on form block. Response within 5 seconds.
