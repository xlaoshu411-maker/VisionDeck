/** Sales 模块类型 */

export interface SalesFunnelStage {
  name: string
  value: number
  rate: number // 转化率 %
}

export interface TopProduct {
  id: string
  name: string
  sales: number
  revenue: number
  growth: number
  rank: number
}

export interface SalesOverview {
  totalRevenue: number
  totalOrders: number
  avgOrderValue: number
  growth: number
  funnel: SalesFunnelStage[]
  topProducts: TopProduct[]
  updatedAt: string
}
