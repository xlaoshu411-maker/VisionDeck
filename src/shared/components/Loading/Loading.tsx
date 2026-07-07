/**
 * 加载状态组件 — 大屏场景下的加载指示
 */

interface LoadingProps {
  text?: string
  fullScreen?: boolean
}

export function Loading({ text = '加载中...', fullScreen = false }: LoadingProps) {
  const className = fullScreen
    ? 'fixed inset-0 flex items-center justify-center bg-slate-950 z-50'
    : 'flex items-center justify-center min-h-[200px]'

  return (
    <div className={className}>
      <div className="flex flex-col items-center gap-4">
        <div className="w-10 h-10 border-2 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin" />
        <span className="text-slate-400 text-sm">{text}</span>
      </div>
    </div>
  )
}
