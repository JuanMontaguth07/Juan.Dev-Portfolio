import { NextResponse } from "next/server";
import { Resend } from "resend";
import { checkRateLimit } from "@/lib/rate-limit";
import { siteConfig } from "@/lib/site-config";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const MAX_LENGTH = { name: 100, email: 200, subject: 150, message: 5000 };
const RATE_LIMIT = { limit: 3, windowMs: 10 * 60 * 1000 };

type ContactPayload = {
  name?: unknown;
  email?: unknown;
  subject?: unknown;
  message?: unknown;
  /** Honeypot: hidden in the UI, so only bots fill it in. */
  website?: unknown;
};

function clientIp(request: Request) {
  return (
    request.headers.get("x-forwarded-for")?.split(",")[0].trim() ||
    request.headers.get("x-real-ip") ||
    "unknown"
  );
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

export async function POST(request: Request) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error("RESEND_API_KEY is not set");
    return NextResponse.json(
      { error: "Email sending isn't configured yet." },
      { status: 500 },
    );
  }

  const rate = checkRateLimit(clientIp(request), RATE_LIMIT);
  if (!rate.allowed) {
    return NextResponse.json(
      { error: "Too many messages. Try again later." },
      { status: 429, headers: { "Retry-After": String(rate.retryAfterSeconds) } },
    );
  }

  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  // A filled honeypot means a bot: answer as if it worked so it moves on,
  // but never send anything.
  if (typeof body.website === "string" && body.website.trim() !== "") {
    return NextResponse.json({ ok: true });
  }

  const name = typeof body.name === "string" ? body.name.trim() : "";
  const email = typeof body.email === "string" ? body.email.trim() : "";
  // Newlines in the subject would let a sender inject extra mail headers.
  const subject =
    typeof body.subject === "string"
      ? body.subject.replace(/[\r\n]+/g, " ").trim()
      : "";
  const message = typeof body.message === "string" ? body.message.trim() : "";

  if (
    !name ||
    !email ||
    !subject ||
    !message ||
    !EMAIL_PATTERN.test(email) ||
    name.length > MAX_LENGTH.name ||
    email.length > MAX_LENGTH.email ||
    subject.length > MAX_LENGTH.subject ||
    message.length > MAX_LENGTH.message
  ) {
    return NextResponse.json(
      { error: "Missing or invalid fields." },
      { status: 400 },
    );
  }

  try {
    // Env values pasted into dashboards often pick up stray whitespace.
    const resend = new Resend(apiKey.trim().split(/\s+/)[0]);
    const { error } = await resend.emails.send({
      from: "Portafolio <onboarding@resend.dev>",
      to: siteConfig.email,
      replyTo: email,
      subject: `[Portafolio] ${subject}`,
      text: `De: ${name} <${email}>\n\n${message}`,
      html: `
        <p><strong>De:</strong> ${escapeHtml(name)} (${escapeHtml(email)})</p>
        <p><strong>Asunto:</strong> ${escapeHtml(subject)}</p>
        <p>${escapeHtml(message).replace(/\n/g, "<br />")}</p>
      `,
    });

    if (error) {
      console.error("Resend error", error);
      return NextResponse.json(
        { error: "Failed to send the message.", detail: error.message },
        { status: 502 },
      );
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    console.error("Contact form send failed", err);
    // Never echo err.message back: it can contain the API key itself.
    return NextResponse.json(
      { error: "Failed to send the message." },
      { status: 500 },
    );
  }
}
