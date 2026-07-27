import type { AffiliateStatus } from '../../lib/affiliates'

const STYLES: Record<AffiliateStatus, { label: string; className: string }> = {
  PENDING: { label: 'Menunggu', className: 'bg-amber-100 text-amber-800 dark:bg-amber-900/40 dark:text-amber-300' },
  ACTIVE: { label: 'Aktif', className: 'bg-green-100 text-green-800 dark:bg-green-900/40 dark:text-green-300' },
  SUSPENDED: { label: 'Ditangguhkan', className: 'bg-orange-100 text-orange-800 dark:bg-orange-900/40 dark:text-orange-300' },
  INACTIVE: { label: 'Ditolak', className: 'bg-red-100 text-red-800 dark:bg-red-900/40 dark:text-red-300' },
  ARCHIVED: { label: 'Diarsip', className: 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300' },
}

export function StatusBadge({ status }: { status: AffiliateStatus }) {
  const s = STYLES[status] ?? STYLES.ARCHIVED
  return (
    <span className={`inline-flex rounded-full px-2.5 py-0.5 text-xs font-medium ${s.className}`}>
      {s.label}
    </span>
  )
}
