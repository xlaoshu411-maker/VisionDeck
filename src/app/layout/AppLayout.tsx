import { Outlet } from 'react-router-dom'
import { ErrorBoundary } from '@shared/components/ErrorBoundary'

/**
 * 应用主布局
 *
 * 所有页面共享的外壳：顶栏、侧栏（预留）、内容区。
 */
export function AppLayout() {
  return (
    <div className="min-h-screen bg-slate-950">
      {/* 顶栏 */}
      <header className="h-14 border-b border-slate-800/60 flex items-center px-6 backdrop-blur-sm bg-slate-950/80 sticky top-0 z-40">
        <h1 className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-blue-500 bg-clip-text text-transparent">
          VisionDeck
        </h1>
        <span className="ml-2 text-xs text-slate-500 font-medium">视觉舱舰</span>

        <div className="ml-auto flex items-center gap-3">
          <span className="text-xs text-slate-500">v0.1.0</span>
        </div>
      </header>

      {/* 主内容区 */}
      <main className="p-6">
        <ErrorBoundary module="AppLayout">
          <Outlet />
        </ErrorBoundary>
      </main>
    </div>
  )
}
