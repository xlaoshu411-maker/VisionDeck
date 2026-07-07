import type { AlertItem } from '../../types'

interface AlertListProps {
  alerts: AlertItem[]
}

const levelStyles = {
  info: { border: 'border-l-sky-400', bg: 'bg-sky-500/10', text: 'text-sky-400' },
  warning: { border: 'border-l-amber-400', bg: 'bg-amber-500/10', text: 'text-amber-400' },
  error: { border: 'border-l-red-500', bg: 'bg-red-500/10', text: 'text-red-400' },
}

const levelLabels = { info: '信息', warning: '告警', error: '严重' }

export function AlertList({ alerts }: AlertListProps) {
  if (alerts.length === 0) {
    return (
      <div className="rounded-xl bg-white/[0.04] backdrop-blur-xl border border-white/[0.06] p-4 text-center">
        <p className="text-slate-500 text-xs">🎉 无告警，一切正常</p>
      </div>
    )
  }

  return (
    <div className="rounded-xl bg-white/[0.04] backdrop-blur-xl border border-white/[0.06] overflow-hidden">
      <div className="px-4 py-2 border-b border-white/[0.05] flex items-center justify-between">
        <h3 className="text-slate-300 text-xs font-semibold">实时告警</h3>
        <span className="text-[10px] text-slate-500">{alerts.length} 条</span>
      </div>
      <ul className="divide-y divide-white/[0.04]">
        {alerts.map(alert => {
          const s = levelStyles[alert.level]
          return (
            <li
              key={alert.id}
              className="border-l-2 border-l-transparent hover:bg-white/[0.04] transition-colors"
            >
              <div className={`px-4 py-2 border-l-2 ${s.border} -ml-0.5`}>
                <div className="flex items-start justify-between gap-2">
                  <div className="min-w-0">
                    <div className="flex items-center gap-1.5 mb-0.5">
                      <span className={`text-[9px] font-semibold px-1 py-0.5 rounded ${s.bg} ${s.text}`}>{levelLabels[alert.level]}</span>
                      <span className="text-[10px] text-slate-500">{alert.source}</span>
                    </div>
                    <p className="text-xs text-slate-300 truncate">{alert.message}</p>
                  </div>
                  <span className="text-[9px] text-slate-600 whitespace-nowrap mt-0.5">
                    {new Date(alert.timestamp).toLocaleTimeString('zh-CN')}
                  </span>
                </div>
              </div>
            </li>
          )
        })}
      </ul>
    </div>
  )
}
