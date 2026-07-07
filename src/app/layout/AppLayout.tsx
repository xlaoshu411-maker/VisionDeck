import { NavLink, Outlet } from 'react-router-dom'
import { ErrorBoundary } from '@shared/components/ErrorBoundary'

const navItems = [
  { path: '/dashboard', label: '运营概览', icon: '📊' },
  { path: '/monitoring', label: '系统监控', icon: '🖥️' },
  { path: '/sales', label: '销售分析', icon: '💰' },
]

export function AppLayout() {
  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* 侧边导航 */}
      <aside className="w-56 shrink-0 border-r border-slate-800/60 bg-slate-950/60 backdrop-blur-sm flex flex-col">
        {/* Logo */}
        <div className="h-14 flex items-center px-5 border-b border-slate-800/60">
          <h1 className="text-base font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
            VisionDeck
          </h1>
          <span className="ml-2 text-[10px] text-slate-600 font-medium">视觉舱舰</span>
        </div>

        {/* Nav links */}
        <nav className="flex-1 px-3 py-4 space-y-1">
          {navItems.map(item => (
            <NavLink
              key={item.path}
              to={item.path}
              end
              className={({ isActive }) =>
                `flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm transition-all duration-200 ${
                  isActive
                    ? 'bg-slate-800/80 text-white font-medium shadow-sm'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/60'
                }`
              }
            >
              <span className="text-base">{item.icon}</span>
              {item.label}
            </NavLink>
          ))}
        </nav>

        {/* 底部信息 */}
        <div className="px-5 py-3 border-t border-slate-800/60">
          <span className="text-[10px] text-slate-600">v0.1.0 · MIT</span>
        </div>
      </aside>

      {/* 主内容区 */}
      <div className="flex-1 flex flex-col min-w-0">
        <main className="flex-1 p-6">
          <ErrorBoundary module="AppLayout">
            <Outlet />
          </ErrorBoundary>
        </main>
      </div>
    </div>
  )
}
