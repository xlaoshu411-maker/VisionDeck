import { formatLargeNumber, trendDirection } from '@shared/utils'
import type { StatItem } from '../../types'

interface StatCardProps {
  item: StatItem
}

export function StatCard({ item }: StatCardProps) {
  const dir = trendDirection(item.trend)
  const trendColor =
    dir === 'up' ? 'text-emerald-400' : dir === 'down' ? 'text-red-400' : 'text-slate-400'
  const trendArrow = dir === 'up' ? '↑' : dir === 'down' ? '↓' : '→'

  return (
    <div className="relative overflow-hidden rounded-xl bg-slate-900/80 border border-slate-800/60 p-6 hover:border-slate-700/60 transition-all duration-300">
      {/* 顶部光效 */}
      <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-cyan-500/40 to-transparent" />

      {/* 头部标签 */}
      <div className="flex items-center justify-between mb-3">
        <span className="text-slate-400 text-sm font-medium">{item.label}</span>
        <span className={`text-xs font-semibold ${trendColor}`}>
          {trendArrow} {Math.abs(item.trend)}%
        </span>
      </div>

      {/* 数值 */}
      <div className="text-3xl font-bold text-white tracking-tight mb-1">
        {item.unit === '%'
          ? `${item.value.toFixed(2)}${item.unit}`
          : `${formatLargeNumber(item.value)}`}
      </div>

      {/* 底部单位 */}
      <div className="text-xs text-slate-500">{item.unit}</div>
    </div>
  )
}
