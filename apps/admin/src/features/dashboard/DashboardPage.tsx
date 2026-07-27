import { useQuery } from '@tanstack/react-query'
import { Users, Clock, CheckCircle2, PauseCircle } from 'lucide-react'
import { getAffiliateStats } from '../../lib/affiliates'
import { useAuth } from '../../lib/auth'

const CARDS = [
  { key: 'total', label: 'Total Afiliator', icon: Users, color: 'text-indigo-600' },
  { key: 'pending', label: 'Menunggu Persetujuan', icon: Clock, color: 'text-amber-600' },
  { key: 'active', label: 'Aktif', icon: CheckCircle2, color: 'text-green-600' },
  { key: 'suspended', label: 'Ditangguhkan', icon: PauseCircle, color: 'text-orange-600' },
] as const

export function DashboardPage() {
  const auth = useAuth()
  const { data, isLoading, isError } = useQuery({
    queryKey: ['affiliate-stats'],
    queryFn: getAffiliateStats,
  })

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
          Selamat datang, {auth.user?.fullName} 👋
        </h1>
        <p className="mt-1 text-sm text-gray-500">Ringkasan jaringan afiliator Anda.</p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {CARDS.map(({ key, label, icon: Icon, color }) => (
          <div
            key={key}
            className="rounded-xl border border-gray-200 bg-white p-5 shadow-sm dark:border-gray-800 dark:bg-gray-900"
          >
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-500">{label}</span>
              <Icon className={`h-5 w-5 ${color}`} />
            </div>
            <p className="mt-2 text-3xl font-semibold text-gray-900 dark:text-gray-100">
              {isLoading ? '…' : isError ? '—' : (data?.[key] ?? 0)}
            </p>
          </div>
        ))}
      </div>

      {isError && (
        <p className="text-sm text-red-600">Gagal memuat statistik. Coba muat ulang halaman.</p>
      )}
    </div>
  )
}
