import { request } from '@infra/http'
import type { ApiResponse } from '@infra/adapters'
import type { MonitoringData, RealtimeMetric } from './types'

const MODULE = 'MonitoringAPI'

export async function fetchMonitoringOverview(): Promise<ApiResponse<MonitoringData>> {
  const res = await request<ApiResponse<MonitoringData>>(
    { method: 'GET', url: '/monitoring/overview' },
    MODULE,
  )
  return res.data
}

export async function fetchRealtimeMetrics(): Promise<ApiResponse<RealtimeMetric[]>> {
  const res = await request<ApiResponse<RealtimeMetric[]>>(
    { method: 'GET', url: '/monitoring/metrics' },
    MODULE,
  )
  return res.data
}
