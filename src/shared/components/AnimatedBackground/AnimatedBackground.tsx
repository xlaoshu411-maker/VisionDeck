/**
 * 动态网格背景 — 深色科技感点阵
 *
 * CSS 驱动的无限循环动画，GPU 加速，
 * 不影响页面内容交互。
 */
export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10" aria-hidden="true">
      {/* 网格线 */}
      <div
        className="absolute inset-0 opacity-[0.03]"
        style={{
          backgroundImage: `
            linear-gradient(rgba(148,163,184,0.3) 1px, transparent 1px),
            linear-gradient(90deg, rgba(148,163,184,0.3) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          maskImage: 'radial-gradient(ellipse 80% 60% at 50% 30%, black 30%, transparent 70%)',
          WebkitMaskImage: 'radial-gradient(ellipse 80% 60% at 50% 30%, black 30%, transparent 70%)',
        }}
      />

      {/* 浮动光斑 1 — 左上 */}
      <div
        className="absolute w-[600px] h-[600px] rounded-full blur-[120px] animate-pulse-glow"
        style={{
          top: '-10%',
          left: '-5%',
          background: 'radial-gradient(circle, rgba(34,211,238,0.06) 0%, transparent 70%)',
          animation: 'floatOrb1 20s ease-in-out infinite',
        }}
      />

      {/* 浮动光斑 2 — 右下 */}
      <div
        className="absolute w-[500px] h-[500px] rounded-full blur-[120px] animate-pulse-glow"
        style={{
          bottom: '-10%',
          right: '-5%',
          background: 'radial-gradient(circle, rgba(167,139,250,0.05) 0%, transparent 70%)',
          animation: 'floatOrb2 25s ease-in-out infinite',
        }}
      />

      {/* 浮动光斑 3 — 中部 */}
      <div
        className="absolute w-[400px] h-[400px] rounded-full blur-[100px]"
        style={{
          top: '40%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(245,158,11,0.04) 0%, transparent 70%)',
          animation: 'floatOrb3 18s ease-in-out infinite',
        }}
      />

      <style>{animations}</style>
    </div>
  )
}

const animations = `
  @keyframes floatOrb1 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33%      { transform: translate(60px, 40px) scale(1.1); }
    66%      { transform: translate(-20px, -30px) scale(0.95); }
  }
  @keyframes floatOrb2 {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33%      { transform: translate(-50px, -30px) scale(1.15); }
    66%      { transform: translate(30px, 20px) scale(0.9); }
  }
  @keyframes floatOrb3 {
    0%, 100% { transform: translate(-50%, -50%) scale(1); }
    50%      { transform: translate(-50%, -60%) scale(1.2); }
  }
`
