/**
 * 全局通用类型定义
 */

/** 指标卡片数据 */
export interface MetricCard {
  id: string
  label: string
  value: number
  unit: string
  trend: number // 正数为上升，负数为下降
  icon?: string
}

/** 图表数据点 */
export interface ChartDataPoint {
  name: string
  value: number
  [key: string]: unknown
}

/** 异步数据状态 */
export type AsyncState<T> =
  | { status: 'idle' }
  | { status: 'loading' }
  | { status: 'success'; data: T }
  | { status: 'error'; error: string }

/** 分页参数 */
export interface PaginationParams {
  page: number
  pageSize: number
}

/** 分页响应 */
export interface PaginatedResponse<T> {
  items: T[]
  total: number
  page: number
  pageSize: number
}
