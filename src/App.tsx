import { useDashboardData, StatCard, SalesChart, StatBreakdown } from '@modules/dashboard'
import { Skeleton } from '@shared/components/Skeleton'
import { ErrorBoundary } from '@shared/components/ErrorBoundary'

export default function App() {
  const { overview, stats, loading, error, refresh } = useDashboardData()

  // 加载中（覆盖初始状态）
  if (loading || !overview) {
    return (
      <div className="space-y-6 max-w-[1600px] mx-auto">
        <Skeleton variant="text" lines={2} className="max-w-sm" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} variant="card" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <Skeleton variant="chart" />
          </div>
          <Skeleton variant="card" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-950/40 flex items-center justify-center">
            <span className="text-2xl">⚠️</span>
          </div>
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

  const lastUpdateLabel = overview.updatedAt
    ? `最后更新: ${new Date(overview.updatedAt).toLocaleTimeString('zh-CN')}`
    : ''

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      {/* 页面标题行 */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">运营数据概览</h2>
          <p className="text-slate-500 text-sm mt-1">实时监控核心业务指标</p>
        </div>
        {lastUpdateLabel && (
          <span className="text-xs text-slate-500">{lastUpdateLabel}</span>
        )}
      </div>

      {/* 指标卡片区 — 交错入场 */}
      <ErrorBoundary module="StatCards">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {overview.stats.map((item, i) => (
            <StatCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </ErrorBoundary>

      {/* 图表区 */}
      <ErrorBoundary module="SalesChart">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <SalesChart data={overview.salesTrend} height={380} />
          </div>

          {/* 右侧指标分解图 */}
          <StatBreakdown items={stats.length > 0 ? stats : overview.stats} />
        </div>
      </ErrorBoundary>
    </div>
  )
}
