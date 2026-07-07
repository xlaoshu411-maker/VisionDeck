/**
 * 流量来源 — 水平条形图 + 图标
 */
import { AnimatedCard } from '@shared/components/AnimatedCard'

interface TrafficItem {
  name: string
  value: number
  icon: string
  color: string
}

const mockTraffic: TrafficItem[] = [
  { name: '直接访问', value: 42, icon: '🌐', color: '#22d3ee' },
  { name: '搜索引擎', value: 28, icon: '🔍', color: '#a78bfa' },
  { name: '社交媒体', value: 18, icon: '📱', color: '#f59e0b' },
  { name: '邮件营销', value: 12, icon: '📧', color: '#34d399' },
]

export function TrafficSource() {
  return (
    <AnimatedCard className="rounded-xl bg-white/10 backdrop-blur-2xl border border-white/15 p-4 relative overflow-hidden">
      <h3 className="text-slate-300 text-sm font-semibold mb-3">流量来源</h3>

      <div className="space-y-2">
        {mockTraffic.map((item, i) => (
          <div key={item.name} className="group">
            <div className="flex items-center justify-between mb-0.5">
              <span className="flex items-center gap-1.5 text-xs text-slate-400">
                <span className="text-sm">{item.icon}</span>
                {item.name}
              </span>
              <span className="text-xs text-white font-mono-tabular font-medium">
                {item.value}%
              </span>
            </div>
            <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
              <div
                className="h-full rounded-full animate-bar-grow"
                style={{
                  width: `${item.value}%`,
                  background: `linear-gradient(90deg, ${item.color}, ${item.color}88)`,
                  animationDelay: `${i * 100}ms`,
                  animationFillMode: 'backwards',
                }}
              />
            </div>
          </div>
        ))}
      </div>

      {/* 装饰光晕 */}
      <div className="absolute -bottom-6 -right-6 w-20 h-20 rounded-full blur-2xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, rgba(34,211,238,0.06) 0%, transparent 70%)' }} />
    </AnimatedCard>
  )
}
