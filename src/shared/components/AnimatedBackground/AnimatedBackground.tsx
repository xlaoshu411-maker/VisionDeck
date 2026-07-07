/**
 * 星空背景 — Canvas 渲染，数百颗明显可见的星星 + 流星
 */
import { useEffect, useRef } from 'react'

interface Star {
  x: number
  y: number
  r: number
  alpha: number
  twinkleSpeed: number
  twinklePhase: number
  color: string
}

const COLORS = [
  'rgba(255,255,255,',
  'rgba(200,220,255,',
  'rgba(180,210,255,',
  'rgba(255,250,230,',
  'rgba(220,240,255,',
]

function createStars(count: number, w: number, h: number): Star[] {
  return Array.from({ length: count }, () => ({
    x: Math.random() * w,
    y: Math.random() * h,
    r: 0.6 + Math.random() * 2.8,
    alpha: 0.3 + Math.random() * 0.7,
    twinkleSpeed: 0.005 + Math.random() * 0.04,
    twinklePhase: Math.random() * Math.PI * 2,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
  }))
}

export function AnimatedBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let w = window.innerWidth
    let h = window.innerHeight
    canvas.width = w
    canvas.height = h

    const stars = createStars(350, w, h)
    const meteors: { x: number; y: number; vx: number; vy: number; life: number; maxLife: number }[] = []

    // 定时生成流星
    const meteorInterval = setInterval(() => {
      meteors.push({
        x: Math.random() * w * 0.8,
        y: Math.random() * h * 0.3,
        vx: 3 + Math.random() * 4,
        vy: 2 + Math.random() * 3,
        life: 0,
        maxLife: 60 + Math.random() * 80,
      })
    }, 1500)

    let animId: number
    let time = 0

    function draw() {
      time++
      ctx!.clearRect(0, 0, w, h)

      // 画星星
      for (const star of stars) {
        const flicker = Math.sin(time * star.twinkleSpeed + star.twinklePhase)
        const alpha = star.alpha * (0.5 + 0.5 * flicker)
        ctx!.beginPath()
        ctx!.arc(star.x, star.y, star.r, 0, Math.PI * 2)
        ctx!.fillStyle = star.color + alpha.toFixed(2) + ')'
        ctx!.fill()

        // 大星加辉光
        if (star.r > 2) {
          ctx!.beginPath()
          ctx!.arc(star.x, star.y, star.r * 3, 0, Math.PI * 2)
          const glow = ctx!.createRadialGradient(star.x, star.y, 0, star.x, star.y, star.r * 3)
          glow.addColorStop(0, star.color + (alpha * 0.4).toFixed(2) + ')')
          glow.addColorStop(1, 'rgba(0,0,0,0)')
          ctx!.fillStyle = glow
          ctx!.fill()
        }
      }

      // 画流星
      for (let i = meteors.length - 1; i >= 0; i--) {
        const m = meteors[i]
        m.x += m.vx
        m.y += m.vy
        m.life++

        const progress = m.life / m.maxLife
        const tailLen = 80

        ctx!.beginPath()
        const tailX = m.x - m.vx * (tailLen / 8)
        const tailY = m.y - m.vy * (tailLen / 8)
        const grad = ctx!.createLinearGradient(m.x, m.y, tailX, tailY)
        grad.addColorStop(0, `rgba(255,255,255,${0.9 * (1 - progress)})`)
        grad.addColorStop(1, 'rgba(255,255,255,0)')
        ctx!.strokeStyle = grad
        ctx!.lineWidth = 1.5
        ctx!.moveTo(m.x, m.y)
        ctx!.lineTo(tailX, tailY)
        ctx!.stroke()

        if (m.life >= m.maxLife) meteors.splice(i, 1)
      }

      animId = requestAnimationFrame(draw)
    }

    draw()

    const onResize = () => {
      w = window.innerWidth
      h = window.innerHeight
      canvas.width = w
      canvas.height = h
    }
    window.addEventListener('resize', onResize)

    return () => {
      cancelAnimationFrame(animId)
      clearInterval(meteorInterval)
      window.removeEventListener('resize', onResize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 pointer-events-none z-0"
      style={{ background: 'linear-gradient(to bottom, #020817, #060e1f, #0a1428)' }}
    />
  )
}
