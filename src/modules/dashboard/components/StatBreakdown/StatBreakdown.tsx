import { useRef, useEffect } from 'react'
import { AnimatedCard } from '@shared/components/AnimatedCard'
import { CountUp } from '@shared/components/CountUp'
import type { StatItem } from '../../types'

interface StatBreakdownProps {
  items: StatItem[]
}

/**
 * 计算每个指标的"目标值"——取比当前值高 10%~30% 的整数，
 * 确保每条 bar 都在 70%~90% 区间，视觉上均衡美观。
 */
function computeTarget(value: number): number {
  if (value <= 0) return 100
  // 找到一个比 value 大 15%~35% 的漂亮取整值
  const inflated = value * 1.2
  const magnitude = Math.pow(10, Math.floor(Math.log10(inflated)))
  const normalized = inflated / magnitude

  let nice: number
  if (normalized <= 1.5) nice = 1.5
  else if (normalized <= 2) nice = 2
  else if (normalized <= 3) nice = 3
  else if (normalized <= 5) nice = 5
  else if (normalized <= 7) nice = 7
  else nice = 10

  return Math.round(nice * magnitude)
}

/** ---- 颜色方案 ---- */
const COLOR_SCHEMES = [
  { bar: ['#22d3ee', '#06b6d4'], glow: 'rgba(34,211,238,0.25)', dot: '#22d3ee' },
  { bar: ['#a78bfa', '#8b5cf6'], glow: 'rgba(167,139,250,0.25)', dot: '#a78bfa' },
  { bar: ['#34d399', '#10b981'], glow: 'rgba(52,211,153,0.25)', dot: '#34d399' },
  { bar: ['#f59e0b', '#f97316'], glow: 'rgba(245,158,11,0.25)', dot: '#f59e0b' },
]

/** 单位格式化 */
function formatValue(item: StatItem): string {
  if (item.unit === '%') return `${item.value.toFixed(2)}%`
  if (item.value >= 100_000_000) return `${(item.value / 100_000_000).toFixed(1)}亿`
  if (item.value >= 10_000) return `${(item.value / 10_000).toFixed(1)}万`
  return item.value.toLocaleString('zh-CN')
}

export function StatBreakdown({ items }: StatBreakdownProps) {
  if (items.length === 0) {
    return (
      <AnimatedCard className="rounded-xl bg-white/[0.04] backdrop-blur-xl border border-white/[0.06] p-3">
        <h3 className="text-slate-300 text-sm font-semibold mb-2">指标分解</h3>
        <p className="text-slate-500 text-xs text-center py-4">暂无数据</p>
      </AnimatedCard>
    )
  }

  return (
    <AnimatedCard className="rounded-xl bg-white/[0.04] backdrop-blur-xl border border-white/[0.06] p-3">
      <h3 className="text-slate-300 text-sm font-semibold mb-2">指标分解</h3>
      <div className="space-y-3">
        {items.map((item, i) => (
          <BarItem key={item.id} item={item} index={i} />
        ))}
      </div>
    </AnimatedCard>
  )
}

function BarItem({ item, index }: { item: StatItem; index: number }) {
  const barRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const target = computeTarget(item.value)
  const ratio = Math.min(item.value / target, 1)
  const cs = COLOR_SCHEMES[index % COLOR_SCHEMES.length]

  useEffect(() => {
    const bar = barRef.current
    const dot = dotRef.current
    if (!bar || !dot) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          bar.style.width = `${ratio * 100}%`
          dot.style.left = `${ratio * 100}%`
          observer.disconnect()
        }
      },
      { threshold: 0.4 },
    )
    observer.observe(bar)
    return () => observer.disconnect()
  }, [ratio])

  const trendSymbol = item.trend > 0 ? '↑' : item.trend < 0 ? '↓' : '→'
  const trendColor =
    item.trend > 0
      ? 'text-emerald-400 bg-emerald-500/10'
      : item.trend < 0
        ? 'text-red-400 bg-red-500/10'
        : 'text-slate-400 bg-slate-500/10'

  return (
    <div className="group">
      {/* 标签行 + 当前值 */}
      <div className="flex items-baseline justify-between mb-1">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full shrink-0" style={{ backgroundColor: cs.dot }} />
          <span className="text-xs text-slate-300 font-medium">{item.label}</span>
        </div>
        <div className="flex items-baseline gap-1">
          <span className="text-sm font-bold text-white font-mono-tabular">
            <CountUp end={item.value} duration={800} formatter={() => formatValue(item)} />
          </span>
          <span className="text-[10px] text-slate-500">{item.unit}</span>
        </div>
      </div>

      {/* 条形图 */}
      <div className="relative h-3 mb-1">
        <div className="absolute inset-0 bg-slate-800/80 rounded-full overflow-hidden">
          <div ref={barRef} className="h-full rounded-full"
            style={{
              width: '0%',
              background: `linear-gradient(90deg, ${cs.bar[0]}, ${cs.bar[1]})`,
              boxShadow: `0 0 6px ${cs.glow}`,
              transition: 'width 1s cubic-bezier(0.16, 1, 0.3, 1)',
              transitionDelay: `${index * 100}ms`,
            }}
          />
          <div className="absolute top-0 bottom-0 w-px bg-white/20" style={{ left: '100%' }} />
        </div>
        <div ref={dotRef}
          className="absolute top-1/2 -translate-y-1/2 w-2 h-2 rounded-full border border-slate-950 shadow-lg transition-all duration-1000 ease-out"
          style={{
            left: '0%',
            backgroundColor: cs.dot,
            boxShadow: `0 0 6px ${cs.glow}`,
            transitionDelay: `${index * 100}ms`,
          }}
        />
      </div>

      {/* 底部信息 */}
      <div className="flex justify-between text-[10px]">
        <span className="text-slate-600">达成率 <span className="text-slate-400 font-mono">{Math.round(ratio * 100)}%</span></span>
        <span className={`px-1 py-0.5 rounded text-[9px] font-semibold ${trendColor}`}>{trendSymbol} {Math.abs(item.trend)}%</span>
      </div>
    </div>
  )
}
