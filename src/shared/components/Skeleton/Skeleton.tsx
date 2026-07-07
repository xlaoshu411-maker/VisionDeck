/**
 * 骨架屏组件 — 数据加载时的占位动画
 */

interface SkeletonProps {
  /** 'card' 卡片 | 'chart' 图表区 | 'text' 文本行 */
  variant?: 'card' | 'chart' | 'text'
  /** 重复行数（text 变体） */
  lines?: number
  className?: string
}

function SkeletonBar({ className = '', style }: { className?: string; style?: React.CSSProperties }) {
  return (
    <div className={`animate-shimmer rounded ${className}`} style={style} />
  )
}

export function Skeleton({ variant = 'card', lines = 3, className = '' }: SkeletonProps) {
  if (variant === 'text') {
    return (
      <div className={`space-y-2 ${className}`}>
        {Array.from({ length: lines }).map((_, i) => (
          <SkeletonBar
            key={i}
            className={i === lines - 1 ? 'h-3 w-3/5' : 'h-3 w-full'}
          />
        ))}
      </div>
    )
  }

  if (variant === 'chart') {
    return (
      <div className={`rounded-xl bg-slate-900/80 border border-slate-800/60 p-6 ${className}`}>
        <SkeletonBar className="h-5 w-28 mb-6" />
        <div className="flex items-end gap-4 h-48">
          {Array.from({ length: 7 }).map((_, i) => (
            <SkeletonBar
              key={i}
              className="flex-1 rounded-t"
              style={{ height: `${30 + Math.random() * 70}%` }}
            />
          ))}
        </div>
      </div>
    )
  }

  // card
  return (
    <div className={`rounded-xl bg-slate-900/80 border border-slate-800/60 p-6 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <SkeletonBar className="h-4 w-16" />
        <SkeletonBar className="h-4 w-10" />
      </div>
      <SkeletonBar className="h-9 w-28 mb-2" />
      <SkeletonBar className="h-3 w-12" />
    </div>
  )
}
