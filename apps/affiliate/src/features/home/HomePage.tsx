import { useNavigate } from '@tanstack/react-router'
import { LogOut, BadgeCheck } from 'lucide-react'
import { useAuth } from '../../lib/auth'

export function HomePage() {
  const auth = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    auth.logout()
    void navigate({ to: '/login' })
  }

  return (
    <div className="min-h-full bg-gray-50 dark:bg-gray-950">
      <header className="flex h-14 items-center justify-between border-b border-gray-200 bg-white px-4 dark:border-gray-800 dark:bg-gray-900">
        <span className="font-semibold text-gray-900 dark:text-gray-100">Portal Afiliator</span>
        <button
          onClick={handleLogout}
          className="inline-flex items-center gap-1.5 rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
        >
          <LogOut className="h-4 w-4" />
          Keluar
        </button>
      </header>

      <main className="mx-auto max-w-lg p-4">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <div className="flex items-center gap-3">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-100 dark:bg-emerald-900/40">
              <BadgeCheck className="h-6 w-6 text-emerald-600" />
            </div>
            <div>
              <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">
                Halo, {auth.user?.fullName} 👋
              </h1>
              <p className="text-sm text-gray-500">{auth.user?.email}</p>
            </div>
          </div>

          <div className="mt-6 rounded-lg bg-emerald-50 p-4 dark:bg-emerald-950/40">
            <p className="text-sm text-emerald-800 dark:text-emerald-300">
              Akun Anda <span className="font-semibold">aktif</span>. Fitur konten, penghasilan, dan
              penarikan akan tersedia di sini pada tahap berikutnya.
            </p>
          </div>
        </div>
      </main>
    </div>
  )
}
