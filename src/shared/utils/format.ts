/**
 * 通用工具函数
 */

/**
 * 数字格式化 — 大数转缩写
 * 12865000 → "1286.5万"
 */
export function formatLargeNumber(value: number, decimals = 1): string {
  if (value >= 100_000_000) {
    return `${(value / 100_000_000).toFixed(decimals)}亿`
  }
  if (value >= 10_000) {
    return `${(value / 10_000).toFixed(decimals)}万`
  }
  return value.toLocaleString('zh-CN')
}

/**
 * 百分比格式化
 * 0.0328 → "+3.28%"
 * -0.05 → "-5.00%"
 */
export function formatPercent(value: number, decimals = 2): string {
  const sign = value >= 0 ? '+' : ''
  return `${sign}${(value).toFixed(decimals)}%`
}

/**
 * 趋势方向
 */
export function trendDirection(value: number): 'up' | 'down' | 'flat' {
  if (value > 0) return 'up'
  if (value < 0) return 'down'
  return 'flat'
}

/**
 * 货币格式化（人民币）
 */
export function formatCurrency(value: number): string {
  return `¥${value.toLocaleString('zh-CN')}`
}

/**
 * 延迟 Promise（用于 mock 测试）
 */
export function sleep(ms: number): Promise<void> {
  return new Promise(resolve => setTimeout(resolve, ms))
}
