import { useNavigate } from '@tanstack/react-router'
import { LogOut } from 'lucide-react'
import { useAuth } from '../../lib/auth'

export function DashboardPage() {
  const auth = useAuth()
  const navigate = useNavigate()

  const handleLogout = () => {
    auth.logout()
    void navigate({ to: '/login' })
  }

  return (
    <div className="min-h-full bg-gray-50 dark:bg-gray-950">
      <header className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4 dark:border-gray-800 dark:bg-gray-900">
        <h1 className="text-lg font-semibold text-gray-900 dark:text-gray-100">AMS Admin</h1>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-600 dark:text-gray-400">{auth.user?.fullName}</span>
          <button
            onClick={handleLogout}
            className="inline-flex items-center gap-1.5 rounded-md border border-gray-300 px-3 py-1.5 text-sm text-gray-700 transition hover:bg-gray-100 dark:border-gray-700 dark:text-gray-300 dark:hover:bg-gray-800"
          >
            <LogOut className="h-4 w-4" />
            Keluar
          </button>
        </div>
      </header>

      <main className="p-6">
        <div className="rounded-xl border border-gray-200 bg-white p-6 shadow-sm dark:border-gray-800 dark:bg-gray-900">
          <h2 className="text-base font-semibold text-gray-900 dark:text-gray-100">
            Selamat datang, {auth.user?.fullName} 👋
          </h2>
          <p className="mt-1 text-sm text-gray-500">
            Kamu berhasil login. Halaman dashboard dan modul-modul (afiliator, konten, payroll)
            akan dibangun di fase berikutnya.
          </p>
        </div>
      </main>
    </div>
  )
}
