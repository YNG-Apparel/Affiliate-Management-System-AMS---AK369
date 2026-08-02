import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { RouterProvider } from '@tanstack/react-router'
import './index.css'
import { AuthProvider, useAuth } from './lib/auth'
import { router } from './router'

const queryClient = new QueryClient()

/** Bridges the React auth context into the router's context. */
function RouterWithAuth() {
  const auth = useAuth()
  return <RouterProvider router={router} context={{ auth }} />
}

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <RouterWithAuth />
      </AuthProvider>
    </QueryClientProvider>
  </StrictMode>,
)
