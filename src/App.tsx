import {
  useDashboardData,
  StatCard,
  SalesChart,
  StatBreakdown,
  RecentOrders,
} from '@modules/dashboard'
import { Skeleton } from '@shared/components/Skeleton'
import { ErrorBoundary } from '@shared/components/ErrorBoundary'
import { PageHeader } from '@shared/components/PageHeader'
import { ChinaMap } from '@shared/components/ChinaMap'

export default function App() {
  const { overview, stats, loading, error, refresh } = useDashboardData()

  if (loading || !overview) {
    return (
      <div className="space-y-3 max-w-[1600px] mx-auto">
        <Skeleton variant="text" lines={1} className="max-w-xs" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (<Skeleton key={i} variant="card" />))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          <div className="lg:col-span-2"><Skeleton variant="chart" /></div>
          <Skeleton variant="card" />
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-3">
          <div className="lg:col-span-3"><Skeleton variant="chart" /></div>
          <div className="lg:col-span-2"><Skeleton variant="card" /></div>
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

  return (
    <div className="space-y-3 max-w-[1600px] mx-auto">
      <PageHeader
        icon="📊"
        title="运营数据概览"
        subtitle="核心业务指标 · 数据驱动决策"
        extra={
          <span className="text-[10px] text-slate-500">
            {new Date(overview.updatedAt).toLocaleTimeString('zh-CN')}
          </span>
        }
      />

      <ErrorBoundary module="StatCards">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {overview.stats.map((item, i) => (
            <StatCard key={item.id} item={item} index={i} />
          ))}
        </div>
      </ErrorBoundary>

      <ErrorBoundary module="MainSection">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          <div className="lg:col-span-2">
            <SalesChart data={overview.salesTrend} height={280} />
          </div>
          <StatBreakdown items={stats.length > 0 ? stats : overview.stats} />
        </div>
      </ErrorBoundary>

      <ErrorBoundary module="BottomSection">
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-3">
          <div className="lg:col-span-3">
            <ChinaMap />
          </div>
          <div className="lg:col-span-2">
            <RecentOrders />
          </div>
        </div>
      </ErrorBoundary>
    </div>
  )
}
