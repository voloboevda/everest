/**
 * Everest Trade — Tilda form webhook bridge (scaffold)
 * POST /webhook/tilda — respond within 5s for Tilda
 */
import http from "node:http";

const PORT = process.env.PORT || 3000;

function parseBody(req) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    req.on("data", (c) => chunks.push(c));
    req.on("end", () => {
      const raw = Buffer.concat(chunks).toString();
      try {
        const json = JSON.parse(raw);
        resolve(json);
      } catch {
        resolve(Object.fromEntries(new URLSearchParams(raw)));
      }
    });
    req.on("error", reject);
  });
}

function buildTaskPayload(data) {
  const name = data.Name || data.name || "";
  const company = data.Company || data.company || "";
  const country = data.Country || data.country || "";
  const email = data.Email || data.email || "";
  const message = data.Message || data.message || "";
  const tranid = data.tranid || "";

  return {
    title: `RFQ: ${company || name} — ${country}`,
    description: [
      `Name: ${name}`,
      `Company: ${company}`,
      `Country: ${country}`,
      `Email: ${email}`,
      `Message: ${message}`,
      `Tilda tranid: ${tranid}`,
    ].join("\n"),
    raw: data,
  };
}

async function notifyTelegram(text) {
  const token = process.env.TELEGRAM_BOT_TOKEN;
  const chatId = process.env.TELEGRAM_CHAT_ID;
  if (!token || !chatId) return;

  await fetch(`https://api.telegram.org/bot${token}/sendMessage`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ chat_id: chatId, text }),
  });
}

async function sendEmail(payload) {
  const emails = (process.env.NOTIFY_EMAILS || "").split(",").filter(Boolean);
  if (!emails.length || !process.env.SMTP_URL) return;
  // Optional: wire nodemailer when SMTP_URL is configured
  console.log("[email stub]", emails.join(","), payload.title);
}

async function createYouGileTask(payload) {
  const key = process.env.YOUGILE_API_KEY;
  const columnId = process.env.YOUGILE_COLUMN_ID;
  if (!key || !columnId) return;

  const base = process.env.YOUGILE_API_URL || "https://yougile.com/api-v2";
  await fetch(`${base}/tasks`, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${key}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: payload.title,
      description: payload.description,
      columnId,
    }),
  });
}

const server = http.createServer(async (req, res) => {
  if (req.method === "GET" && req.url === "/health") {
    res.writeHead(200, { "Content-Type": "application/json" });
    res.end(JSON.stringify({ ok: true }));
    return;
  }

  if (req.method === "POST" && req.url === "/webhook/tilda") {
    try {
      const data = await parseBody(req);
      const payload = buildTaskPayload(data);

      await Promise.all([
        notifyTelegram(payload.description),
        createYouGileTask(payload),
        sendEmail(payload),
      ]);

      res.writeHead(200, { "Content-Type": "text/plain" });
      res.end("ok");
    } catch (err) {
      console.error(err);
      res.writeHead(500);
      res.end("error");
    }
    return;
  }

  res.writeHead(404);
  res.end("not found");
});

server.listen(PORT, () => {
  console.log(`Everest form bridge listening on :${PORT}`);
});
