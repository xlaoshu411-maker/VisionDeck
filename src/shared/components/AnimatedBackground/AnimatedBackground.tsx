/**
 * 星空背景 — CSS 伪随机星点 + 流星
 *
 * 使用多层 box-shadow 生成数百颗星星，GPU 友好。
 * 三层星场以不同速度微动，模拟深度视差。
 */
export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10" aria-hidden="true">
      {/* 底色渐变 */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-950 via-slate-950 to-slate-900" />

      {/* 星场层 1 — 远星（小而密） */}
      <div
        className="absolute inset-0 animate-stars-slow"
        style={{
          boxShadow: stars1,
          opacity: 0.6,
        }}
      />

      {/* 星场层 2 — 中星 */}
      <div
        className="absolute inset-0 animate-stars-mid"
        style={{
          boxShadow: stars2,
          opacity: 0.5,
        }}
      />

      {/* 星场层 3 — 近星（大而亮，闪烁） */}
      <div
        className="absolute inset-0 animate-stars-fast"
        style={{
          boxShadow: stars3,
          opacity: 0.7,
          animation: 'twinkle 3s ease-in-out infinite alternate',
        }}
      />

      {/* 星云光斑 — 很淡的装饰 */}
      <div className="absolute top-[15%] left-[20%] w-[500px] h-[300px] rounded-full blur-[150px]"
        style={{ background: 'radial-gradient(ellipse, rgba(34,211,238,0.03) 0%, transparent 70%)' }} />
      <div className="absolute bottom-[10%] right-[10%] w-[400px] h-[250px] rounded-full blur-[130px]"
        style={{ background: 'radial-gradient(ellipse, rgba(167,139,250,0.03) 0%, transparent 70%)' }} />

      {/* 流星 — 偶尔划过 */}
      <div className="absolute w-[2px] h-[80px] bg-gradient-to-b from-white/40 to-transparent rounded-full"
        style={{
          top: '8%', left: '60%',
          transform: 'rotate(-30deg)',
          animation: 'shooting 8s linear infinite',
          animationDelay: '3s',
        }} />
      <div className="absolute w-[1px] h-[60px] bg-gradient-to-b from-white/30 to-transparent rounded-full"
        style={{
          top: '15%', left: '25%',
          transform: 'rotate(-25deg)',
          animation: 'shooting 10s linear infinite',
          animationDelay: '7s',
        }} />

      <style>{keyframes}</style>
    </div>
  )
}

/** 三层不同密度的星点（box-shadow 值），避免 DOM 爆炸 */
const stars1 = generateStars(120, 1)
const stars2 = generateStars(60, 1.5)
const stars3 = generateStars(30, 2)

function generateStars(count: number, size: number): string {
  const shadows: string[] = []
  for (let i = 0; i < count; i++) {
    const x = Math.floor(Math.random() * 2000)
    const y = Math.floor(Math.random() * 2000)
    shadows.push(`${x}px ${y}px ${size}px rgba(255,255,255,0.8)`)
  }
  return shadows.join(',')
}

const keyframes = `
  @keyframes twinkle {
    0%   { opacity: 0.4; }
    100% { opacity: 0.85; }
  }

  @keyframes stars-slow {
    0%   { transform: translate(0, 0); }
    100% { transform: translate(0, -20px); }
  }

  @keyframes stars-mid {
    0%   { transform: translate(0, 0); }
    100% { transform: translate(-5px, -12px); }
  }

  @keyframes stars-fast {
    0%   { transform: translate(0, 0); }
    100% { transform: translate(3px, -8px); }
  }

  @keyframes shooting {
    0%   { opacity: 0; transform: rotate(-30deg) translateX(0); }
    5%   { opacity: 1; }
    10%  { opacity: 0; transform: rotate(-30deg) translateX(800px); }
    100% { opacity: 0; transform: rotate(-30deg) translateX(800px); }
  }

  .animate-stars-slow {
    animation: stars-slow 120s linear infinite;
  }
  .animate-stars-mid {
    animation: stars-mid 80s linear infinite;
  }
  .animate-stars-fast {
    animation: stars-fast 50s linear infinite;
  }
`
