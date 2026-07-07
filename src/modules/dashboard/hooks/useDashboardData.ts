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
  const refresh = useDashboardStore(s => s.refresh)

  useEffect(() => {
    loadOverview()
  }, [loadOverview])

  return {
    /** 概览数据（含 stats + salesTrend） */
    overview,
    /** 纯指标卡片（从 stats 接口获取） */
    stats,
    /** 是否加载中 */
    loading,
    /** 错误信息 */
    error,
    /** 最后更新时间戳 */
    lastUpdated,
    /** 刷新数据 */
    refresh,
    /** 数据是否就绪 */
    ready: overview !== null && !loading,
  }
}
