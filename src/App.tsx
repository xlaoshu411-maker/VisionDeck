import { useDashboardData, StatCard, SalesChart } from '@modules/dashboard'
import { Loading } from '@shared/components/Loading'
import { formatPercent } from '@shared/utils'
import { ErrorBoundary } from '@shared/components/ErrorBoundary'

export default function App() {
  const { overview, stats, loading, error, refresh } = useDashboardData()

  // 加载中（覆盖初始状态和后续加载）
  if (loading || !overview) {
    return <Loading text="正在加载数据大屏..." fullScreen />
  }

  // 错误状态
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

      {/* 指标卡片区 */}
      <ErrorBoundary module="StatCards">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {overview.stats.map(item => (
            <StatCard key={item.id} item={item} />
          ))}
        </div>
      </ErrorBoundary>

      {/* 图表区 */}
      <ErrorBoundary module="SalesChart">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2">
            <SalesChart data={overview.salesTrend} height={380} />
          </div>

          {/* 右侧辅助面板 */}
          <div className="rounded-xl bg-slate-900/80 border border-slate-800/60 p-6">
            <h3 className="text-slate-300 text-base font-semibold mb-4">数据明细</h3>
            {stats.length > 0 ? (
              <ul className="space-y-3">
                {stats.map(s => (
                  <li
                    key={s.id}
                    className="flex items-center justify-between py-2 border-b border-slate-800/60 last:border-0"
                  >
                    <span className="text-slate-400 text-sm">{s.label}</span>
                    <div className="text-right">
                      <span className="text-white text-sm font-mono-tabular">
                        {s.value.toLocaleString('zh-CN')}
                      </span>
                      <span
                        className={`ml-2 text-xs ${s.trend >= 0 ? 'text-emerald-400' : 'text-red-400'}`}
                      >
                        {formatPercent(s.trend)}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-slate-500 text-sm">暂无明细数据</p>
            )}
          </div>
        </div>
      </ErrorBoundary>
    </div>
  )
}
