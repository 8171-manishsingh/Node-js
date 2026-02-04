# Admin Panel Backend (Improved)

Quick start:

1. Copy `.env.example` to `.env` and fill environment variables.
2. Install dependencies:

```bash
cd Backend
npm install
```

3. Run in development:

```bash
npm run dev
```

Notes:
- Endpoints are under `/api/auth` and `/api/admin`.
- Uses JWT in an `auth_token` cookie for session.
- OTPs are stored temporarily in the DB and mailed using nodemailer.
- Add production adjustments (secure cookies, rate limits, logging sinks).
