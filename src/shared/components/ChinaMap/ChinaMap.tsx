/**
 * 中国地图 SVG — 简笔轮廓 + 动态闪烁城市热点
 *
 * 使用纯 SVG 实现，零外部依赖，ECharts 的地图 GeoJSON 太重。
 * 城市点根据 activity 分级：hot → 大圈快闪，warm → 中圈，cool → 小圈慢闪。
 */

import { AnimatedCard } from '@shared/components/AnimatedCard'

interface CityDot {
  name: string
  cx: number
  cy: number
  activity: 'hot' | 'warm' | 'cool'
  value: number
  unit: string
}

const cities: CityDot[] = [
  { name: '北京', cx: 420, cy: 126, activity: 'hot', value: 5280, unit: '万' },
  { name: '上海', cx: 466, cy: 218, activity: 'hot', value: 6840, unit: '万' },
  { name: '广州', cx: 386, cy: 330, activity: 'hot', value: 4120, unit: '万' },
  { name: '深圳', cx: 402, cy: 348, activity: 'warm', value: 3750, unit: '万' },
  { name: '成都', cx: 256, cy: 242, activity: 'warm', value: 2980, unit: '万' },
  { name: '杭州', cx: 452, cy: 204, activity: 'warm', value: 2650, unit: '万' },
  { name: '武汉', cx: 378, cy: 242, activity: 'warm', value: 2180, unit: '万' },
  { name: '西安', cx: 312, cy: 182, activity: 'cool', value: 1560, unit: '万' },
  { name: '重庆', cx: 286, cy: 266, activity: 'cool', value: 1820, unit: '万' },
  { name: '南京', cx: 438, cy: 196, activity: 'cool', value: 1950, unit: '万' },
]

const activityConfig = {
  hot: { dot: '#f59e0b', ripple: 'rgba(245,158,11,0.5)', delay: '0s', size: 6, rippleSize: 24 },
  warm: { dot: '#22d3ee', ripple: 'rgba(34,211,238,0.45)', delay: '0.6s', size: 4.5, rippleSize: 18 },
  cool: { dot: '#a78bfa', ripple: 'rgba(167,139,250,0.4)', delay: '1.2s', size: 3.5, rippleSize: 14 },
}

function CityMarker({ city }: { city: CityDot }) {
  const cfg = activityConfig[city.activity]

  return (
    <g className="group cursor-pointer">
      {/* 波纹扩散环 */}
      <circle
        cx={city.cx} cy={city.cy} r={cfg.size}
        fill={cfg.dot}
        opacity="0"
        style={{ animation: `mapRipple 2.4s ease-out ${cfg.delay} infinite` }}
      >
        <animate attributeName="r" values={`${cfg.size};${cfg.rippleSize}`} dur="2.4s" begin={cfg.delay} repeatCount="indefinite" />
        <animate attributeName="opacity" values="0.9;0" dur="2.4s" begin={cfg.delay} repeatCount="indefinite" />
      </circle>

      {/* 核心光点 */}
      <circle cx={city.cx} cy={city.cy} r={cfg.size} fill={cfg.dot}>
        <animate attributeName="r" values={`${cfg.size};${cfg.size * 1.6};${cfg.size}`} dur="1.6s" begin={cfg.delay} repeatCount="indefinite" />
        <animate attributeName="opacity" values="1;0.5;1" dur="1.6s" begin={cfg.delay} repeatCount="indefinite" />
      </circle>

      {/* 光晕 */}
      <circle cx={city.cx} cy={city.cy} r={cfg.size * 2.5} fill={cfg.dot} opacity="0.12">
        <animate attributeName="r" values={`${cfg.size * 2};${cfg.size * 4};${cfg.size * 2}`} dur="2s" begin={cfg.delay} repeatCount="indefinite" />
      </circle>

      {/* 城市名 + 数值 tooltip */}
      <g className="opacity-0 group-hover:opacity-100 transition-opacity duration-200">
        <rect
          x={city.cx - 36} y={city.cy - 36}
          width="72" height="22"
          rx="4" fill="rgba(15,23,42,0.95)" stroke="#334155" strokeWidth="0.5"
        />
        <text x={city.cx} y={city.cy - 22} textAnchor="middle" fill="#e2e8f0" fontSize="10" fontWeight="600">
          {city.name} · {city.value}{city.unit}
        </text>
      </g>
    </g>
  )
}

/** 简化的中国地图轮廓路径 */
function ChinaOutline() {
  return (
    <path
      d="M396,98 L420,88 L468,94 L492,104 L498,96 L526,88 L546,86 L568,98
         L582,112 L598,128 L610,148 L606,168 L590,176 L568,168 L546,156
         L528,148 L512,152 L496,158 L482,172 L466,182 L462,206 L472,234
         L466,258 L472,280 L462,296 L448,316 L436,336 L418,352 L402,364
         L386,366 L368,358 L350,346 L334,336 L318,326 L302,324 L286,316
         L268,304 L254,288 L242,270 L230,250 L224,232 L228,214 L240,198
         L254,186 L270,176 L288,166 L304,156 L318,146 L334,136 L346,126
         L358,116 L376,106 L386,100 Z"
      fill="none"
      stroke="#334155"
      strokeWidth="1"
      strokeLinejoin="round"
      opacity="0.5"
    />
  )
}

/** 装饰性省份连线 */
function ConnectionLines() {
  const lines = [
    { x1: 420, y1: 126, x2: 466, y2: 218 },
    { x1: 466, y1: 218, x2: 386, y2: 330 },
    { x1: 386, y1: 330, x2: 402, y2: 348 },
    { x1: 466, y1: 218, x2: 452, y2: 204 },
    { x1: 420, y1: 126, x2: 312, y2: 182 },
    { x1: 312, y1: 182, x2: 256, y2: 242 },
    { x1: 256, y1: 242, x2: 286, y2: 266 },
    { x1: 256, y1: 242, x2: 378, y2: 242 },
    { x1: 378, y1: 242, x2: 466, y2: 218 },
  ]

  return (
    <g>
      {lines.map((l, i) => (
        <line
          key={i}
          x1={l.x1} y1={l.y1} x2={l.x2} y2={l.y2}
          stroke="#1e293b"
          strokeWidth="1"
          strokeDasharray="3 3"
          opacity="0.4"
        >
          <animate attributeName="opacity" values="0.3;0.6;0.3" dur="3s" begin={`${i * 0.3}s`} repeatCount="indefinite" />
        </line>
      ))}
    </g>
  )
}

export function ChinaMap() {
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

      <svg viewBox="200 70 430 330" className="w-full" style={{ maxHeight: 340 }}>
        {/* 背景网格 */}
        <defs>
          <pattern id="mapGrid" width="30" height="30" patternUnits="userSpaceOnUse">
            <circle cx="15" cy="15" r="0.5" fill="#1e293b" />
          </pattern>
        </defs>
        <rect x="200" y="70" width="430" height="330" fill="url(#mapGrid)" opacity="0.5" />

        {/* 地图轮廓 */}
        <ChinaOutline />

        {/* 省份连线 */}
        <ConnectionLines />

        {/* 城市热点 */}
        {cities.map(c => (
          <CityMarker key={c.name} city={c} />
        ))}

        {/* 南海诸岛示意框 */}
        <rect x="420" y="360" width="56" height="40" rx="3" fill="none" stroke="#1e293b" strokeWidth="0.8" strokeDasharray="2 2" />
        <text x="448" y="385" textAnchor="middle" fill="#475569" fontSize="8">南海诸岛</text>
      </svg>
    </AnimatedCard>
  )
}
