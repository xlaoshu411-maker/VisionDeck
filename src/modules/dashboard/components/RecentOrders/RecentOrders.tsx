/**
 * 最近订单 — 自动翻滚列表
 */
import { useEffect, useRef } from 'react'
import { AnimatedCard } from '@shared/components/AnimatedCard'

interface Order {
  id: string
  customer: string
  amount: number
  status: 'completed' | 'pending' | 'cancelled'
  time: string
}

const statusMap = {
  completed: { label: '已完成', cls: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/30' },
  pending: { label: '处理中', cls: 'bg-amber-500/10 text-amber-400 border-amber-500/30' },
  cancelled: { label: '已取消', cls: 'bg-red-500/10 text-red-400 border-red-500/30' },
}

const allOrders: Order[] = [
  { id: '#8921', customer: '杭州云计算科技有限公司', amount: 128000, status: 'completed', time: '14:32' },
  { id: '#8920', customer: '上海数据服务有限公司', amount: 95600, status: 'completed', time: '14:28' },
  { id: '#8919', customer: '深圳智造未来科技', amount: 203000, status: 'pending', time: '14:15' },
  { id: '#8918', customer: '北京数字引擎有限公司', amount: 67500, status: 'completed', time: '13:58' },
  { id: '#8917', customer: '成都云链科技有限公司', amount: 189000, status: 'cancelled', time: '13:42' },
  { id: '#8916', customer: '广州智慧城市平台', amount: 312000, status: 'completed', time: '13:30' },
  { id: '#8915', customer: '武汉东湖大数据中心', amount: 84500, status: 'completed', time: '13:12' },
  { id: '#8914', customer: '南京智能制造研究院', amount: 156000, status: 'pending', time: '12:55' },
  { id: '#8913', customer: '西安航天基地信息中心', amount: 278000, status: 'completed', time: '12:38' },
  { id: '#8912', customer: '重庆两江新区管委会', amount: 93000, status: 'completed', time: '12:20' },
  { id: '#8911', customer: '天津滨海数据港', amount: 145000, status: 'completed', time: '11:58' },
  { id: '#8910', customer: '苏州工业园区云平台', amount: 267000, status: 'pending', time: '11:42' },
]

export function RecentOrders() {
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return

    let animationId: number
    let scrollPos = 0
    const speed = 0.4 // px per frame

    function step() {
      if (!el) return
      scrollPos += speed
      if (scrollPos >= el.scrollHeight / 2) {
        scrollPos = 0
      }
      el.scrollTop = scrollPos
      animationId = requestAnimationFrame(step)
    }

    // 暂停 hover
    const pause = () => cancelAnimationFrame(animationId)
    const resume = () => { animationId = requestAnimationFrame(step) }

    el.addEventListener('mouseenter', pause)
    el.addEventListener('mouseleave', resume)

    animationId = requestAnimationFrame(step)

    return () => {
      cancelAnimationFrame(animationId)
      el.removeEventListener('mouseenter', pause)
      el.removeEventListener('mouseleave', resume)
    }
  }, [])

  // 双份数据实现无缝循环
  const displayOrders = [...allOrders, ...allOrders]

  return (
    <AnimatedCard className="rounded-xl bg-slate-900/80 border border-slate-800/60 p-4 relative overflow-hidden flex flex-col h-full">
      <div className="flex items-center justify-between mb-2 shrink-0">
        <h3 className="text-slate-300 text-sm font-semibold">最近订单</h3>
        <div className="flex items-center gap-2">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse-glow" />
          <span className="text-[10px] text-emerald-400">实时</span>
        </div>
      </div>

      {/* 表头 */}
      <div className="flex items-center gap-2 text-[9px] text-slate-600 pb-1.5 border-b border-slate-800/40 mb-1 shrink-0">
        <span className="w-10">单号</span>
        <span className="flex-1">客户</span>
        <span className="w-18 text-right">金额</span>
        <span className="w-12 text-center">状态</span>
        <span className="w-10 text-right">时间</span>
      </div>

      {/* 滚动列表 */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-hidden"
        style={{ maskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)', WebkitMaskImage: 'linear-gradient(to bottom, black 60%, transparent 100%)' }}
      >
        <div>
          {displayOrders.map((order, i) => {
            const s = statusMap[order.status]
            return (
              <div
                key={`${order.id}-${i}`}
                className="flex items-center gap-2 py-1.5 border-b border-slate-800/30 last:border-0 hover:bg-slate-800/20 transition-colors rounded px-1 -mx-1"
              >
                <span className="text-[10px] text-slate-500 font-mono w-10 shrink-0">{order.id}</span>
                <span className="text-[10px] text-slate-300 flex-1 truncate">{order.customer}</span>
                <span className="text-[10px] text-white font-mono-tabular w-18 text-right shrink-0">
                  ¥{(order.amount / 10000).toFixed(1)}万
                </span>
                <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded border ${s.cls} w-12 text-center shrink-0`}>
                  {s.label}
                </span>
                <span className="text-[9px] text-slate-600 w-10 text-right shrink-0">{order.time}</span>
              </div>
            )
          })}
        </div>
      </div>

      {/* 底部渐变遮罩（叠加在 mask 之上再加一层） */}
      <div className="absolute bottom-0 left-0 right-0 h-8 bg-gradient-to-t from-slate-950/60 to-transparent pointer-events-none" />
    </AnimatedCard>
  )
}
