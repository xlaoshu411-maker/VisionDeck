import {
  useDashboardData,
  StatCard,
  SalesChart,
  StatBreakdown,
  TrafficSource,
  RecentOrders,
} from '@modules/dashboard'
import { Skeleton } from '@shared/components/Skeleton'
import { ErrorBoundary } from '@shared/components/ErrorBoundary'
import { PageHeader } from '@shared/components/PageHeader'

export default function App() {
  const { overview, stats, loading, error, refresh } = useDashboardData()

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
          <div className="lg:col-span-2"><Skeleton variant="chart" /></div>
          <Skeleton variant="card" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton variant="card" />
          <Skeleton variant="chart" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-red-950/40 flex items-center justify-center text-2xl">
            ⚠️
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

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      <PageHeader
        icon="📊"
        title="运营数据概览"
        subtitle="实时监控核心业务指标 · 数据驱动决策"
        extra={
          <span className="text-xs text-slate-500">
            更新于 {new Date(overview.updatedAt).toLocaleTimeString('zh-CN')}
          </span>
        }
      />

      {/* 指标卡片 */}
      <ErrorBoundary module="StatCards">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {overview.stats.map((item, i) => (
            <StatCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </ErrorBoundary>

      {/* 图表 + 分解 */}
      <ErrorBoundary module="MainSection">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <SalesChart data={overview.salesTrend} height={380} />
          </div>
          <StatBreakdown items={stats.length > 0 ? stats : overview.stats} />
        </div>
      </ErrorBoundary>

      {/* 流量来源 + 最近订单 */}
      <ErrorBoundary module="SecondarySection">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <TrafficSource />
          <RecentOrders />
        </div>
      </ErrorBoundary>
    </div>
  )
}
