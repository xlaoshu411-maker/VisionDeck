import { CountUp } from '@shared/components/CountUp'
import { AnimatedCard } from '@shared/components/AnimatedCard'
import { trendDirection } from '@shared/utils'
import type { StatItem } from '../../types'

interface StatCardProps {
  item: StatItem
  index: number
}

export function StatCard({ item, index }: StatCardProps) {
  const dir = trendDirection(item.trend)
  const trendColor =
    dir === 'up' ? 'text-emerald-400' : dir === 'down' ? 'text-red-400' : 'text-slate-400'
  const trendArrow = dir === 'up' ? '↑' : dir === 'down' ? '↓' : '→'
  const trendBg =
    dir === 'up'
      ? 'bg-emerald-500/10'
      : dir === 'down'
        ? 'bg-red-500/10'
        : 'bg-slate-500/10'

  return (
    <AnimatedCard
      index={index}
      className="relative overflow-hidden rounded-xl bg-slate-900/80 border border-slate-800/60 p-5 hover:border-slate-700/60 transition-all duration-300 group"
    >
      {/* 顶部光效 */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

      {/* 头部 */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-slate-400 text-xs font-medium tracking-wide uppercase">
          {item.label}
        </span>
        <span
          className={`text-[11px] font-semibold px-1.5 py-0.5 rounded ${trendBg} ${trendColor} transition-colors`}
        >
          {trendArrow} {Math.abs(item.trend)}%
        </span>
      </div>

      {/* 数值 — 带动画 */}
      <div className="text-3xl font-bold text-white tracking-tight font-mono-tabular">
        {item.unit === '%' ? (
          <>
            <CountUp end={item.value} decimals={2} duration={1300} />
            <span className="text-lg text-slate-500 ml-0.5">{item.unit}</span>
          </>
        ) : (
          <>
            <CountUp
              end={item.value}
              duration={1300}
              formatter={v => {
                if (v >= 100_000_000) return `${(v / 100_000_000).toFixed(1)}亿`
                if (v >= 10_000) return `${(v / 10_000).toFixed(1)}万`
                return v.toLocaleString('zh-CN')
              }}
            />
            <span className="text-lg text-slate-500 ml-1">{item.unit}</span>
          </>
        )}
      </div>
    </AnimatedCard>
  )
}
