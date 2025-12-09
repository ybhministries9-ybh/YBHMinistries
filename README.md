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

- Email refactor and improvements
  - Added a reusable SMTP helper `src/lib/smtpMailer.ts` to centralize SMTP configuration and sending.
  - Updated `app/api/get-in-touch/route.ts` and `app/api/hms-students/route.ts` to send non-blocking confirmation emails to users after form submission. Emails include only the filled fields and use a consistent two-column display style.
  - Replaced some direct `console.*` usage in the email helper with the project's `logger` to centralize logging.
  - Updated email templates to include logo header, footer and an italic system-generated note.

- Logging and diagnostics
  - Added a lightweight `src/lib/logger.ts` used across the project.
  - Verbose payload and email-result logs are gated behind the env var `ENABLE_VERBOSE_LOGS=true` to avoid noisy console output in normal runs.

- Merge
  - The `email` feature branch has been merged into `master` and pushed to origin.

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
  