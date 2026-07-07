import type { ReactNode } from 'react'

interface PageHeaderProps {
  title: string
  subtitle?: string
  icon?: string
  extra?: ReactNode
}

export function PageHeader({ title, subtitle, icon, extra }: PageHeaderProps) {
  return (
    <div className="relative mb-3">
      <div className="absolute -left-4 top-0 bottom-0 w-0.5 bg-gradient-to-b from-cyan-400 via-cyan-500/50 to-transparent rounded-full" />
      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-2 mb-0.5">
            {icon && <span className="text-lg">{icon}</span>}
            <h2 className="text-lg font-bold text-white tracking-tight">{title}</h2>
          </div>
          {subtitle && <p className="text-slate-500 text-[11px] ml-0.5">{subtitle}</p>}
        </div>
        {extra}
      </div>
      <div className="mt-2 h-px bg-gradient-to-r from-cyan-500/20 via-slate-700/30 to-transparent" />
    </div>
  )
}
