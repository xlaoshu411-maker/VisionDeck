import { create } from 'zustand'
import { logger } from '@infra/logger'
import type { SalesOverview } from './types'
import { fetchSalesOverview } from './api'

const log = logger.child('SalesStore')

interface SalesState {
  overview: SalesOverview | null
  loading: boolean
  error: string | null

  loadOverview: () => Promise<void>
  reset: () => void
}

export const useSalesStore = create<SalesState>()((set, get) => ({
  overview: null,
  loading: false,
  error: null,

  loadOverview: async () => {
    if (get().overview) return
    set({ loading: true, error: null })
    log.debug('Loading sales overview')
    try {
      const res = await fetchSalesOverview()
      if (res.code === 0) {
        set({ overview: res.data })
      } else {
        set({ error: res.message })
      }
    } catch (err) {
      set({ error: err instanceof Error ? err.message : 'Failed' })
      log.error('Failed to load sales', err)
    } finally {
      set({ loading: false })
    }
  },

  reset: () => set({ overview: null, loading: false, error: null }),
}))
