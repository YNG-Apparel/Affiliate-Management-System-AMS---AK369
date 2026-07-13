# Affiliate Management System (AMS)

Enterprise monorepo for the AMS platform, managed with pnpm workspaces and Turborepo.

## Structure

```
apps/
  api/         NestJS backend
  admin/       React + Vite admin dashboard
  affiliate/   React + Vite PWA affiliate portal
packages/
  ui/              shared React component library
  types/           shared TypeScript types
  utils/           shared utilities
  eslint-config/   shared ESLint flat configs (base, react, nestjs)
  tsconfig/        shared TypeScript configs (base, library)
docs/
infrastructure/
scripts/
```

## Requirements

- Node.js >= 20
- pnpm 9 (`corepack enable` or `npm install -g pnpm`)

## Getting started

```bash
pnpm install
pnpm dev        # run all apps in dev mode
pnpm build      # build all apps and packages
pnpm lint       # lint all apps and packages
pnpm typecheck  # type-check all apps and packages
pnpm format     # format the repo with Prettier
```

See [docs/](docs/) for product and architecture documentation.
