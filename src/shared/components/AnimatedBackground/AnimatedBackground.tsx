/**
 * 星空背景 — 多层星点 + 流星划过
 */
export function AnimatedBackground() {
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0" aria-hidden="true">
      {/* 底色 */}
      <div className="absolute inset-0 bg-gradient-to-b from-[#020817] via-[#050e1f] to-[#081428]" />

      {/* 星场 1 — 密而小 */}
      <div
        className="absolute inset-0 animate-stars-slow"
        style={{ boxShadow: stars1, opacity: 0.9 }}
      />

      {/* 星场 2 — 中大 */}
      <div
        className="absolute inset-0 animate-stars-mid"
        style={{ boxShadow: stars2, opacity: 0.8 }}
      />

      {/* 星场 3 — 大而亮，闪烁 */}
      <div
        className="absolute inset-0 animate-stars-fast"
        style={{ boxShadow: stars3, opacity: 1, animation: 'starTwinkle 2.5s ease-in-out infinite alternate' }}
      />

      {/* 流星 1 */}
      <div
        style={{
          position: 'absolute', top: '5%', left: '55%',
          width: 2, height: 100,
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.8), transparent)',
          borderRadius: '50%',
          transform: 'rotate(-35deg)',
          animation: 'meteor1 7s linear infinite',
          animationDelay: '2s',
        }}
      />
      {/* 流星 2 */}
      <div
        style={{
          position: 'absolute', top: '12%', left: '30%',
          width: 1.5, height: 70,
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.6), transparent)',
          borderRadius: '50%',
          transform: 'rotate(-30deg)',
          animation: 'meteor2 9s linear infinite',
          animationDelay: '6s',
        }}
      />
      {/* 流星 3 */}
      <div
        style={{
          position: 'absolute', top: '3%', left: '75%',
          width: 1, height: 55,
          background: 'linear-gradient(to bottom, rgba(255,255,255,0.7), transparent)',
          borderRadius: '50%',
          transform: 'rotate(-40deg)',
          animation: 'meteor3 11s linear infinite',
        }}
      />

      <style>{animations}</style>
    </div>
  )
}

/** 生成星点 box-shadow 字符串（GPU 友好，单元素渲染全部星点） */
function genStars(count: number, sizePx: number): string {
  const out: string[] = []
  for (let i = 0; i < count; i++) {
    const x = (Math.random() * 100).toFixed(1)
    const y = (Math.random() * 100).toFixed(1)
    out.push(`${x}vw ${y}vh ${sizePx}px ${sizePx / 2}px rgba(220,230,255,0.95)`)
  }
  return out.join(',')
}

const stars1 = genStars(200, 1)
const stars2 = genStars(80, 1.8)
const stars3 = genStars(30, 2.5)

const animations = `
  @keyframes starTwinkle {
    0%   { opacity: 0.5; }
    100% { opacity: 1; }
  }

  @keyframes stars-slow {
    0%   { transform: translateY(0); }
    100% { transform: translateY(-30px); }
  }
  @keyframes stars-mid {
    0%   { transform: translateY(0); }
    100% { transform: translateY(-18px); }
  }
  @keyframes stars-fast {
    0%   { transform: translateY(0); }
    100% { transform: translateY(-10px); }
  }

  @keyframes meteor1 {
    0%   { opacity: 0; transform: rotate(-35deg) translateX(0) translateY(0); }
    4%   { opacity: 1; }
    8%   { opacity: 0; transform: rotate(-35deg) translateX(900px) translateY(400px); }
    100% { opacity: 0; }
  }
  @keyframes meteor2 {
    0%   { opacity: 0; transform: rotate(-30deg) translateX(0) translateY(0); }
    3%   { opacity: 1; }
    6%   { opacity: 0; transform: rotate(-30deg) translateX(700px) translateY(300px); }
    100% { opacity: 0; }
  }
  @keyframes meteor3 {
    0%   { opacity: 0; transform: rotate(-40deg) translateX(0) translateY(0); }
    5%   { opacity: 1; }
    10%  { opacity: 0; transform: rotate(-40deg) translateX(600px) translateY(250px); }
    100% { opacity: 0; }
  }

  .animate-stars-slow { animation: stars-slow 100s linear infinite; }
  .animate-stars-mid  { animation: stars-mid 60s linear infinite; }
  .animate-stars-fast { animation: stars-fast 35s linear infinite; }
`
