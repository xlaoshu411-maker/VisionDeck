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
      className="relative overflow-hidden rounded-xl bg-white/10 backdrop-blur-2xl border border-white/15 p-3 hover:border-slate-700/60 transition-all duration-300 group"
    >
      {/* 头部 */}
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-slate-400 text-[10px] font-medium tracking-wide uppercase">
          {item.label}
        </span>
        <span
          className={`text-[10px] font-semibold px-1 py-0.5 rounded ${trendBg} ${trendColor} transition-colors`}
        >
          {trendArrow} {Math.abs(item.trend)}%
        </span>
      </div>

      {/* 数值 — 带动画 */}
      <div className="text-2xl font-bold text-white tracking-tight font-mono-tabular">
        {item.unit === '%' ? (
          <>
            <CountUp end={item.value} decimals={2} duration={1300} />
            <span className="text-sm text-slate-500 ml-0.5">{item.unit}</span>
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
            <span className="text-sm text-slate-500 ml-1">{item.unit}</span>
          </>
        )}
      </div>
    </AnimatedCard>
  )
}
