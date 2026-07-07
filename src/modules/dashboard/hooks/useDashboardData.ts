/**
 * Dashboard 数据 hook
 *
 * 将 store 和组件解耦：组件只依赖 hook 的返回值，
 * 不直接消费 store 的内部结构。
 */

import { useEffect } from 'react'
import { useDashboardStore } from '../store'

export function useDashboardData() {
  const overview = useDashboardStore(s => s.overview)
  const stats = useDashboardStore(s => s.stats)
  const loading = useDashboardStore(s => s.loading)
  const error = useDashboardStore(s => s.error)
  const lastUpdated = useDashboardStore(s => s.lastUpdated)
  const loadOverview = useDashboardStore(s => s.loadOverview)
  const loadStats = useDashboardStore(s => s.loadStats)
  const refresh = useDashboardStore(s => s.refresh)

  useEffect(() => {
    loadOverview()
    loadStats()
  }, [loadOverview, loadStats])

  return {
    overview,
    stats,
    loading,
    error,
    lastUpdated,
    refresh,
    ready: overview !== null && !loading,
  }
}
