/**
 * 最近订单 — 紧凑滚动 + 动态置顶高亮
 */
import { useEffect, useRef, useState } from 'react'
import { AnimatedCard } from '@shared/components/AnimatedCard'

interface Order {
  id: string
  customer: string
  amount: number
  status: 'completed' | 'pending' | 'cancelled'
  time: string
}

const statusMap = {
  completed: { label: '完成', cls: 'text-emerald-400' },
  pending: { label: '处理', cls: 'text-amber-400' },
  cancelled: { label: '取消', cls: 'text-red-400' },
}

const allOrders: Order[] = [
  { id: '#8921', customer: '杭州云计算科技', amount: 128000, status: 'completed', time: '14:32' },
  { id: '#8920', customer: '上海数据服务', amount: 95600, status: 'completed', time: '14:28' },
  { id: '#8919', customer: '深圳智造未来', amount: 203000, status: 'pending', time: '14:15' },
  { id: '#8918', customer: '北京数字引擎', amount: 67500, status: 'completed', time: '13:58' },
  { id: '#8917', customer: '成都云链科技', amount: 189000, status: 'cancelled', time: '13:42' },
  { id: '#8916', customer: '广州智慧城市', amount: 312000, status: 'completed', time: '13:30' },
  { id: '#8915', customer: '武汉东湖数据', amount: 84500, status: 'completed', time: '13:12' },
]

export function RecentOrders() {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [featuredIdx, setFeaturedIdx] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setFeaturedIdx(prev => (prev + 1) % allOrders.length)
    }, 3500)
    return () => clearInterval(timer)
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    let id: number
    let pos = 0
    function step() {
      if (!el) return
      pos += 0.55
      if (pos >= el.scrollHeight / 2) pos = 0
      el.scrollTop = pos
      id = requestAnimationFrame(step)
    }
    const pause = () => cancelAnimationFrame(id)
    const resume = () => { id = requestAnimationFrame(step) }
    el.addEventListener('mouseenter', pause)
    el.addEventListener('mouseleave', resume)
    id = requestAnimationFrame(step)
    return () => { cancelAnimationFrame(id); el.removeEventListener('mouseenter', pause); el.removeEventListener('mouseleave', resume) }
  }, [])

  const featured = allOrders[featuredIdx]

  return (
    <div style={{ height: 400 }}>
    <AnimatedCard className="rounded-xl bg-slate-900/80 border border-slate-800/60 p-3 flex flex-col h-full">
      <div className="flex items-center justify-between mb-2 shrink-0">
        <h3 className="text-slate-300 text-xs font-semibold">最近订单</h3>
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-glow" />
          <span className="text-[9px] text-slate-500">实时</span>
        </div>
      </div>

      {/* 置顶高亮 */}
      <div className="mb-2 p-2 rounded-lg bg-gradient-to-r from-slate-800/60 to-slate-800/20 border border-slate-700/40 shrink-0 transition-all duration-500">
        <div className="flex items-center justify-between mb-0.5">
          <span className="text-[9px] text-cyan-400 font-semibold">🔔 最新大单</span>
          <span className="text-[9px] text-slate-500">{featured.time}</span>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-[11px] text-white font-medium truncate flex-1 mr-2">{featured.customer}</span>
          <span className="text-[11px] text-amber-400 font-bold font-mono-tabular">
            ¥{(featured.amount / 10000).toFixed(1)}万
          </span>
        </div>
        <span className="text-[9px] text-slate-500 font-mono">{featured.id}</span>
      </div>

      {/* 滚动列表 */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-hidden"
        style={{ maskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 80%, transparent 100%)' }}
      >
        {[...allOrders, ...allOrders].map((order, i) => {
          const s = statusMap[order.status]
          return (
            <div
              key={`${order.id}-${i}`}
              className="flex items-center gap-1.5 py-1.5 border-b border-slate-800/30 last:border-0 hover:bg-slate-800/20 transition-colors rounded px-1 -mx-1"
            >
              <span className="text-[9px] text-slate-500 font-mono w-8 shrink-0">{order.id}</span>
              <span className="text-[9px] text-slate-300 flex-1 truncate">{order.customer}</span>
              <span className={`text-[8px] font-semibold ${s.cls} w-6 text-right shrink-0`}>{s.label}</span>
              <span className="text-[9px] text-white font-mono-tabular w-14 text-right shrink-0">
                ¥{(order.amount / 10000).toFixed(1)}万
              </span>
            </div>
          )
        })}
      </div>
    </AnimatedCard>
    </div>
  )
}
