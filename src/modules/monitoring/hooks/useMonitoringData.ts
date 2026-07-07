import { useEffect, useCallback } from 'react'
import { useMonitoringStore } from '../store'

export function useMonitoringData() {
  const overview = useMonitoringStore(s => s.overview)
  const metrics = useMonitoringStore(s => s.metrics)
  const loading = useMonitoringStore(s => s.loading)
  const error = useMonitoringStore(s => s.error)
  const loadOverview = useMonitoringStore(s => s.loadOverview)
  const refreshAll = useMonitoringStore(s => s.refreshAll)

  useEffect(() => {
    loadOverview()
  }, [loadOverview])

  const refresh = useCallback(() => {
    refreshAll()
  }, [refreshAll])

  return {
    overview,
    metrics,
    loading,
    error,
    refresh,
    ready: overview !== null && !loading,
  }
}
