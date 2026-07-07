import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { ErrorBoundary } from '@shared/components/ErrorBoundary'
import { AnimatedBackground } from '@shared/components/AnimatedBackground'

const navItems = [
  { path: '/dashboard', label: '运营概览', icon: '📊', desc: 'Dashboard' },
  { path: '/monitoring', label: '系统监控', icon: '🖥️', desc: 'Monitoring' },
  { path: '/sales', label: '销售分析', icon: '💰', desc: 'Sales' },
]

export function AppLayout() {
  const location = useLocation()

  return (
    <div className="min-h-screen bg-slate-950 flex">
      {/* 动态科技感背景 */}
      <AnimatedBackground />

      {/* 侧边导航 */}
      <aside className="w-48 shrink-0 border-r border-slate-800/40 bg-slate-950/40 backdrop-blur-sm flex flex-col relative z-10">
        {/* Logo 区域 */}
        <div className="h-12 flex items-center px-4 border-b border-slate-800/40">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-md bg-gradient-to-br from-cyan-400 to-blue-600 flex items-center justify-center text-[10px] font-bold text-white shadow-lg shadow-cyan-500/25">
              V
            </div>
            <div>
              <h1 className="text-xs font-bold text-white leading-tight">VisionDeck</h1>
              <p className="text-[9px] text-slate-500 leading-tight">视觉舱舰</p>
            </div>
          </div>
        </div>

        {/* 导航链接 */}
        <nav className="flex-1 px-2 py-3 space-y-0.5">
          {navItems.map(item => {
            const isActive = location.pathname === item.path
            return (
              <NavLink
                key={item.path}
                to={item.path}
                end
                className={() =>
                  `flex items-center gap-2 px-2.5 py-2 rounded-lg text-xs transition-all duration-200 group ${
                    isActive
                      ? 'bg-gradient-to-r from-slate-800/90 to-slate-800/60 text-white shadow-sm border border-slate-700/40'
                      : 'text-slate-400 hover:text-slate-200 hover:bg-slate-900/40 border border-transparent'
                  }`
                }
              >
                <span className="text-sm">{item.icon}</span>
                <div className="flex-1 min-w-0">
                  <div className="text-xs leading-tight">{item.label}</div>
                  <div className="text-[9px] text-slate-600 leading-tight">{item.desc}</div>
                </div>
                {isActive && (
                  <span className="w-1 h-1 rounded-full bg-cyan-400 shadow-sm shadow-cyan-400/50" />
                )}
              </NavLink>
            )
          })}
        </nav>

        {/* 底部 */}
        <div className="px-4 py-3 border-t border-slate-800/40">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded-full bg-slate-800 flex items-center justify-center text-[10px]">
              👤
            </div>
            <div>
              <p className="text-[10px] text-slate-400 leading-tight">管理员</p>
              <p className="text-[9px] text-slate-600 leading-tight">v0.1.0</p>
            </div>
          </div>
        </div>
      </aside>

      {/* 主内容区 */}
      <div className="flex-1 flex flex-col min-w-0 relative z-10">
        <main className="flex-1 p-4">
          <ErrorBoundary module="AppLayout">
            <Outlet />
          </ErrorBoundary>
        </main>
      </div>
    </div>
  )
}
