import { apiFetch } from './api'

export type AffiliateStatus = 'PENDING' | 'ACTIVE' | 'SUSPENDED' | 'INACTIVE' | 'ARCHIVED'

export interface AffiliateRow {
  id: string
  affiliateCode: string
  affiliateType: string
  createdAt: string
  user: {
    id: string
    fullName: string
    email: string
    status: AffiliateStatus
    createdAt: string
  }
  tier: { id: number; name: string; multiplier: string }
  city: { id: string; name: string }
}

export interface Paginated<T> {
  data: T[]
  pagination: { page: number; pageSize: number; total: number; totalPages: number }
}

export interface AffiliateStats {
  total: number
  pending: number
  active: number
  suspended: number
  inactive: number
}

export interface ListParams {
  search?: string
  status?: AffiliateStatus | ''
  page?: number
  pageSize?: number
}

/** The status-changing actions the API exposes (must match the backend routes). */
export type AffiliateAction = 'approve' | 'reject' | 'suspend' | 'reactivate' | 'reapply'

export function getAffiliateStats(): Promise<AffiliateStats> {
  return apiFetch<AffiliateStats>('/affiliates/stats')
}

export function listAffiliates(params: ListParams): Promise<Paginated<AffiliateRow>> {
  const query = new URLSearchParams()
  if (params.search) query.set('search', params.search)
  if (params.status) query.set('status', params.status)
  query.set('page', String(params.page ?? 1))
  query.set('pageSize', String(params.pageSize ?? 10))
  return apiFetch<Paginated<AffiliateRow>>(`/affiliates?${query.toString()}`)
}

export function runAffiliateAction(id: string, action: AffiliateAction): Promise<AffiliateRow> {
  return apiFetch<AffiliateRow>(`/affiliates/${id}/${action}`, { method: 'PATCH' })
}
