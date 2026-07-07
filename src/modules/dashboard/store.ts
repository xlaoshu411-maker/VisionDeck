/**
 * Dashboard 模块 Zustand Store
 *
 * 管理 Dashboard 的数据加载状态和缓存。
 * 各模块的 store 互不干扰，通过 zustand 的 selector 精准订阅，
 * 避免不必要的重渲染。
 */

import { create } from 'zustand'
import { logger } from '@infra/logger'
import type { DashboardData, StatItem } from './types'
import { fetchDashboardOverview, fetchDashboardStats } from './api'

const log = logger.child('DashboardStore')

interface DashboardState {
  /** 概览数据 */
  overview: DashboardData | null
  /** 指标卡片 */
  stats: StatItem[]
  /** 加载状态 */
  loading: boolean
  /** 错误信息 */
  error: string | null
  /** 最后更新时间 */
  lastUpdated: number | null

  /** Actions */
  loadOverview: () => Promise<void>
  loadStats: () => Promise<void>
  refresh: () => Promise<void>
  reset: () => void
}

export const useDashboardStore = create<DashboardState>()((set, get) => ({
  overview: null,
  stats: [],
  loading: false,
  error: null,
  lastUpdated: null,

  loadOverview: async () => {
    if (get().overview) return // 已有数据，跳过

    set({ loading: true, error: null })
    log.debug('Loading dashboard overview')

    try {
      const res = await fetchDashboardOverview()
      if (res.code === 0) {
        set({ overview: res.data, lastUpdated: Date.now() })
        log.info('Dashboard overview loaded', { statsCount: res.data.stats.length })
      } else {
        set({ error: res.message })
        log.warn('Dashboard overview API returned error', res)
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load dashboard'
      set({ error: message })
      log.error('Failed to load dashboard overview', err)
    } finally {
      set({ loading: false })
    }
  },

  loadStats: async () => {
    set({ loading: true, error: null })
    log.debug('Loading dashboard stats')

    try {
      const res = await fetchDashboardStats()
      if (res.code === 0) {
        set({ stats: res.data, lastUpdated: Date.now() })
      } else {
        set({ error: res.message })
      }
    } catch (err) {
      const message = err instanceof Error ? err.message : 'Failed to load stats'
      set({ error: message })
      log.error('Failed to load dashboard stats', err)
    } finally {
      set({ loading: false })
    }
  },

  refresh: async () => {
    set({ overview: null, stats: [] })
    await get().loadOverview()
  },

  reset: () => {
    set({ overview: null, stats: [], loading: false, error: null, lastUpdated: null })
  },
}))
