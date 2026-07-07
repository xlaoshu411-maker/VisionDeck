import { create } from 'zustand'
import { logger } from '@infra/logger'
import type { MonitoringData, RealtimeMetric } from './types'
import { fetchMonitoringOverview, fetchRealtimeMetrics } from './api'

const log = logger.child('MonitoringStore')

interface MonitoringState {
  overview: MonitoringData | null
  metrics: RealtimeMetric[]
  loading: boolean
  error: string | null
  lastUpdated: number | null

  loadOverview: () => Promise<void>
  refreshAll: () => Promise<void>
  reset: () => void
}

export const useMonitoringStore = create<MonitoringState>()((set) => ({
  overview: null,
  metrics: [],
  loading: false,
  error: null,
  lastUpdated: null,

  loadOverview: async () => {
    set({ loading: true, error: null })
    log.debug('Loading monitoring overview')
    try {
      const res = await fetchMonitoringOverview()
      if (res.code === 0) {
        set({ overview: res.data, lastUpdated: Date.now() })
      } else {
        set({ error: res.message })
      }
    } catch (err) {
      set({ error: err instanceof Error ? err.message : 'Failed' })
      log.error('Failed to load monitoring', err)
    } finally {
      set({ loading: false })
    }
  },

  refreshAll: async () => {
    set({ loading: true, error: null })
    try {
      const [overviewRes, metricsRes] = await Promise.all([
        fetchMonitoringOverview(),
        fetchRealtimeMetrics(),
      ])
      if (overviewRes.code === 0) {
        set({ overview: overviewRes.data })
      }
      if (metricsRes.code === 0) {
        set({ metrics: metricsRes.data })
      }
      set({ lastUpdated: Date.now() })
    } catch (err) {
      set({ error: err instanceof Error ? err.message : 'Refresh failed' })
    } finally {
      set({ loading: false })
    }
  },

  reset: () => {
    set({ overview: null, metrics: [], loading: false, error: null, lastUpdated: null })
  },
}))
