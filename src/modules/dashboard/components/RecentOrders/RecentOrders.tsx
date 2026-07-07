/**
 * 最近订单 — 动态滚动列表
 */
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

const mockOrders: Order[] = [
  { id: '#ORD-8921', customer: '杭州云计算科技', amount: 128000, status: 'completed', time: '5分钟前' },
  { id: '#ORD-8920', customer: '上海数据服务有限公司', amount: 95600, status: 'completed', time: '12分钟前' },
  { id: '#ORD-8919', customer: '深圳智造未来科技', amount: 203000, status: 'pending', time: '23分钟前' },
  { id: '#ORD-8918', customer: '北京数字引擎', amount: 67500, status: 'completed', time: '38分钟前' },
  { id: '#ORD-8917', customer: '成都云链科技', amount: 189000, status: 'cancelled', time: '1小时前' },
]

export function RecentOrders() {
  return (
    <AnimatedCard className="rounded-xl bg-slate-900/80 border border-slate-800/60 p-6 relative overflow-hidden">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-slate-300 text-base font-semibold">最近订单</h3>
        <span className="text-xs text-cyan-400 hover:text-cyan-300 cursor-pointer transition-colors">
          查看全部 →
        </span>
      </div>

      <div className="space-y-0">
        {mockOrders.map((order, i) => {
          const s = statusMap[order.status]
          return (
            <div
              key={order.id}
              className="flex items-center gap-4 py-3 border-b border-slate-800/40 last:border-0 hover:bg-slate-800/30 transition-colors rounded px-2 -mx-2"
              style={{
                animationDelay: `${i * 80}ms`,
                animationFillMode: 'backwards',
              }}
            >
              {/* 订单号 */}
              <span className="text-xs text-slate-500 font-mono w-20 shrink-0">
                {order.id}
              </span>

              {/* 客户 */}
              <span className="text-sm text-slate-300 flex-1 truncate">
                {order.customer}
              </span>

              {/* 金额 */}
              <span className="text-sm text-white font-mono-tabular font-medium w-24 text-right">
                ¥{order.amount.toLocaleString()}
              </span>

              {/* 状态 */}
              <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${s.cls} w-14 text-center`}>
                {s.label}
              </span>

              {/* 时间 */}
              <span className="text-[10px] text-slate-600 w-16 text-right">
                {order.time}
              </span>
            </div>
          )
        })}
      </div>
    </AnimatedCard>
  )
}
