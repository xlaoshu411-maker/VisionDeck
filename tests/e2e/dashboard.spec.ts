/**
 * Dashboard E2E 测试（Playwright）
 *
 * 运行：npx playwright test
 *
 * 注意：首次运行前需要安装浏览器：
 *   npx playwright install
 */

import { test, expect } from '@playwright/test'

test.describe('Dashboard Page', () => {
  test('should display the app title', async ({ page }) => {
    await page.goto('/')
    await expect(page.locator('h1')).toContainText('VisionDeck')
  })

  test('should render stat cards after loading', async ({ page }) => {
    await page.goto('/dashboard')

    // 等待数据加载完成（MSW 有 300ms 延迟）
    await page.waitForTimeout(500)

    const cards = page.locator('.grid > div')
    const count = await cards.count()
    expect(count).toBeGreaterThanOrEqual(3)
  })

  test('should render the sales chart', async ({ page }) => {
    await page.goto('/dashboard')
    await page.waitForTimeout(500)

    // ECharts 渲染到 canvas
    const canvas = page.locator('canvas')
    await expect(canvas.first()).toBeVisible()
  })
})
