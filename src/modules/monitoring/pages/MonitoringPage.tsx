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
      <div className="space-y-6 max-w-[1600px] mx-auto">
        <Skeleton variant="text" lines={2} className="max-w-sm" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} variant="card" />
          ))}
        </div>
        <Skeleton variant="chart" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton variant="card" />
          <Skeleton variant="card" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-red-400 text-lg font-semibold mb-2">数据加载失败</p>
          <p className="text-slate-500 text-sm mb-4">{error}</p>
          <button
            onClick={refresh}
            className="px-4 py-2 bg-slate-800 text-slate-300 rounded-lg hover:bg-slate-700 transition-colors text-sm"
          >
            重新加载
          </button>
        </div>
      </div>
    )
  }

  if (!overview) return null

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      <PageHeader
        icon="🖥️"
        title="系统监控"
        subtitle="实时服务器与服务质量监控"
        extra={
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-glow" />
            <span className="text-xs text-emerald-400 font-medium">
              运行中 · {overview.uptime}h
            </span>
          </div>
        }
      />

      {/* 实时指标卡片 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {overview.metrics.map((item, i) => (
          <RealtimeCard key={item.id} item={item} index={i} />
        ))}
      </div>

      {/* 告警列表 */}
      <AlertList alerts={overview.alerts} />

      {/* 资源负载 + 运维事件 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ResourceGauge />
        <EventTimeline />
      </div>
    </div>
  )
}
