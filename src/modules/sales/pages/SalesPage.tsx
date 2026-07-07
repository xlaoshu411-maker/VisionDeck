import {
  useSalesData,
  SalesFunnel,
  TopProducts,
  RevenueTrend,
  RegionalMap,
} from '@modules/sales'
import { Skeleton } from '@shared/components/Skeleton'
import { PageHeader } from '@shared/components/PageHeader'
import { CountUp } from '@shared/components/CountUp'
import { AnimatedCard } from '@shared/components/AnimatedCard'

export default function SalesPage() {
  const { overview, loading, error, ready } = useSalesData()

  if (loading || !ready) {
    return (
      <div className="space-y-6 max-w-[1600px] mx-auto">
        <Skeleton variant="text" lines={2} className="max-w-sm" />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {Array.from({ length: 4 }).map((_, i) => (<Skeleton key={i} variant="card" />))}
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
          <p className="text-red-400 text-lg font-semibold mb-2">数据加载失败</p>
          <p className="text-slate-500 text-sm">{error}</p>
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
    <div className="space-y-6 max-w-[1600px] mx-auto">
      <PageHeader
        icon="💰"
        title="销售分析"
        subtitle="销售收入、订单转化与区域分布"
        extra={
          <span className="text-xs text-slate-500">
            较上月
            <span className={`ml-1 font-semibold ${overview.growth >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
              {overview.growth >= 0 ? '+' : ''}{overview.growth}%
            </span>
          </span>
        }
      />

      {/* KPI 卡片 */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpis.map((kp, i) => (
          <AnimatedCard key={kp.label} index={i} className="relative rounded-xl bg-slate-900/80 border border-slate-800/60 p-5 overflow-hidden group">
            {/* 背景光晕 */}
            <div className="absolute -top-4 -right-4 w-20 h-20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
              style={{ background: `radial-gradient(circle, ${kp.color === 'cyan' ? 'rgba(34,211,238,0.15)' : kp.color === 'violet' ? 'rgba(167,139,250,0.15)' : kp.color === 'emerald' ? 'rgba(52,211,153,0.15)' : 'rgba(245,158,11,0.15)'} 0%, transparent 70%)` }}
            />
            <div className="flex items-center justify-between mb-2">
              <span className="text-slate-400 text-xs font-medium tracking-wide uppercase">{kp.label}</span>
              <span className="text-lg">{kp.icon}</span>
            </div>
            <div className="text-2xl font-bold text-white tracking-tight font-mono-tabular">
              <CountUp end={kp.value} duration={1400} formatter={kp.fmt} />
            </div>
          </AnimatedCard>
        ))}
      </div>

      {/* 收入趋势（全年） */}
      <RevenueTrend />

      {/* 漏斗 + 排行 */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <SalesFunnel data={overview.funnel} />
        <TopProducts products={overview.topProducts} />
      </div>

      {/* 区域分布 */}
      <RegionalMap height={300} />
    </div>
  )
}
