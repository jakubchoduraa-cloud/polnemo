# NEMOVITOSTI V POLSKU (MVP)

SEO-first directory for Trojmiasto (Gdansk/Gdynia/Sopot) for Czech buyers/investors.

## Stack
- Next.js App Router + TypeScript
- Tailwind (+ shadcn-style UI primitives)
- Postgres + Prisma
- NextAuth (Google + Email fallback)
- Stripe Checkout + Webhook
- Docker + docker-compose

## Run In 10 Minutes
1. Copy env:
```bash
cp .env.example .env
```
2. Start Postgres:
```bash
docker compose up -d db
```
3. Install + generate prisma:
```bash
npm install
npm run prisma:generate
```
4. Migrate + seed:
```bash
npx prisma migrate dev --name init
npm run prisma:seed
```
5. Start app:
```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) -> redirects to `/cs`.

## Docker Full Start
```bash
docker compose up --build
```

## Deploy To Hetzner
Production-ready files are included:
- `docker-compose.prod.yml`
- `.env.production.example`
- `deploy/hetzner/Caddyfile`
- `deploy/hetzner/README.md`

Quick start on server:
```bash
cp .env.production.example .env.production
docker compose -f docker-compose.prod.yml up -d --build
docker compose -f docker-compose.prod.yml exec app npm run prisma:seed
```

## Environment Variables
See `.env.example`.

Required for auth:
- `NEXTAUTH_SECRET`
- `NEXTAUTH_URL`
- `GOOGLE_CLIENT_ID`, `GOOGLE_CLIENT_SECRET` (optional if email auth used)

Stripe:
- `STRIPE_SECRET_KEY`
- `STRIPE_PRICE_ID_MONTHLY`
- `STRIPE_WEBHOOK_SECRET`

Admin allowlist:
- `ADMIN_ALLOWLIST_EMAILS=admin@example.com,founder@example.com`

## Stripe Setup
1. Create product with recurring monthly price `150 CZK`.
2. Set `STRIPE_PRICE_ID_MONTHLY`.
3. Run local webhook forwarding:
```bash
stripe listen --forward-to localhost:3000/api/stripe/webhook
```
4. Copy signing secret to `STRIPE_WEBHOOK_SECRET`.

## Seed Data
Seed script creates:
- 30 published properties
- 10 projects
- 3 locality stats ranges
- 5 developers
- 10 Czech blog posts
- 1 FX daily row

## Important Product Rules Implemented
- Only for-sale property categories: condo/apartment/house/villa.
- No exact property prices shown anywhere.
- Public price ranges only:
  - locality ranges
  - project-level ranges for developments
- Property details show yield/locality/m2/travel time/POIs/risks.

## Tests
Run:
```bash
npm test
```
Covers:
- directory loading
- property detail loading
- lead endpoint
- stripe webhook handler

## MVP Stubs / TODO
- Scraping pipeline is interface-only (manual curation live now)
- CSV import parser is stubbed
- Email provider uses console adapter (swap with Resend/Postmark)
- Map on directory page is placeholder panel
