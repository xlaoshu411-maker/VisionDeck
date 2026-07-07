/** Monitoring 模块类型 */

export interface RealtimeMetric {
  id: string
  label: string
  value: number
  unit: string
  status: 'normal' | 'warning' | 'critical'
  changeRate: number
}

export interface AlertItem {
  id: string
  level: 'info' | 'warning' | 'error'
  message: string
  source: string
  timestamp: string
  acknowledged: boolean
}

export interface MonitoringData {
  metrics: RealtimeMetric[]
  alerts: AlertItem[]
  serverStatus: 'online' | 'degraded' | 'offline'
  uptime: number // 小时
  updatedAt: string
}
