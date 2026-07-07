/**
 * Dashboard 模块的 MSW handlers
 * 模拟数据大屏后端接口响应
 */

import { http, HttpResponse, delay } from 'msw'
import type { DashboardData, SalesTrend, StatItem } from '@modules/dashboard/types'

// ---- Mock 数据工厂 ----

function mockStatItems(): StatItem[] {
  return [
    {
      id: 'total-sales',
      label: '总销售额',
      value: 12_865_000,
      unit: '元',
      trend: 12.5,
      icon: 'sales',
    },
    {
      id: 'total-orders',
      label: '总订单数',
      value: 8842,
      unit: '单',
      trend: 8.3,
      icon: 'orders',
    },
    {
      id: 'active-users',
      label: '活跃用户',
      value: 36721,
      unit: '人',
      trend: -3.1,
      icon: 'users',
    },
    {
      id: 'conversion',
      label: '转化率',
      value: 3.28,
      unit: '%',
      trend: 0.8,
      icon: 'conversion',
    },
  ]
}

function mockSalesTrend(): SalesTrend[] {
  const months = ['1月', '2月', '3月', '4月', '5月', '6月']
  return months.map(name => ({
    name,
    value: Math.floor(Math.random() * 5000000) + 2000000,
    target: 3500000,
  }))
}

function mockDashboardData(): DashboardData {
  return {
    stats: mockStatItems(),
    salesTrend: mockSalesTrend(),
    updatedAt: new Date().toISOString(),
  }
}

// ---- Handlers ----

export const dashboardHandlers = [
  // GET /api/dashboard/overview
  http.get('/api/dashboard/overview', async () => {
    await delay(300) // 模拟网络延迟
    return HttpResponse.json({
      code: 0,
      message: 'ok',
      data: mockDashboardData(),
    })
  }),

  // GET /api/dashboard/stats
  http.get('/api/dashboard/stats', async () => {
    await delay(200)
    return HttpResponse.json({
      code: 0,
      message: 'ok',
      data: mockStatItems(),
    })
  }),
]
