import { CountUp } from '@shared/components/CountUp'
import { AnimatedCard } from '@shared/components/AnimatedCard'
import type { RealtimeMetric } from '../../types'

interface RealtimeCardProps {
  item: RealtimeMetric
  index: number
}

const statusConfig = {
  normal: { dot: 'bg-emerald-400', glow: 'shadow-emerald-500/20' },
  warning: { dot: 'bg-amber-400', glow: 'shadow-amber-500/20' },
  critical: { dot: 'bg-red-500', glow: 'shadow-red-500/30' },
}

export function RealtimeCard({ item, index }: RealtimeCardProps) {
  const cfg = statusConfig[item.status]
  const changeSign = item.changeRate >= 0 ? '+' : ''

  return (
    <AnimatedCard index={index} className="relative overflow-hidden rounded-xl bg-white/[0.04] backdrop-blur-xl border border-white/[0.06] p-3 hover:border-slate-700/60 transition-colors duration-300">
      <div className="absolute top-2 right-2 flex items-center gap-1">
        <span className={`w-1.5 h-1.5 rounded-full ${cfg.dot} animate-pulse-glow`} />
        <span className="text-[9px] text-slate-500">{item.status === 'normal' ? '正常' : item.status === 'warning' ? '告警' : '异常'}</span>
      </div>

      <span className="text-slate-400 text-[10px] font-medium uppercase tracking-wide">{item.label}</span>

      <div className="mt-1.5 text-2xl font-bold text-white tracking-tight font-mono-tabular">
        <CountUp end={item.value} duration={1200} />
        <span className="text-sm text-slate-500 ml-1">{item.unit}</span>
      </div>

      <div className="mt-1.5 flex items-center gap-1.5">
        <span className={`text-[10px] font-semibold ${item.changeRate >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
          {changeSign}{item.changeRate}%
        </span>
        <span className="text-[10px] text-slate-500">较上周期</span>
      </div>

      <div className="mt-2 h-0.5 bg-slate-800 rounded-full overflow-hidden">
        <div className={`h-full rounded-full transition-all duration-1000 ${cfg.dot}`}
          style={{ width: `${Math.min(Math.abs(item.changeRate) * 5, 100)}%` }} /></div>
    </AnimatedCard>
  )
}
