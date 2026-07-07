import { useRef, useEffect } from 'react'
import { AnimatedCard } from '@shared/components/AnimatedCard'
import type { StatItem } from '../../types'

interface StatBreakdownProps {
  items: StatItem[]
}

/**
 * 指标分解图 — SVG 驱动的动画条形图
 *
 * 每个指标用一条渐变色条展示其在总量中的占比，
 * 条形的宽度和颜色根据数值动态计算，入场时从 0 展开。
 */
export function StatBreakdown({ items }: StatBreakdownProps) {
  if (items.length === 0) {
    return (
      <AnimatedCard className="rounded-xl bg-slate-900/80 border border-slate-800/60 p-6">
        <h3 className="text-slate-300 text-base font-semibold mb-4">指标分解</h3>
        <p className="text-slate-500 text-sm text-center py-8">暂无数据</p>
      </AnimatedCard>
    )
  }

  // 以第一个非百分比值作为基准归一化
  const numericItems = items.filter(i => i.unit !== '%')
  const maxVal = Math.max(...numericItems.map(i => i.value), 1)

  return (
    <AnimatedCard className="rounded-xl bg-slate-900/80 border border-slate-800/60 p-6">
      <h3 className="text-slate-300 text-base font-semibold mb-5">指标分解</h3>

      <div className="space-y-5">
        {items.map((item, i) => (
          <BarItem key={item.id} item={item} maxVal={maxVal} index={i} />
        ))}
      </div>

      {/* 底部 SVG 装饰 */}
      <div className="mt-5 pt-4 border-t border-slate-800/60">
        <MiniSparkline items={items} />
      </div>
    </AnimatedCard>
  )
}

/** 单条指标 */
function BarItem({ item, maxVal, index }: { item: StatItem; maxVal: number; index: number }) {
  const barRef = useRef<HTMLDivElement>(null)
  const isPercent = item.unit === '%'
  const ratio = isPercent ? item.value / 100 : item.value / maxVal

  // 颜色映射
  const colors = [
    ['#22d3ee', '#0891b2'], // cyan
    ['#a78bfa', '#7c3aed'], // violet
    ['#34d399', '#059669'], // emerald
    ['#f59e0b', '#d97706'], // amber
  ]
  const [c1, c2] = colors[index % colors.length]

  useEffect(() => {
    const el = barRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          el.style.width = `${ratio * 100}%`
          observer.disconnect()
        }
      },
      { threshold: 0.5 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [ratio])

  const trendArrow = item.trend > 0 ? '↑' : item.trend < 0 ? '↓' : '→'
  const trendColor = item.trend > 0 ? 'text-emerald-400' : item.trend < 0 ? 'text-red-400' : 'text-slate-400'

  return (
    <div className="group">
      {/* 标签行 */}
      <div className="flex items-baseline justify-between mb-1.5">
        <span className="text-sm text-slate-400 group-hover:text-slate-300 transition-colors">
          {item.label}
        </span>
        <span className="text-xs text-slate-500">
          <span className={`${trendColor} font-semibold`}>{trendArrow} {Math.abs(item.trend)}%</span>
        </span>
      </div>

      {/* 条形图 */}
      <div className="h-3 bg-slate-800/80 rounded-full overflow-hidden relative">
        <div
          ref={barRef}
          className="h-full rounded-full transition-all duration-1000 ease-out"
          style={{
            width: '0%',
            background: `linear-gradient(90deg, ${c1}, ${c2})`,
            transitionDelay: `${index * 100}ms`,
            boxShadow: `0 0 8px ${c1}33`,
          }}
        />
        {/* 高光扫过 */}
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-full" />
      </div>

      {/* 数值 */}
      <div className="flex justify-between mt-1">
        <span className="text-[11px] text-slate-600 font-mono">
          {item.unit === '%'
            ? `${item.value.toFixed(1)}${item.unit}`
            : item.value.toLocaleString('zh-CN')}
        </span>
        <span className="text-[11px] text-slate-600">{Math.round(ratio * 100)}%</span>
      </div>
    </div>
  )
}

/** 底部迷你趋势线 — 纯 SVG，零依赖 */
function MiniSparkline({ items }: { items: StatItem[] }) {
  const w = 200
  const h = 36
  const pad = 4
  const vals = items.map(i => i.value)
  const maxV = Math.max(...vals, 1)
  const minV = Math.min(...vals, 0)

  const points = vals.map((v, i) => {
    const x = pad + (i / Math.max(vals.length - 1, 1)) * (w - pad * 2)
    const y = h - pad - ((v - minV) / (maxV - minV || 1)) * (h - pad * 2)
    return `${x},${y}`
  })

  const pathD = `M${points.join(' L')}`

  const isUp = vals[vals.length - 1] >= vals[0]
  const stroke = isUp ? '#22d3ee' : '#f59e0b'

  return (
    <div className="flex items-center gap-3">
      <span className="text-[10px] text-slate-600 whitespace-nowrap">趋势</span>
      <svg viewBox={`0 0 ${w} ${h}`} className="w-full h-9">
        {/* 网格线 */}
        <line x1={pad} y1={h - pad} x2={w - pad} y2={h - pad} stroke="#1e293b" strokeWidth="1" />
        {/* 填充 */}
        <linearGradient id="sparkFill" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor={stroke} stopOpacity="0.2" />
          <stop offset="100%" stopColor={stroke} stopOpacity="0" />
        </linearGradient>
        <path
          d={`${pathD} L${w - pad},${h - pad} L${pad},${h - pad} Z`}
          fill="url(#sparkFill)"
        />
        {/* 折线 */}
        <path
          d={pathD}
          fill="none"
          stroke={stroke}
          strokeWidth="1.5"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        {/* 端点圆 */}
        {points.map((p, i) => (
          <circle
            key={i}
            cx={p.split(',')[0]}
            cy={p.split(',')[1]}
            r="2.5"
            fill={i === points.length - 1 ? stroke : '#1e293b'}
            stroke={stroke}
            strokeWidth="1"
          />
        ))}
      </svg>
      <span className={`text-[10px] font-semibold ${isUp ? 'text-emerald-400' : 'text-amber-400'}`}>
        {isUp ? '↑ 上升' : '↓ 下降'}
      </span>
    </div>
  )
}
