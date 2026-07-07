/**
 * 事件时间线 — 运维操作记录
 */
import { AnimatedCard } from '@shared/components/AnimatedCard'

interface TimelineEvent {
  time: string
  action: string
  detail: string
  type: 'deploy' | 'scale' | 'restart' | 'config'
}

const events: TimelineEvent[] = [
  { time: '14:32', action: '自动扩容', detail: 'web-server 从 4 实例扩容至 6 实例', type: 'scale' },
  { time: '13:15', action: '配置更新', detail: 'Redis 连接池上限调整为 200', type: 'config' },
  { time: '11:48', action: '服务重启', detail: 'gateway-02 计划内滚动重启完成', type: 'restart' },
  { time: '09:30', action: '版本发布', detail: 'v2.8.1 发布至生产环境（蓝绿部署）', type: 'deploy' },
  { time: '08:00', action: '自动扩容', detail: 'worker-pool 从 2 实例扩容至 4 实例', type: 'scale' },
]

const typeIcons: Record<TimelineEvent['type'], string> = {
  deploy: '🚀',
  scale: '📈',
  restart: '🔄',
  config: '⚙️',
}

const typeColors: Record<TimelineEvent['type'], string> = {
  deploy: '#a78bfa',
  scale: '#34d399',
  restart: '#f59e0b',
  config: '#22d3ee',
}

export function EventTimeline() {
  return (
    <AnimatedCard className="rounded-xl bg-slate-900/80 border border-slate-800/60 p-4">
      <h3 className="text-slate-300 text-sm font-semibold mb-3">运维事件</h3>
      <div className="relative">
        <div className="absolute left-[11px] top-1 bottom-1 w-px bg-gradient-to-b from-slate-700 via-slate-700/50 to-transparent" />
        <div className="space-y-2">
          {events.map((evt, i) => (
            <div key={i} className="flex gap-3 relative group">
              <div className="relative z-10 w-6 h-6 rounded-full flex items-center justify-center shrink-0 border-2 border-slate-800 bg-slate-900 text-xs"
                style={{ boxShadow: `0 0 6px ${typeColors[evt.type]}33` }}>
                {typeIcons[evt.type]}
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex items-baseline justify-between gap-1">
                  <span className="text-xs text-slate-200 font-medium">{evt.action}</span>
                  <span className="text-[9px] text-slate-600 whitespace-nowrap">{evt.time}</span>
                </div>
                <p className="text-[10px] text-slate-500 leading-relaxed">{evt.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </AnimatedCard>
  )
}
