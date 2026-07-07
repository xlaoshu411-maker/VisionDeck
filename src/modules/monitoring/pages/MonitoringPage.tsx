import {
  useMonitoringData,
  RealtimeCard,
  AlertList,
  ResourceGauge,
  EventTimeline,
} from '@modules/monitoring'
import { Skeleton } from '@shared/components/Skeleton'
import { PageHeader } from '@shared/components/PageHeader'

export default function MonitoringPage() {
  const { overview, loading, error, refresh, ready } = useMonitoringData()

  if (loading || !ready) {
    return (
      <div className="space-y-3 max-w-[1600px] mx-auto">
        <Skeleton variant="text" lines={1} className="max-w-xs" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (<Skeleton key={i} variant="card" />))}
        </div>
        <Skeleton variant="chart" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <Skeleton variant="card" /><Skeleton variant="card" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="text-center">
          <p className="text-red-400 font-semibold mb-1">数据加载失败</p>
          <p className="text-slate-500 text-xs mb-3">{error}</p>
          <button onClick={refresh} className="px-3 py-1.5 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 text-xs">
            重新加载
          </button>
        </div>
      </div>
    )
  }

  if (!overview) return null

  return (
    <div className="space-y-3 max-w-[1600px] mx-auto">
      <PageHeader
        icon="🖥️"
        title="系统监控"
        subtitle="实时服务器与服务质量监控"
        extra={
          <div className="flex items-center gap-1.5 px-2 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/30">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-glow" />
            <span className="text-[10px] text-emerald-400 font-medium">运行中 · {overview.uptime}h</span>
          </div>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {overview.metrics.map((item, i) => (
          <RealtimeCard key={item.id} item={item} index={i} />
        ))}
      </div>

      <AlertList alerts={overview.alerts} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <ResourceGauge />
        <EventTimeline />
      </div>
    </div>
  )
}
