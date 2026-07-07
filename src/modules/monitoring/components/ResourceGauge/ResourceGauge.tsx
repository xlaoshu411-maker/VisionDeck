/**
 * 资源仪表盘 — SVG 环形仪表
 */
import { AnimatedCard } from '@shared/components/AnimatedCard'

interface GaugeItem {
  label: string
  value: number
  max: number
  unit: string
  color: string
  icon: string
}

const gauges: GaugeItem[] = [
  { label: 'API 网关', value: 87, max: 100, unit: '%', color: '#34d399', icon: '🔌' },
  { label: '数据库', value: 62, max: 100, unit: '%', color: '#22d3ee', icon: '🗄️' },
  { label: '缓存命中', value: 94, max: 100, unit: '%', color: '#a78bfa', icon: '⚡' },
  { label: '消息队列', value: 45, max: 100, unit: '%', color: '#f59e0b', icon: '📨' },
]

function RingGauge({ item }: { item: GaugeItem }) {
  const r = 36
  const c = 2 * Math.PI * r
  const pct = item.value / item.max
  const offset = c * (1 - pct)

  return (
    <div className="flex flex-col items-center group">
      <div className="relative w-16 h-16 mb-1">
        <svg viewBox="0 0 88 88" className="w-full h-full -rotate-90">
          <circle cx="44" cy="44" r={r} fill="none" stroke="rgba(255,255,255,0.06)" strokeWidth="10" />
          <circle cx="44" cy="44" r={r} fill="none" stroke={item.color} strokeWidth="10"
            strokeLinecap="round" strokeDasharray={c} strokeDashoffset={offset}
            style={{ filter: `drop-shadow(0 0 4px ${item.color}44)`, transition: 'stroke-dashoffset 1.5s cubic-bezier(0.16, 1, 0.3, 1)' }} />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <span className="text-xs font-bold text-white">{item.value}{item.unit}</span>
        </div>
      </div>
      <span className="text-[10px] text-slate-400">{item.label}</span>
    </div>
  )
}

export function ResourceGauge() {
  return (
    <AnimatedCard className="rounded-xl bg-white/[0.04] backdrop-blur-xl border border-white/[0.06] p-4 relative overflow-hidden">
      <h3 className="text-slate-300 text-sm font-semibold mb-3">资源负载</h3>
      <div className="grid grid-cols-4 gap-1">
        {gauges.map(g => (
          <RingGauge key={g.label} item={g} />
        ))}
      </div>
    </AnimatedCard>
  )
}
