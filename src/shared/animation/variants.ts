/**
 * 动画变体定义
 *
 * 统一管理入场/离场动效参数，各组件引用同一套定义保持视觉一致。
 */

/** 卡片交错入场 — 从上到下逐张飞入 */
export const staggerSlideUp = {
  container: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: { staggerChildren: 0.08, delayChildren: 0.05 },
    },
  },
  item: {
    hidden: { opacity: 0, y: 24 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: 'spring', stiffness: 260, damping: 24 },
    },
  },
}

/** 从左滑入 */
export const slideInLeft = {
  hidden: { opacity: 0, x: -40 },
  show: {
    opacity: 1,
    x: 0,
    transition: { type: 'spring', stiffness: 200, damping: 22 },
  },
}

/** 淡入放大 */
export const fadeScale = {
  hidden: { opacity: 0, scale: 0.92 },
  show: {
    opacity: 1,
    scale: 1,
    transition: { duration: 0.4, ease: 'easeOut' },
  },
}

/** 脉冲（呼吸灯效果） */
export const pulse = {
  animate: {
    scale: [1, 1.15, 1],
    opacity: [1, 0.6, 1],
    transition: { duration: 2, repeat: Infinity, ease: 'easeInOut' },
  },
}

/** 骨架屏闪烁 */
export const shimmer = {
  animate: {
    backgroundPosition: ['200% 0', '-200% 0'],
    transition: { duration: 1.8, repeat: Infinity, ease: 'linear' },
  },
}
