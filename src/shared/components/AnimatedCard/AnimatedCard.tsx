import { type ReactNode } from 'react'

interface AnimatedCardProps {
  children: ReactNode
  /** 在容器列表中使用时设置 index，实现交错延迟 */
  index?: number
  className?: string
  /** 包裹的 HTML 标签 */
  as?: 'div' | 'li'
}

/**
 * 带动效的卡片容器
 *
 * 使用 CSS @keyframes 实现（避免引入 framer-motion 依赖），
 * 通过 animation-delay 实现交错入场。
 */
export function AnimatedCard({
  children,
  index = 0,
  className = '',
  as: Tag = 'div',
}: AnimatedCardProps) {
  const base = 'animate-card-enter'

  const style: React.CSSProperties = {
    animationDelay: `${index * 80}ms`,
    animationFillMode: 'backwards',
  }

  return (
    <Tag className={`${base} ${className}`} style={style}>
      {children}
      <style>{cssKeyframes}</style>
    </Tag>
  )
}

/** 纯 CSS keyframes — 零依赖、GPU 加速 */
const cssKeyframes = `
  @keyframes cardFadeUp {
    from {
      opacity: 0;
      transform: translateY(24px) scale(0.97);
    }
    to {
      opacity: 1;
      transform: translateY(0) scale(1);
    }
  }

  @keyframes cardFadeIn {
    from { opacity: 0; transform: scale(0.92); }
    to   { opacity: 1; transform: scale(1); }
  }

  @keyframes shimmerMove {
    from { background-position: 200% 0; }
    to   { background-position: -200% 0; }
  }

  @keyframes pulseGlow {
    0%, 100% { box-shadow: 0 0 0 0 rgba(34, 221, 238, 0.3); }
    50%      { box-shadow: 0 0 12px 2px rgba(34, 221, 238, 0.15); }
  }

  .animate-card-enter {
    animation: cardFadeUp 0.5s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }

  .animate-fade-in {
    animation: cardFadeIn 0.4s ease-out forwards;
  }

  .animate-shimmer {
    background: linear-gradient(
      90deg,
      transparent 0%,
      rgba(148, 163, 184, 0.06) 30%,
      rgba(148, 163, 184, 0.1) 50%,
      rgba(148, 163, 184, 0.06) 70%,
      transparent 100%
    );
    background-size: 200% 100%;
    animation: shimmerMove 1.8s linear infinite;
  }

  .animate-pulse-glow {
    animation: pulseGlow 2.5s ease-in-out infinite;
  }

  @keyframes countBarGrow {
    from { transform: scaleX(0); }
    to   { transform: scaleX(1); }
  }

  .animate-bar-grow {
    transform-origin: left;
    animation: countBarGrow 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
  }
`
