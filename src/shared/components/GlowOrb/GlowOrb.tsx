/**
 * 装饰性光晕球 — 放在卡片或区块周围增加视觉层次
 */

interface GlowOrbProps {
  color?: 'cyan' | 'violet' | 'emerald' | 'amber'
  size?: number
  className?: string
}

const orbColors = {
  cyan: 'rgba(34,211,238,0.12)',
  violet: 'rgba(167,139,250,0.12)',
  emerald: 'rgba(52,211,153,0.12)',
  amber: 'rgba(245,158,11,0.12)',
}

export function GlowOrb({ color = 'cyan', size = 300, className = '' }: GlowOrbProps) {
  return (
    <div
      className={`absolute rounded-full blur-3xl pointer-events-none ${className}`}
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle, ${orbColors[color]} 0%, transparent 70%)`,
        animation: 'orbBreath 4s ease-in-out infinite',
      }}
    >
      <style>{`
        @keyframes orbBreath {
          0%, 100% { opacity: 0.5; transform: scale(1); }
          50%      { opacity: 1; transform: scale(1.15); }
        }
      `}</style>
    </div>
  )
}
