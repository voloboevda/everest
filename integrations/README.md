# Integrations

## tilda-form-bridge

Receives Tilda form webhook POST, forwards to:

- Email (Tilda native + optional extra)
- Telegram bot
- YouGile task (API v2)

See `docs/yougile-integration.md` for credentials.

Copy `.env.example` to `.env` and deploy to VPS or Cloudflare Worker.
