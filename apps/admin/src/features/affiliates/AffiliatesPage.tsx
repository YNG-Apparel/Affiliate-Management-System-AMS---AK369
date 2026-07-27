import { useState } from 'react'
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query'
import {
  listAffiliates,
  runAffiliateAction,
  type AffiliateAction,
  type AffiliateRow,
  type AffiliateStatus,
} from '../../lib/affiliates'
import { ApiError } from '../../lib/api'
import { StatusBadge } from '../../components/ui/status-badge'

const STATUS_FILTERS: { value: AffiliateStatus | ''; label: string }[] = [
  { value: '', label: 'Semua status' },
  { value: 'PENDING', label: 'Menunggu' },
  { value: 'ACTIVE', label: 'Aktif' },
  { value: 'SUSPENDED', label: 'Ditangguhkan' },
  { value: 'INACTIVE', label: 'Ditolak' },
]

// Which actions are offered for each status, with button styling + confirm text.
const ACTIONS: Record<AffiliateStatus, { action: AffiliateAction; label: string; className: string }[]> = {
  PENDING: [
    { action: 'approve', label: 'Setujui', className: 'bg-green-600 hover:bg-green-700' },
    { action: 'reject', label: 'Tolak', className: 'bg-red-600 hover:bg-red-700' },
  ],
  ACTIVE: [{ action: 'suspend', label: 'Tangguhkan', className: 'bg-orange-600 hover:bg-orange-700' }],
  SUSPENDED: [{ action: 'reactivate', label: 'Aktifkan', className: 'bg-green-600 hover:bg-green-700' }],
  INACTIVE: [{ action: 'reapply', label: 'Ajukan Ulang', className: 'bg-indigo-600 hover:bg-indigo-700' }],
  ARCHIVED: [],
}

export function AffiliatesPage() {
  const queryClient = useQueryClient()
  const [search, setSearch] = useState('')
  const [status, setStatus] = useState<AffiliateStatus | ''>('')
  const [page, setPage] = useState(1)

  const { data, isLoading, isError } = useQuery({
    queryKey: ['affiliates', { search, status, page }],
    queryFn: () => listAffiliates({ search, status, page, pageSize: 10 }),
  })

  const mutation = useMutation({
    mutationFn: ({ id, action }: { id: string; action: AffiliateAction }) =>
      runAffiliateAction(id, action),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: ['affiliates'] })
      void queryClient.invalidateQueries({ queryKey: ['affiliate-stats'] })
    },
    onError: (err) => {
      alert(err instanceof ApiError ? err.message : 'Aksi gagal. Coba lagi.')
    },
  })

  const handleAction = (row: AffiliateRow, action: AffiliateAction, label: string) => {
    if (!window.confirm(`${label} afiliator "${row.user.fullName}"?`)) return
    mutation.mutate({ id: row.id, action })
  }

  // Reset to page 1 whenever a filter changes.
  const onFilterChange = (fn: () => void) => {
    fn()
    setPage(1)
  }

  const rows = data?.data ?? []
  const pagination = data?.pagination

  return (
    <div className="space-y-5">
      <div>
        <h1 className="text-xl font-semibold text-gray-900 dark:text-gray-100">Manajemen Afiliator</h1>
        <p className="mt-1 text-sm text-gray-500">Setujui, tolak, dan kelola akun afiliator.</p>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3">
        <input
          type="text"
          value={search}
          onChange={(e) => onFilterChange(() => setSearch(e.target.value))}
          placeholder="Cari nama, email, atau kode…"
          className="h-10 w-72 rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
        />
        <select
          value={status}
          onChange={(e) => onFilterChange(() => setStatus(e.target.value as AffiliateStatus | ''))}
          className="h-10 rounded-md border border-gray-300 bg-white px-3 text-sm text-gray-900 focus:border-indigo-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 dark:border-gray-700 dark:bg-gray-900 dark:text-gray-100"
        >
          {STATUS_FILTERS.map((s) => (
            <option key={s.value} value={s.value}>
              {s.label}
            </option>
          ))}
        </select>
      </div>

      {/* Table */}
      <div className="overflow-x-auto rounded-xl border border-gray-200 bg-white dark:border-gray-800 dark:bg-gray-900">
        <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-800">
          <thead className="bg-gray-50 dark:bg-gray-800/50">
            <tr>
              {['Kode', 'Nama', 'Email', 'Kota', 'Tier', 'Status', 'Aksi'].map((h) => (
                <th key={h} className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-gray-500">
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
            {isLoading && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-sm text-gray-500">
                  Memuat…
                </td>
              </tr>
            )}
            {isError && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-sm text-red-600">
                  Gagal memuat data.
                </td>
              </tr>
            )}
            {!isLoading && !isError && rows.length === 0 && (
              <tr>
                <td colSpan={7} className="px-4 py-8 text-center text-sm text-gray-500">
                  Tidak ada afiliator yang cocok.
                </td>
              </tr>
            )}
            {rows.map((row) => (
              <tr key={row.id} className="hover:bg-gray-50 dark:hover:bg-gray-800/40">
                <td className="whitespace-nowrap px-4 py-3 font-mono text-xs text-gray-600 dark:text-gray-400">
                  {row.affiliateCode}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-sm font-medium text-gray-900 dark:text-gray-100">
                  {row.user.fullName}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                  {row.user.email}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                  {row.city.name}
                </td>
                <td className="whitespace-nowrap px-4 py-3 text-sm text-gray-600 dark:text-gray-400">
                  {row.tier.name}
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  <StatusBadge status={row.user.status} />
                </td>
                <td className="whitespace-nowrap px-4 py-3">
                  <div className="flex gap-2">
                    {ACTIONS[row.user.status].map(({ action, label, className }) => (
                      <button
                        key={action}
                        onClick={() => handleAction(row, action, label)}
                        disabled={mutation.isPending}
                        className={`rounded-md px-3 py-1.5 text-xs font-medium text-white transition disabled:opacity-50 ${className}`}
                      >
                        {label}
                      </button>
                    ))}
                    {ACTIONS[row.user.status].length === 0 && (
                      <span className="text-xs text-gray-400">—</span>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      {pagination && pagination.total > 0 && (
        <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
          <span>
            Menampilkan {(pagination.page - 1) * pagination.pageSize + 1}–
            {Math.min(pagination.page * pagination.pageSize, pagination.total)} dari {pagination.total}
          </span>
          <div className="flex gap-2">
            <button
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={pagination.page <= 1}
              className="rounded-md border border-gray-300 px-3 py-1.5 disabled:opacity-40 dark:border-gray-700"
            >
              Sebelumnya
            </button>
            <button
              onClick={() => setPage((p) => p + 1)}
              disabled={pagination.page >= pagination.totalPages}
              className="rounded-md border border-gray-300 px-3 py-1.5 disabled:opacity-40 dark:border-gray-700"
            >
              Berikutnya
            </button>
          </div>
        </div>
      )}
    </div>
  )
}
