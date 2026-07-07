import { useEffect, useRef } from 'react'
import * as echarts from 'echarts'
import type { SalesFunnelStage } from '../../types'
import { AnimatedCard } from '@shared/components/AnimatedCard'

interface SalesFunnelProps {
  data: SalesFunnelStage[]
  height?: number
}

export function SalesFunnel({ data, height = 320 }: SalesFunnelProps) {
  const chartRef = useRef<HTMLDivElement>(null)
  const instanceRef = useRef<echarts.ECharts | null>(null)

  useEffect(() => {
    if (!chartRef.current) return

    if (!instanceRef.current) {
      instanceRef.current = echarts.init(chartRef.current)
    }

    instanceRef.current.setOption({
      tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(15, 23, 42, 0.92)',
        borderColor: '#334155',
        textStyle: { color: '#e2e8f0', fontSize: 13 },
        formatter: (p: { name: string; value: number; percent: number }) =>
          `${p.name}<br/>${p.value.toLocaleString()} <span style="color:#94a3b8">(${p.percent}%)</span>`,
      },
      series: [
        {
          type: 'funnel',
          left: '15%',
          right: '15%',
          top: 20,
          bottom: 20,
          width: '70%',
          minSize: '20%',
          maxSize: '100%',
          sort: 'descending',
          gap: 3,
          label: {
            show: true,
            position: 'inside',
            formatter: '{b}',
            color: '#fff',
            fontSize: 13,
          },
          labelLine: { show: false },
          data: data.map(d => ({
            name: d.name,
            value: d.value,
          })),
          itemStyle: {
            borderColor: '#1e293b',
            borderWidth: 1,
            borderJoin: 'round',
          },
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowColor: 'rgba(34, 211, 238, 0.3)',
            },
          },
        },
      ],
    })

    const handleResize = () => instanceRef.current?.resize()
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [data])

  useEffect(() => {
    return () => {
      instanceRef.current?.dispose()
      instanceRef.current = null
    }
  }, [])

  return (
    <AnimatedCard className="rounded-xl bg-white/[0.04] backdrop-blur-xl border border-white/[0.06] p-6">
      <h3 className="text-slate-300 text-base font-semibold mb-4">销售漏斗</h3>
      <div ref={chartRef} style={{ width: '100%', height }} />
    </AnimatedCard>
  )
}
