/**
 * 收入趋势 — 区域面积图
 */
import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'
import { AnimatedCard } from '@shared/components/AnimatedCard'

const months = ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月']
const thisYear = [210, 245, 280, 310, 295, 360, 390, 420, 400, 450, 480, 520]
const lastYear = [180, 200, 230, 260, 240, 290, 310, 340, 330, 370, 390, 410]

export function RevenueTrend({ height = 340 }: { height?: number }) {
  const chartRef = useRef<HTMLDivElement>(null)
  const instanceRef = useRef<echarts.ECharts | null>(null)

  useEffect(() => {
    if (!chartRef.current) return
    if (!instanceRef.current) instanceRef.current = echarts.init(chartRef.current)

    instanceRef.current.setOption({
      tooltip: {
        trigger: 'axis',
        backgroundColor: 'rgba(15, 23, 42, 0.92)',
        borderColor: '#334155',
        textStyle: { color: '#e2e8f0', fontSize: 13 },
        formatter: (params: { seriesName: string; value: number; color: string }[]) =>
          params.map(p =>
            `<span style="color:${p.color}">●</span> ${p.seriesName}: <b>¥${p.value}万</b>`
          ).join('<br/>'),
      },
      legend: {
        data: ['今年', '去年'],
        bottom: 0,
        textStyle: { color: '#94a3b8', fontSize: 12 },
      },
      grid: { left: '3%', right: '4%', top: '5%', bottom: '14%', containLabel: true },
      xAxis: {
        type: 'category',
        data: months,
        axisLine: { lineStyle: { color: '#334155' } },
        axisLabel: { color: '#94a3b8', fontSize: 11 },
      },
      yAxis: {
        type: 'value',
        axisLabel: { color: '#94a3b8', formatter: '{value}万' },
        splitLine: { lineStyle: { color: '#1e293b' } },
      },
      series: [
        {
          name: '今年',
          type: 'line',
          data: thisYear,
          smooth: true,
          symbol: 'circle',
          symbolSize: 4,
          lineStyle: { color: '#22d3ee', width: 2.5 },
          itemStyle: { color: '#22d3ee' },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(34,211,238,0.2)' },
              { offset: 1, color: 'rgba(34,211,238,0.01)' },
            ]),
          },
        },
        {
          name: '去年',
          type: 'line',
          data: lastYear,
          smooth: true,
          symbol: 'diamond',
          symbolSize: 4,
          lineStyle: { color: '#a78bfa', width: 2, type: 'dashed', dashOffset: 2 },
          itemStyle: { color: '#a78bfa' },
          areaStyle: {
            color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
              { offset: 0, color: 'rgba(167,139,250,0.12)' },
              { offset: 1, color: 'rgba(167,139,250,0)' },
            ]),
          },
        },
      ],
    })

    const h = () => instanceRef.current?.resize()
    window.addEventListener('resize', h)
    return () => window.removeEventListener('resize', h)
  }, [])

  useEffect(() => () => { instanceRef.current?.dispose(); instanceRef.current = null }, [])

  return (
    <AnimatedCard className="rounded-xl bg-white/10 backdrop-blur-2xl border border-white/15 p-6 lg:col-span-3">
      <h3 className="text-slate-300 text-base font-semibold mb-4">收入趋势（今年 vs 去年）</h3>
      <div ref={chartRef} style={{ width: '100%', height }} />
    </AnimatedCard>
  )
}
