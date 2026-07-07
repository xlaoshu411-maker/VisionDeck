import { http, HttpResponse, delay } from 'msw'
import type { SalesOverview, SalesFunnelStage, TopProduct } from '@modules/sales/types'

function mockFunnel(): SalesFunnelStage[] {
  return [
    { name: '曝光', value: 285000, rate: 100 },
    { name: '点击', value: 124000, rate: 43.5 },
    { name: '加购', value: 38600, rate: 31.1 },
    { name: '下单', value: 14200, rate: 36.8 },
    { name: '支付', value: 8842, rate: 62.3 },
  ]
}

function mockTopProducts(): TopProduct[] {
  return [
    { id: 'p1', name: '企业级数据大屏解决方案', sales: 286, revenue: 8580000, growth: 23.5, rank: 1 },
    { id: 'p2', name: '智能运维监控平台', sales: 241, revenue: 6025000, growth: 18.2, rank: 2 },
    { id: 'p3', name: '用户行为分析系统', sales: 198, revenue: 3960000, growth: -5.8, rank: 3 },
    { id: 'p4', name: '实时数据流处理引擎', sales: 165, revenue: 2475000, growth: 42.1, rank: 4 },
    { id: 'p5', name: '可视化报表设计器', sales: 132, revenue: 1980000, growth: 8.7, rank: 5 },
  ]
}

function mockSalesOverview(): SalesOverview {
  return {
    totalRevenue: 23_020_000,
    totalOrders: 8842,
    avgOrderValue: 2602.8,
    growth: 15.3,
    funnel: mockFunnel(),
    topProducts: mockTopProducts(),
    updatedAt: new Date().toISOString(),
  }
}

export const salesHandlers = [
  http.get('/api/sales/overview', async () => {
    await delay(350)
    return HttpResponse.json({ code: 0, message: 'ok', data: mockSalesOverview() })
  }),
]
