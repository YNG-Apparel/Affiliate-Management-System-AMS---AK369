# 16. Deployment & Environments

## Overview

AMS follows the standard three-environment pipeline. All deploys are git-driven (CI/CD):
pushing to `main` automatically builds and deploys — no manual file uploads, ever.

| Environment | Purpose                            | Infrastructure                          |
| ----------- | ---------------------------------- | --------------------------------------- |
| Development | Local coding and testing           | Laptop (`pnpm dev`) + Neon (dev branch)  |
| Staging     | Client review, QA, demo            | Render free tier + Neon                  |
| Production  | Live company operations (go-live)  | Render paid plan or VPS + Docker (below) |

The same build artifacts and configuration files serve every environment; only
environment variables (URLs, secrets, plan size) differ. Nothing is rebuilt or rewritten
when promoting staging to production.

---

## Infrastructure as Code

- `render.yaml` (repo root) — declarative definition of the staging services
  (API web service + admin static site). Render creates/updates services from this file
  via **New + → Blueprint**.
- `infrastructure/docker/docker-compose.yml` — local/VPS infrastructure (PostgreSQL,
  Redis) for the production VPS option.

Configuration changes must be made in these files and committed — not clicked manually —
so the setup is reproducible and reviewable.

---

## Secrets Policy

- Secrets (`DATABASE_URL`, `JWT_SECRET`) are **never committed to git**. `.env` files are
  git-ignored; `.env.example` documents the required keys with placeholders.
- In Render, secrets are entered once in the dashboard (marked `sync: false` in
  `render.yaml`) or auto-generated (`generateValue: true`).
- Staging and production must use **different** secrets and, at go-live, separate
  databases (Neon projects or branches).
- Rotate `JWT_SECRET` if a leak is suspected; all sessions are invalidated on rotation.

---

## Staging Setup (current)

1. Push `main` to GitHub.
2. Render → **New + → Blueprint** → select the repo → Render reads `render.yaml` and
   creates `ams-api` and `ams-admin`.
3. Fill the prompted secrets: `DATABASE_URL` (Neon), leave `JWT_SECRET` generated.
4. After first deploy, set:
   - `ams-admin` → `VITE_API_URL` = `https://<ams-api-url>/api`
   - `ams-api` → `CORS_ORIGINS` = `https://<ams-admin-url>`
5. Verify: `https://<ams-api-url>/api/health` returns `database: "up"`, then log in from
   the admin URL.

Known staging limitation: the free API instance sleeps after idle; first request takes
30–60 s. Acceptable for review; not for production.

---

## Production Go-Live Checklist (Fase 6)

Aligned with the proposal's OPEX (Rp 1.5–5 jt/month, client-borne):

### Infrastructure
- [ ] Choose production host:
  - **Option A — Managed (recommended to start):** Render paid plan (no sleep,
    autoscaling) + Neon paid tier. Lowest ops burden for a solo developer.
  - **Option B — VPS (proposal spec, 8 vCPU / 24 GB):** Docker Compose + Nginx +
    Let's Encrypt SSL. Cheaper at scale and required once heavy media/watermarking
    workloads arrive. The compose file already exists.
- [ ] Separate production database (new Neon project or managed Postgres) — never share
  the staging database.
- [ ] Custom domain + SSL (e.g. `app.company.com`, `api.company.com`).
- [ ] Object storage for content media (S3-compatible: Wasabi/MinIO/Cloudflare R2).
- [ ] Redis for queues/notifications (Fase 6 features).

### Security & Data
- [ ] New `JWT_SECRET`, new database credentials (never reuse staging).
- [ ] `CORS_ORIGINS` restricted to the production domains only.
- [ ] Delete/replace seeded and test accounts (`admin@ams.local`, sample affiliates);
  create real admin accounts with strong passwords.
- [ ] Enable daily database backups (Neon PITR / `pg_dump` snapshot, 30-day retention).

### Reliability & Monitoring
- [ ] Uptime monitoring on `/api/health` (UptimeRobot / Better Stack).
- [ ] Error tracking (Sentry free tier).
- [ ] Verify SLA targets from the proposal (99.5% uptime) are being measured.

### Process
- [ ] Staging remains the pre-production test bed: every change is verified on staging
  before promoting to production.
- [ ] Database migrations run via `prisma migrate deploy` (already part of the build) —
  never hand-edited SQL in production.

---

## Rollback

- Render keeps previous deploys: **Rollback** button restores the last working build.
- Database migrations are forward-only; write additive migrations (add columns/tables
  rather than destructive changes) so old code keeps working during a rollback window.
