import type { ReactNode } from 'react'

interface PageHeaderProps {
  title: string
  subtitle?: string
  icon?: string
  extra?: ReactNode
}

export function PageHeader({ title, subtitle, icon, extra }: PageHeaderProps) {
  return (
    <div className="relative mb-8">
      {/* 装饰线 */}
      <div className="absolute -left-6 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 via-cyan-500/50 to-transparent rounded-full" />

      <div className="flex items-center justify-between">
        <div>
          <div className="flex items-center gap-3 mb-1">
            {icon && (
              <span className="text-2xl animate-fade-in">{icon}</span>
            )}
            <h2 className="text-2xl font-bold text-white tracking-tight">{title}</h2>
          </div>
          {subtitle && (
            <p className="text-slate-500 text-sm mt-1 ml-1">{subtitle}</p>
          )}
        </div>
        {extra}
      </div>

      {/* 底部渐变分割线 */}
      <div className="mt-4 h-px bg-gradient-to-r from-cyan-500/30 via-slate-700/50 to-transparent" />
    </div>
  )
}
