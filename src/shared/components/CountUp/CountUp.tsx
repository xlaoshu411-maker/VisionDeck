import { useState, useEffect, useRef } from 'react'

interface CountUpProps {
  /** 目标值 */
  end: number
  /** 动画时长（ms） */
  duration?: number
  /** 小数位数 */
  decimals?: number
  /** 格式化函数 */
  formatter?: (value: number) => string
  /** 是否在视口内才开始 */
  triggerOnce?: boolean
  className?: string
}

/**
 * 数字滚动动画组件
 *
 * 数字从 0 平滑递增到目标值，适合 KPI 卡片。
 */
export function CountUp({
  end,
  duration = 1200,
  decimals = 0,
  formatter,
  triggerOnce = true,
  className,
}: CountUpProps) {
  const [current, setCurrent] = useState(0)
  const [hasTriggered, setHasTriggered] = useState(false)
  const ref = useRef<HTMLSpanElement>(null)
  const rafRef = useRef<number>(0)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          if (triggerOnce && hasTriggered) return
          setHasTriggered(true)
          animate()
        }
      },
      { threshold: 0.3 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [end])

  function animate() {
    const startTime = performance.now()
    const startValue = 0

    function step(now: number) {
      const elapsed = now - startTime
      const progress = Math.min(elapsed / duration, 1)
      // easeOutExpo
      const eased = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress)
      setCurrent(startValue + (end - startValue) * eased)

      if (progress < 1) {
        rafRef.current = requestAnimationFrame(step)
      }
    }

    rafRef.current = requestAnimationFrame(step)
  }

  useEffect(() => {
    return () => cancelAnimationFrame(rafRef.current)
  }, [])

  const display = formatter
    ? formatter(current)
    : current.toFixed(decimals)

  return (
    <span ref={ref} className={className}>
      {display}
    </span>
  )
}
