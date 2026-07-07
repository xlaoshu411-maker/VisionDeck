/**
 * Dashboard 模块公共出口
 *
 * 只暴露外部需要使用的部分，
 * 内部实现细节（api / store / hooks）不直接暴露，
 * 由 hooks 封装后提供统一接口。
 */

export { useDashboardData } from './hooks'
export { StatCard } from './components/StatCard'
export { SalesChart } from './components/SalesChart'
export type { DashboardData, StatItem, SalesTrend } from './types'
