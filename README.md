# YBHMinistries

This repository contains the YBH Ministries website.

Original design reference: https://www.figma.com/design/GRtxxwrNrnNzqvKismEoZs/YBHMinistries

## Running locally

- Install dependencies: `npm i`
- Development server: `npm run dev`
- Build for production: `npm run build`

## Tech Stack

- **Next.js 16** (App Router, Turbopack) — server and client rendering, routing, and API routes.
- **React** + **TypeScript** — UI and type safety.
- **Node.js** (runtime for server code and build).
- **PostgreSQL (Neon / Vercel Postgres)** — primary relational database.
- **Cloudflare R2** — object storage for media and public assets.
- **Nodemailer** (via `src/lib/smtpMailer.ts`) — SMTP sending for transactional emails; project also supports SendGrid/Brevo fallbacks in `src/lib/email.ts`.
- **Custom modules**:
  - `src/lib/smtpMailer.ts` — reusable SMTP helper used by APIs.
  - `src/lib/email.ts` — higher-level email helpers with SendGrid/Brevo support.
  - `src/lib/logger.ts` — centralized logging with redaction and optional external sink hooks.
  - `src/lib/schemas.ts` and `src/lib/security.ts` — runtime validation and request security helpers.

These components were recently added or improved to centralize email sending, logging, and input validation.

## Recent changes (summary)

- **Email templates and flow**: The story confirmation email template was updated to use the same stacked, logo‑header format as the `get-in-touch` confirmation (logo, greeting, stacked label/value blocks). See `app/api/stories/route.ts` for the implementation.
- **Centralized SMTP helper**: `src/lib/smtpMailer.ts` centralizes SMTP configuration and sending. Higher level helpers in `src/lib/email.ts` support provider fallbacks (SendGrid/Brevo).
- **Logging**: Replaced most direct `console.*` uses in server routes with `src/lib/logger.ts`. Verbose logs are still gated by `ENABLE_VERBOSE_LOGS=true`.

Security & request protections
- **Rate limiting**: A simple rate limiter is implemented in `src/lib/security.ts` with an in‑memory fallback and optional Upstash Redis support when `UPSTASH_REDIS_REST_URL`/`UPSTASH_REDIS_REST_TOKEN` are set. Routes apply per-endpoint limits (examples: `get-in-touch` uses 20 requests/hour, `stories` and `hms-students` use 10 requests/hour). Note: `.env.local` contains `RATE_LIMIT_MAX` / `RATE_LIMIT_WINDOW_SEC` but current code passes limits per-route; consider centralizing these values.
- **Body size & content checks**: All public POST endpoints call `requireJson()` and `checkBodySize()` to enforce `application/json` and limit payload size.
- **Honeypot**: All public forms use a honeypot check (`isHoneypotFilled`) to discard bot submissions.
- **reCAPTCHA**: `verifyRecaptcha()` will validate tokens when `RECAPTCHA_SECRET` / `RECAPTCHA_V3_SECRET` are configured. If the secret is not configured the helper currently returns `{ ok: true, skipped: true }` so routes will allow requests during development — enable/require reCAPTCHA in production by setting the secret and enforcing token presence in routes.

Database safety
- All DB writes use parameterized/tagged-template queries via the project's `sql` helper (`src/lib/db.ts`) which prevents SQL injection risks from user input.

Branch & workflow notes
- A short-lived branch `storyemail` was used to implement and test the story-email layout change and merged into `master`.

## Environment variables (important)

The project expects several environment variables (typically in `.env.local`) for SMTP and other services. Important ones for the email functionality:

- `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURE`, `SMTP_USER`, `SMTP_PASS` — SMTP credentials for nodemailer.
- `EMAIL_FROM` — optional `From:` header for outgoing messages.
- `EMAIL_BCC` / `EMAIL_CC` — optional comma-separated lists to include copies.
- `ENABLE_VERBOSE_LOGS` — set to `true` to enable additional debug/info logs for troubleshooting.

Do NOT commit `.env.local` to source control.

## Testing email locally

1. Populate `.env.local` with valid SMTP credentials (for example, a Gmail app password), plus `EMAIL_FROM` and `EMAIL_BCC` if desired.
2. Start the dev server: `npm run dev` and submit one of the forms (Get in touch, HMS student, or Share testimony) to trigger an email.

## Notes & recommendations

- For reliable deliverability in production, prefer a transactional email provider (SendGrid, Mailgun, Postmark) and verify your sending domain.
- Consider queuing emails (Redis/BullMQ) if high throughput or retry guarantees are required.

If you'd like, I can:
- Add an admin preview endpoint to view email templates without sending, or
- Sweep remaining `console.*` calls and convert them to the project's `logger` consistently.

  # YBHMinistries

  This is a code bundle for YBHMinistries. The original project is available at https://www.figma.com/design/GRtxxwrNrnNzqvKismEoZs/YBHMinistries.

  ## Running the code

  Run `npm i` to install the dependencies.

  Run `npm run dev` to start the development server.
  