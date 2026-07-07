import { useMonitoringData, RealtimeCard, AlertList } from '@modules/monitoring'
import { Skeleton } from '@shared/components/Skeleton'

export default function MonitoringPage() {
  const { overview, loading, error, refresh, ready } = useMonitoringData()

  if (loading || !ready) {
    return (
      <div className="space-y-6 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} variant="card" />
          ))}
        </div>
        <Skeleton variant="chart" />
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
      {/* 标题行 */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">系统监控</h2>
          <p className="text-slate-500 text-sm mt-1">实时服务器与服务质量监控</p>
        </div>
        <div className="flex items-center gap-3">
          {/* 在线状态 */}
          <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/30">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse-glow" />
            <span className="text-xs text-emerald-400 font-medium">
              运行中 · {overview.uptime}h
            </span>
          </div>
        </div>
      </div>

      {/* 实时指标 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {overview.metrics.map((item, i) => (
          <RealtimeCard key={item.id} item={item} index={i} />
        ))}
      </div>

      {/* 告警列表 */}
      <AlertList alerts={overview.alerts} />
    </div>
  )
}
