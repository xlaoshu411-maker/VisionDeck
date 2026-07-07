import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'
import type { SalesTrend } from '../../types'

interface SalesChartProps {
  data: SalesTrend[]
  height?: number
}

export function SalesChart({ data, height = 360 }: SalesChartProps) {
  const chartRef = useRef<HTMLDivElement>(null)
  const instanceRef = useRef<echarts.ECharts | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    // 初始化
    if (!instanceRef.current) {
      instanceRef.current = echarts.init(chartRef.current, undefined, {
        devicePixelRatio: window.devicePixelRatio,
      })
    }

    // 更新配置
    instanceRef.current.setOption({
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(15, 23, 42, 0.92)',
        borderColor: '#334155',
        textStyle: { color: '#e2e8f0', fontSize: 13 },
      },
      legend: {
        data: ['实际销售额', '目标销售额'],
        bottom: 0,
        textStyle: { color: '#94a3b8' },
      },
      grid: {
        left: '3%',
        right: '4%',
        top: '8%',
        bottom: '14%',
        containLabel: true,
      },
      xAxis: {
        type: 'category',
        data: data.map(d => d.name),
        axisLine: { lineStyle: { color: '#334155' } },
        axisLabel: { color: '#94a3b8' },
      },
      yAxis: {
        type: 'value',
        axisLabel: {
          color: '#94a3b8',
          formatter: (v: number) => `${(v / 10000).toFixed(0)}万`,
        },
        splitLine: { lineStyle: { color: '#1e293b' } },
      },
      series: [
        {
          name: '实际销售额',
          type: 'bar',
          data: data.map(d => d.value),
          itemStyle: {
            borderRadius: [4, 4, 0, 0],
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: '#22d3ee' },
              { offset: 1, color: '#0891b2' },
            ]),
          },
          barWidth: '40%',
          animationDelay: (idx: number) => idx * 50,
        },
        {
          name: '目标销售额',
          type: 'line',
          data: data.map(d => d.target),
          symbol: 'circle',
          symbolSize: 6,
          lineStyle: { color: '#f59e0b', width: 2, type: 'dashed' },
          itemStyle: { color: '#f59e0b' },
        },
      ],
    })

    // 响应式
    const handleResize = () => instanceRef.current?.resize()
    window.addEventListener('resize', handleResize)

    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [data])

  // 组件卸载时销毁实例
  useEffect(() => {
    return () => {
      instanceRef.current?.dispose()
      instanceRef.current = null
    }
  }, [])

  return (
    <div className="rounded-xl bg-white/[0.04] backdrop-blur-xl border border-white/[0.06] p-6">
      <h3 className="text-slate-300 text-base font-semibold mb-4">销售趋势</h3>
      <div ref={chartRef} style={{ width: '100%', height }} />
    </div>
  )
}
