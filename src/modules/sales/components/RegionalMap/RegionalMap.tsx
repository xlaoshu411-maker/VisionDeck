/**
 * 区域销售分布 — 简易热力柱状图
 */
import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'
import { AnimatedCard } from '@shared/components/AnimatedCard'

const regions = [
  { name: '华东', value: 38 },
  { name: '华南', value: 24 },
  { name: '华北', value: 18 },
  { name: '西南', value: 10 },
  { name: '华中', value: 6 },
  { name: '西北', value: 3 },
  { name: '东北', value: 1 },
]

export function RegionalMap({ height = 280 }: { height?: number }) {
  const chartRef = useRef<HTMLDivElement>(null)
  const instanceRef = useRef<echarts.ECharts | null>(null)

  useEffect(() => {
    if (!chartRef.current) return
    if (!instanceRef.current) instanceRef.current = echarts.init(chartRef.current)

    instanceRef.current.setOption({
      tooltip: { trigger: 'axis', axisPointer: { type: 'shadow' } },
      grid: { left: '12%', right: '8%', top: '5%', bottom: '5%', containLabel: true },
      xAxis: {
        type: 'value',
        axisLabel: { color: '#94a3b8', formatter: '{value}%' },
        splitLine: { lineStyle: { color: '#1e293b' } },
        max: 50,
      },
      yAxis: {
        type: 'category',
        data: regions.map(r => r.name).reverse(),
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { color: '#94a3b8', fontSize: 12 },
      },
      series: [{
        type: 'bar',
        data: regions.map(r => ({
          value: r.value,
          itemStyle: {
            borderRadius: [0, 6, 6, 0],
            color: new echarts.graphic.LinearGradient(0, 0, 1, 0, [
              { offset: 0, color: '#22d3ee33' },
              { offset: 1, color: '#22d3ee' },
            ]),
          },
        })).reverse(),
        barWidth: 16,
        label: { show: true, position: 'right', color: '#94a3b8', fontSize: 11, formatter: '{c}%' },
      }],
    })

    const h = () => instanceRef.current?.resize()
    window.addEventListener('resize', h)
    return () => window.removeEventListener('resize', h)
  }, [])

  useEffect(() => () => { instanceRef.current?.dispose(); instanceRef.current = null }, [])

  return (
    <AnimatedCard className="rounded-xl bg-slate-900/80 border border-slate-800/60 p-6">
      <h3 className="text-slate-300 text-base font-semibold mb-4">区域分布</h3>
      <div ref={chartRef} style={{ width: '100%', height }} />
    </AnimatedCard>
  )
}
