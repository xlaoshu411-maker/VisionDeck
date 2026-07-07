import { CountUp } from '@shared/components/CountUp'
import { AnimatedCard } from '@shared/components/AnimatedCard'
import type { TopProduct } from '../../types'

interface TopProductsProps {
  products: TopProduct[]
}

function BarRow({ product, maxSales }: { product: TopProduct; maxSales: number }) {
  const width = (product.sales / maxSales) * 100
  const barColor =
    product.rank === 1
      ? 'bg-gradient-to-r from-amber-400 to-amber-500'
      : product.rank === 2
        ? 'bg-gradient-to-r from-slate-400 to-slate-500'
        : product.rank === 3
          ? 'bg-gradient-to-r from-amber-700 to-amber-800'
          : 'bg-gradient-to-r from-cyan-500 to-cyan-600'

  return (
    <li className="group">
      <div className="flex items-center justify-between mb-0.5">
        <div className="flex items-center gap-1.5">
          <span className={`text-[10px] font-bold w-4 h-4 rounded flex items-center justify-center ${product.rank <= 3 ? 'bg-slate-700 text-amber-400' : 'text-slate-500'}`}>
            {product.rank}
          </span>
          <span className="text-xs text-slate-300 group-hover:text-white transition-colors">{product.name}</span>
        </div>
        <span className="text-xs text-white font-mono-tabular">
          <CountUp end={product.revenue} duration={800} formatter={v => `¥${v.toLocaleString()}`} />
        </span>
      </div>
      <div className="h-1.5 bg-slate-800 rounded-full overflow-hidden">
        <div className={`h-full rounded-full ${barColor} animate-bar-grow`} style={{ width: `${width}%` }} />
      </div>
      <div className="flex justify-between mt-0.5">
        <span className="text-[9px] text-slate-500">{product.sales.toLocaleString()} 件</span>
        <span className={`text-[9px] ${product.growth >= 0 ? 'text-emerald-400' : 'text-red-400'}`}>
          {product.growth >= 0 ? '+' : ''}{product.growth}%
        </span>
      </div>
    </li>
  )
}

export function TopProducts({ products }: TopProductsProps) {
  const maxSales = Math.max(...products.map(p => p.sales))

  return (
    <AnimatedCard className="rounded-xl bg-slate-900/80 border border-slate-800/60 p-4">
      <h3 className="text-slate-300 text-sm font-semibold mb-3">热销排行</h3>
      <ul className="space-y-2.5">
        {products.map(p => (
          <BarRow key={p.id} product={p} maxSales={maxSales} />
        ))}
      </ul>
    </AnimatedCard>
  )
}
