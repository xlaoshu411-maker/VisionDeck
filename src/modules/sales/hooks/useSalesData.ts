import { useEffect } from 'react'
import { useSalesStore } from '../store'

export function useSalesData() {
  const overview = useSalesStore(s => s.overview)
  const loading = useSalesStore(s => s.loading)
  const error = useSalesStore(s => s.error)
  const loadOverview = useSalesStore(s => s.loadOverview)

  useEffect(() => {
    loadOverview()
  }, [loadOverview])

  return {
    overview,
    loading,
    error,
    ready: overview !== null && !loading,
  }
}
