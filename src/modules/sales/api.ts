import { request } from '@infra/http'
import type { ApiResponse } from '@infra/adapters'
import type { SalesOverview } from './types'

const MODULE = 'SalesAPI'

export async function fetchSalesOverview(): Promise<ApiResponse<SalesOverview>> {
  const res = await request<ApiResponse<SalesOverview>>(
    { method: 'GET', url: '/sales/overview' },
    MODULE,
  )
  return res.data
}
