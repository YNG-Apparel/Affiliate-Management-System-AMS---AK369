import {
  createRootRouteWithContext,
  createRoute,
  createRouter,
  redirect,
  Outlet,
} from '@tanstack/react-router'
import type { AuthState } from './lib/auth'
import { AppLayout } from './components/layout/AppLayout'
import { LoginPage } from './features/auth/LoginPage'
import { DashboardPage } from './features/dashboard/DashboardPage'
import { AffiliatesPage } from './features/affiliates/AffiliatesPage'

export interface RouterContext {
  auth: AuthState
}

const rootRoute = createRootRouteWithContext<RouterContext>()({
  component: () => <Outlet />,
})

const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/',
  beforeLoad: ({ context }) => {
    throw redirect({ to: context.auth.isAuthenticated ? '/dashboard' : '/login' })
  },
})

const loginRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: '/login',
  beforeLoad: ({ context }) => {
    if (context.auth.isAuthenticated) {
      throw redirect({ to: '/dashboard' })
    }
  },
  component: LoginPage,
})

// Pathless layout route: guards auth once and renders the sidebar shell for all children.
const protectedRoute = createRoute({
  getParentRoute: () => rootRoute,
  id: 'protected',
  beforeLoad: ({ context }) => {
    if (!context.auth.isAuthenticated) {
      throw redirect({ to: '/login' })
    }
  },
  component: AppLayout,
})

const dashboardRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: '/dashboard',
  component: DashboardPage,
})

const affiliatesRoute = createRoute({
  getParentRoute: () => protectedRoute,
  path: '/affiliates',
  component: AffiliatesPage,
})

const routeTree = rootRoute.addChildren([
  indexRoute,
  loginRoute,
  protectedRoute.addChildren([dashboardRoute, affiliatesRoute]),
])

// The real `auth` is injected by RouterProvider's `context` prop in main.tsx.
export const router = createRouter({
  routeTree,
  context: { auth: undefined as unknown as AuthState },
})

declare module '@tanstack/react-router' {
  interface Register {
    router: typeof router
  }
}
