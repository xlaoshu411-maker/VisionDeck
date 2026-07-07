import { http, HttpResponse, delay } from 'msw'
import type { MonitoringData, RealtimeMetric, AlertItem } from '@modules/monitoring/types'

function mockMetrics(): RealtimeMetric[] {
  return [
    { id: 'cpu', label: 'CPU 使用率', value: 42.7, unit: '%', status: 'normal', changeRate: -2.1 },
    { id: 'memory', label: '内存使用率', value: 68.3, unit: '%', status: 'normal', changeRate: 5.2 },
    { id: 'disk', label: '磁盘 IO', value: 231, unit: 'MB/s', status: 'warning', changeRate: 15.8 },
    { id: 'network', label: '网络吞吐', value: 856, unit: 'Mbps', status: 'normal', changeRate: 3.4 },
  ]
}

function mockAlerts(): AlertItem[] {
  return [
    {
      id: 'a1',
      level: 'warning',
      message: '磁盘使用率超过 85%，建议扩容',
      source: 'server-03',
      timestamp: new Date(Date.now() - 1000 * 60 * 5).toISOString(),
      acknowledged: false,
    },
    {
      id: 'a2',
      level: 'info',
      message: '服务 health-check 连续 3 次超时（已恢复）',
      source: 'gateway-01',
      timestamp: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
      acknowledged: true,
    },
    {
      id: 'a3',
      level: 'error',
      message: '数据库连接池耗尽，当前排队请求: 47',
      source: 'db-master',
      timestamp: new Date(Date.now() - 1000 * 60 * 2).toISOString(),
      acknowledged: false,
    },
    {
      id: 'a4',
      level: 'warning',
      message: 'Redis 内存使用率达到 78%',
      source: 'cache-02',
      timestamp: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
      acknowledged: false,
    },
  ]
}

function mockMonitoringData(): MonitoringData {
  return {
    metrics: mockMetrics(),
    alerts: mockAlerts(),
    serverStatus: 'online',
    uptime: 712,
    updatedAt: new Date().toISOString(),
  }
}

export const monitoringHandlers = [
  http.get('/api/monitoring/overview', async () => {
    await delay(400)
    return HttpResponse.json({ code: 0, message: 'ok', data: mockMonitoringData() })
  }),

  http.get('/api/monitoring/metrics', async () => {
    await delay(200)
    return HttpResponse.json({ code: 0, message: 'ok', data: mockMetrics() })
  }),
]
