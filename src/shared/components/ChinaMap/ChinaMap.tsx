/**
 * 中国地图 — ECharts map + 动态闪烁城市热点
 *
 * 需要 China GeoJSON 注册，静态导入 public/china.json
 */

import { useEffect, useRef, useState } from 'react'
import * as echarts from 'echarts'
import { AnimatedCard } from '@shared/components/AnimatedCard'

interface CityPoint {
  name: string
  value: [number, number, number] // [lng, lat, sales]
  region: 'hot' | 'warm' | 'cool'
}

const cities: CityPoint[] = [
  { name: '北京', value: [116.46, 39.92, 5280], region: 'hot' },
  { name: '上海', value: [121.48, 31.22, 6840], region: 'hot' },
  { name: '广州', value: [113.23, 23.16, 4120], region: 'hot' },
  { name: '深圳', value: [114.07, 22.62, 3750], region: 'warm' },
  { name: '成都', value: [104.06, 30.67, 2980], region: 'warm' },
  { name: '杭州', value: [120.19, 30.26, 2650], region: 'warm' },
  { name: '武汉', value: [114.31, 30.52, 2180], region: 'warm' },
  { name: '西安', value: [108.95, 34.27, 1560], region: 'cool' },
  { name: '重庆', value: [106.54, 29.59, 1820], region: 'cool' },
  { name: '南京', value: [118.78, 32.04, 1950], region: 'cool' },
  { name: '郑州', value: [113.65, 34.76, 1430], region: 'cool' },
  { name: '长沙', value: [112.98, 28.19, 1680], region: 'cool' },
]

export function ChinaMap() {
  const chartRef = useRef<HTMLDivElement>(null)
  const instanceRef = useRef<echarts.ECharts | null>(null)
  const [ready, setReady] = useState(false)
  const hasGeoRef = useRef(false)

  useEffect(() => {
    // 优先 DataV CDN（标准省份地图），降级到本地精简版
    const urls = [
      'https://geo.datav.aliyun.com/areas_v3/bound/100000_full.json',
      '/china.json',
    ]
    async function loadGeo() {
      for (const url of urls) {
        try {
          const res = await fetch(url)
          if (!res.ok) throw new Error(`HTTP ${res.status}`)
          const geo = await res.json()
          echarts.registerMap('china', geo as never)
          hasGeoRef.current = true
          return
        } catch { /* try next */ }
      }
      console.warn('[ChinaMap] All GeoJSON sources failed')
      hasGeoRef.current = false
    }
    loadGeo().finally(() => setReady(true))
  }, [])

  useEffect(() => {
    if (!ready || !chartRef.current) return
    if (!instanceRef.current) {
      instanceRef.current = echarts.init(chartRef.current)
    }

    const chart = instanceRef.current
    const hasGeo = hasGeoRef.current

    const option: echarts.EChartsOption = {
      backgroundColor: 'transparent',
      tooltip: {
        trigger: 'item',
        backgroundColor: 'rgba(15,23,42,0.95)',
        borderColor: '#334155',
        textStyle: { color: '#e2e8f0', fontSize: 12 },
        formatter: (p: unknown) => {
          const params = p as { name?: string; value?: number[] }
          if (!params.value || !Array.isArray(params.value)) return params.name ?? ''
          return `${params.name}<br/>销售额: <b>${params.value[2]}万</b>`
        },
      },
      geo: hasGeo ? {
        map: 'china',
        roam: false,
        zoom: 1.2,
        center: [105, 36],
        itemStyle: {
          areaColor: '#0f172a',
          borderColor: '#1e3a5f',
          borderWidth: 1,
          shadowColor: 'rgba(34,211,238,0.06)',
          shadowBlur: 6,
        },
        emphasis: { disabled: true },
        label: { show: false },
      } : undefined,
      series: [
        {
          type: 'effectScatter',
          coordinateSystem: 'geo',
          data: cities.map(c => ({
            name: c.name,
            value: c.value,
            itemStyle: {
              color: c.region === 'hot' ? '#f59e0b' : c.region === 'warm' ? '#22d3ee' : '#a78bfa',
            },
          })),
          symbolSize: (val: number[]) => Math.sqrt(val[2]) / 10 + 5,
          showEffectOn: 'render',
          rippleEffect: { brushType: 'stroke', scale: 3.5, period: 4.5 },
          label: {
            show: true,
            formatter: '{b}',
            position: 'right',
            color: '#94a3b8',
            fontSize: 10,
            distance: 5,
          },
        },
        {
          type: 'lines',
          coordinateSystem: 'geo',
          data: [
            { coords: [[116.46, 39.92], [121.48, 31.22]] },
            { coords: [[121.48, 31.22], [113.23, 23.16]] },
            { coords: [[116.46, 39.92], [104.06, 30.67]] },
            { coords: [[121.48, 31.22], [114.31, 30.52]] },
            { coords: [[113.23, 23.16], [120.19, 30.26]] },
          ],
          lineStyle: { color: '#1e3a5f', width: 1, type: 'dashed' as const, opacity: 0.5 },
          effect: { show: true, period: 6, trailLength: 0.3, symbol: 'circle', symbolSize: 3, color: '#22d3ee' },
        },
      ],
    }

    chart.setOption(option)
    const h = () => chart.resize()
    window.addEventListener('resize', h)
    return () => window.removeEventListener('resize', h)
  }, [ready])

  useEffect(() => () => {
    instanceRef.current?.dispose()
    instanceRef.current = null
  }, [])

  return (
    <AnimatedCard className="rounded-xl bg-slate-900/80 border border-slate-800/60 p-4 relative overflow-hidden">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-slate-300 text-sm font-semibold">区域销售分布</h3>
        <div className="flex items-center gap-3 text-[10px] text-slate-500">
          <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-amber-400 animate-pulse-glow" /> 热门</span>
          <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-cyan-400" /> 增长</span>
          <span className="flex items-center gap-1"><span className="w-1.5 h-1.5 rounded-full bg-violet-400" /> 潜力</span>
        </div>
      </div>

      {ready ? (
        <div ref={chartRef} style={{ width: '100%', height: 400 }} />
      ) : (
        <div className="flex items-center justify-center h-[400px]">
          <div className="w-6 h-6 border-2 border-cyan-500/30 border-t-cyan-400 rounded-full animate-spin" />
        </div>
      )}
    </AnimatedCard>
  )
}
