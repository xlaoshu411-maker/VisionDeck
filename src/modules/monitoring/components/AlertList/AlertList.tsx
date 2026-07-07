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
      <div className="rounded-xl bg-slate-900/80 border border-slate-800/60 p-6 text-center">
        <p className="text-slate-500 text-sm">🎉 无告警，一切正常</p>
      </div>
    )
  }

  return (
    <div className="rounded-xl bg-slate-900/80 border border-slate-800/60 overflow-hidden">
      <div className="px-5 py-3 border-b border-slate-800/60 flex items-center justify-between">
        <h3 className="text-slate-300 text-sm font-semibold">实时告警</h3>
        <span className="text-xs text-slate-500">{alerts.length} 条</span>
      </div>
      <ul className="divide-y divide-slate-800/40">
        {alerts.map((alert, i) => {
          const s = levelStyles[alert.level]
          return (
            <li
              key={alert.id}
              className="border-l-2 border-l-transparent hover:bg-slate-800/40 transition-colors"
              style={{
                animationDelay: `${i * 60}ms`,
                animationFillMode: 'backwards',
              }}
            >
              <div className={`px-5 py-3 border-l-2 ${s.border} -ml-0.5`}>
                <div className="flex items-start justify-between gap-3">
                  <div className="min-w-0">
                    <div className="flex items-center gap-2 mb-0.5">
                      <span className={`text-[10px] font-semibold px-1.5 py-0.5 rounded ${s.bg} ${s.text}`}>
                        {levelLabels[alert.level]}
                      </span>
                      <span className="text-xs text-slate-500">{alert.source}</span>
                    </div>
                    <p className="text-sm text-slate-300 truncate">{alert.message}</p>
                  </div>
                  <span className="text-[10px] text-slate-600 whitespace-nowrap mt-0.5">
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
