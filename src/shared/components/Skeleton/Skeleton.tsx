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
      <div className={`rounded-xl bg-white/[0.04] backdrop-blur-xl border border-white/[0.06] p-4 ${className}`}>
        <SkeletonBar className="h-4 w-24 mb-3" />
        <div className="flex items-end gap-3 h-32">
          {Array.from({ length: 7 }).map((_, i) => (
            <SkeletonBar key={i} className="flex-1 rounded-t" style={{ height: `${30 + Math.random() * 70}%` }} />
          ))}
        </div>
      </div>
    )
  }

  return (
    <div className={`rounded-xl bg-white/[0.04] backdrop-blur-xl border border-white/[0.06] p-3 ${className}`}>
      <div className="flex items-center justify-between mb-2">
        <SkeletonBar className="h-3 w-12" />
        <SkeletonBar className="h-3 w-8" />
      </div>
      <SkeletonBar className="h-6 w-20 mb-1" />
      <SkeletonBar className="h-2 w-10" />
    </div>
  )
}
