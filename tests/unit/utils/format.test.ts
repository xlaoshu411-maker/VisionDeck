import { describe, it, expect } from 'vitest'
import { formatLargeNumber, formatPercent, formatCurrency, trendDirection } from '@shared/utils'

describe('formatLargeNumber', () => {
  it('should format numbers below 10k as-is', () => {
    expect(formatLargeNumber(500)).toBe('500')
  })

  it('should format numbers >= 10k as 万', () => {
    expect(formatLargeNumber(12_865_000, 1)).toBe('1286.5万')
  })

  it('should format numbers >= 100M as 亿', () => {
    expect(formatLargeNumber(150_000_000, 1)).toBe('1.5亿')
  })
})

describe('formatPercent', () => {
  it('should prepend + for positive values', () => {
    expect(formatPercent(12.5)).toBe('+12.50%')
  })

  it('should prepend - for negative values', () => {
    expect(formatPercent(-3.1)).toBe('-3.10%')
  })
})

describe('formatCurrency', () => {
  it('should prefix with ¥', () => {
    expect(formatCurrency(1000)).toBe('¥1,000')
  })
})

describe('trendDirection', () => {
  it('should return up for positive', () => {
    expect(trendDirection(5)).toBe('up')
  })

  it('should return down for negative', () => {
    expect(trendDirection(-3)).toBe('down')
  })

  it('should return flat for zero', () => {
    expect(trendDirection(0)).toBe('flat')
  })
})
