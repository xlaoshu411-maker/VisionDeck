/**
 * Dashboard 模块类型定义
 */

/** 指标卡片 */
export interface StatItem {
  id: string
  label: string
  value: number
  unit: string
  trend: number
  icon?: string
}

/** 销售趋势数据点 */
export interface SalesTrend {
  name: string
  value: number
  target: number
}

/** Dashboard 完整数据 */
export interface DashboardData {
  stats: StatItem[]
  salesTrend: SalesTrend[]
  updatedAt: string
}
