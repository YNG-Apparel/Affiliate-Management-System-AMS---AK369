# AMS API

NestJS + Prisma backend for the Affiliate Management System.

## Prerequisites

- Node.js 20+
- pnpm 9+
- A PostgreSQL database (Neon cloud free tier is recommended for development)

## Setup

1. Install dependencies (from the repo root):

   ```bash
   pnpm install
   ```

2. Configure environment:

   ```bash
   cp .env.example .env
   ```

   Then edit `.env` and set `DATABASE_URL` to your PostgreSQL connection string.

   - **Neon (recommended):** create a project at https://neon.tech, copy the connection
     string into `DATABASE_URL`.
   - **Docker (optional):** run `docker compose -f ../../infrastructure/docker/docker-compose.yml up -d`
     and use `postgresql://ams:ams@localhost:5432/ams?schema=public`.

3. Generate the Prisma client and run migrations:

   ```bash
   pnpm db:generate
   pnpm db:migrate
   ```

4. Start the API in watch mode:

   ```bash
   pnpm dev
   ```

## Verify

- API base: http://localhost:3000/api
- Health check: http://localhost:3000/api/health
- Swagger docs: http://localhost:3000/docs

The health endpoint returns `{ "status": "ok", "database": "up", ... }` when the database
connection is working.

## Useful scripts

| Script | Purpose |
| ------ | ------- |
| `pnpm dev` | Start the API in watch mode |
| `pnpm db:generate` | Regenerate the Prisma client after schema changes |
| `pnpm db:migrate` | Create and apply a new migration (dev) |
| `pnpm db:studio` | Open Prisma Studio to browse data |
| `pnpm typecheck` | Type-check without emitting |
| `pnpm test` | Run unit tests |
