import {
  useSalesData,
  SalesFunnel,
  TopProducts,
  RevenueTrend,
} from '@modules/sales'
import { Skeleton } from '@shared/components/Skeleton'
import { PageHeader } from '@shared/components/PageHeader'
import { CountUp } from '@shared/components/CountUp'
import { AnimatedCard } from '@shared/components/AnimatedCard'

export default function SalesPage() {
  const { overview, loading, error, ready } = useSalesData()

  if (loading || !ready) {
    return (
      <div className="space-y-3 max-w-[1600px] mx-auto">
        <Skeleton variant="text" lines={1} className="max-w-xs" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {Array.from({ length: 4 }).map((_, i) => (<Skeleton key={i} variant="card" />))}
        </div>
        <Skeleton variant="chart" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
          <Skeleton variant="chart" /><Skeleton variant="card" />
        </div>
        <Skeleton variant="chart" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-[300px]">
        <div className="text-center">
          <p className="text-red-400 font-semibold mb-1">数据加载失败</p>
          <p className="text-slate-500 text-xs">{error}</p>
        </div>
      </div>
    )
  }

  if (!overview) return null

  const kpis = [
    { label: '总收入', value: overview.totalRevenue, fmt: (v: number) => `¥${(v / 10000).toFixed(0)}万`, icon: '💰', color: 'cyan' },
    { label: '总订单', value: overview.totalOrders, fmt: (v: number) => v.toLocaleString(), icon: '📋', color: 'violet' },
    { label: '客单价', value: overview.avgOrderValue, fmt: (v: number) => `¥${v.toFixed(0)}`, icon: '🏷️', color: 'emerald' },
    { label: '同比增长', value: overview.growth, fmt: (v: number) => `${v >= 0 ? '+' : ''}${v}%`, icon: '📈', color: 'amber' },
  ]

  return (
    <div className="space-y-3 max-w-[1600px] mx-auto">
      <PageHeader
        icon="💰"
        title="销售分析"
        subtitle="收入 · 转化 · 区域分布"
        extra={
          <span className="text-[10px] text-slate-500">
            较上月 <span className={`font-semibold ${overview.growth >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {overview.growth >= 0 ? '+' : ''}{overview.growth}%
            </span>
          </span>
        }
      />

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
        {kpis.map((kp, i) => (
          <AnimatedCard key={kp.label} index={i} className="relative rounded-xl bg-slate-900/80 border border-slate-800/60 p-3 overflow-hidden group">
            <div className="absolute -top-3 -right-3 w-16 h-16 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ background: `radial-gradient(circle, ${kp.color === 'cyan' ? 'rgba(34,211,238,0.12)' : kp.color === 'violet' ? 'rgba(167,139,250,0.12)' : kp.color === 'emerald' ? 'rgba(52,211,153,0.12)' : 'rgba(245,158,11,0.12)'} 0%, transparent 70%)` }}
            />
            <div className="flex items-center justify-between mb-1">
              <span className="text-slate-400 text-[10px] font-medium uppercase tracking-wide">{kp.label}</span>
              <span className="text-base">{kp.icon}</span>
            </div>
            <div className="text-xl font-bold text-white tracking-tight font-mono-tabular">
              <CountUp end={kp.value} duration={1200} formatter={kp.fmt} />
            </div>
          </AnimatedCard>
        ))}
      </div>

      <RevenueTrend height={240} />

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3">
        <SalesFunnel data={overview.funnel} height={240} />
        <TopProducts products={overview.topProducts} />
      </div>

    </div>
  )
}
