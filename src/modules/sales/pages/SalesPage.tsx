import { useSalesData, SalesFunnel, TopProducts } from '@modules/sales'
import { Skeleton } from '@shared/components/Skeleton'
import { CountUp } from '@shared/components/CountUp'
import { AnimatedCard } from '@shared/components/AnimatedCard'

export default function SalesPage() {
  const { overview, loading, error, ready } = useSalesData()

  if (loading || !ready) {
    return (
      <div className="space-y-6 max-w-[1600px] mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (
            <Skeleton key={i} variant="card" />
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <Skeleton variant="chart" />
          <Skeleton variant="chart" />
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="text-center">
          <p className="text-red-400 text-lg font-semibold mb-2">数据加载失败</p>
          <p className="text-slate-500 text-sm">{error}</p>
        </div>
      </div>
    )
  }

  if (!overview) return null

  return (
    <div className="space-y-6 max-w-[1600px] mx-auto">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-2xl font-bold text-white">销售分析</h2>
          <p className="text-slate-500 text-sm mt-1">销售收入、订单与转化漏斗</p>
        </div>
        <span className="text-xs text-slate-500">
          较上月
          <span className={`ml-1 font-semibold ${overview.growth >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
            {overview.growth >= 0 ? '+' : ''}{overview.growth}%
          </span>
        </span>
      </div>

      {/* KPI 卡片 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {[
          { label: '总收入', value: overview.totalRevenue, unit: '元', fmt: (v: number) => `¥${v.toLocaleString()}` },
          { label: '总订单', value: overview.totalOrders, unit: '单', fmt: (v: number) => v.toLocaleString() },
          { label: '客单价', value: overview.avgOrderValue, unit: '元', fmt: (v: number) => `¥${v.toFixed(2)}` },
          { label: '增长率', value: overview.growth, unit: '%', fmt: (v: number) => `${v >= 0 ? '+' : ''}${v}%` },
        ].map((item, i) => (
          <AnimatedCard key={item.label} index={i} className="rounded-xl bg-slate-900/80 border border-slate-800/60 p-5">
            <span className="text-slate-400 text-xs font-medium tracking-wide uppercase">{item.label}</span>
            <div className="mt-2 text-2xl font-bold text-white tracking-tight font-mono-tabular">
              <CountUp end={item.value} duration={1400} formatter={item.fmt} />
            </div>
            <span className="text-xs text-slate-500">{item.unit}</span>
          </AnimatedCard>
        ))}
      </div>

      {/* 漏斗 + 排行 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesFunnel data={overview.funnel} />
        <TopProducts products={overview.topProducts} />
      </div>
    </div>
  )
}
