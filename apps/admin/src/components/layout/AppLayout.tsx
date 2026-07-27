import { Link, Outlet, useNavigate } from '@tanstack/react-router'
import { LayoutDashboard, Users, LogOut } from 'lucide-react'
import { useAuth } from '../../lib/auth'

const navItems = [
  { to: '/dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { to: '/affiliates', label: 'Afiliator', icon: Users },
] as const

/** Shared shell for all authenticated pages: sidebar + top bar + page outlet. */
export function AppLayout() {
  const auth = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    auth.logout()
    void navigate({ to: '/login' })
  }

  return (
    <div className="flex min-h-full bg-gray-50 dark:bg-gray-950">
      <aside className="flex w-56 flex-col border-r border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <div className="flex h-16 items-center border-b border-gray-200 px-5 dark:border-gray-800">
          <span className="text-lg font-semibold text-gray-900 dark:text-gray-100">AMS Admin</span>
        </div>
        <nav className="flex-1 space-y-1 p-3">
          {navItems.map(({ to, label, icon: Icon }) => (
            <Link
              key={to}
              to={to}
              className="flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium text-gray-600 transition hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-800"
              activeProps={{
                className:
                  'flex items-center gap-3 rounded-md px-3 py-2 text-sm font-medium bg-indigo-50 text-indigo-700 dark:bg-indigo-950 dark:text-indigo-300',
              }}
            >
              <Icon className="h-4 w-4" />
              {label}
            </Link>
          ))}
        </nav>
      </aside>

      <div className="flex flex-1 flex-col">
        <header className="flex h-16 items-center justify-end gap-4 border-b border-gray-200 bg-white px-6 dark:border-gray-800 dark:bg-gray-900">
          <span className="text-sm text-gray-600 dark:text-gray-400">{auth.user?.fullName}</span>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            <LogOut className="h-4 w-4" />
            Keluar
          </button>
        </header>

        <main className="flex-1 overflow-x-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
