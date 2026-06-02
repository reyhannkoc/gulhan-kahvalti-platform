import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { Button } from '../ui/Button'
import type { Product } from '../../types'
import { formatPrice } from '../../utils/formatPrice'

interface ProductCardProps {
  product: Product
  onAddToCart?: (product: Product) => void
  adding?: boolean
}

export function ProductCard({ adding = false, onAddToCart, product }: ProductCardProps) {
  return (
    <motion.article
      className="overflow-hidden rounded-2xl border border-cyan-100 bg-white shadow-sm transition hover:-translate-y-0.5 hover:shadow-brand dark:border-white/10 dark:bg-slate-900"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Link className="block" to={`/products/${product.id}`}>
        <div className="aspect-[4/3] bg-brand-light dark:bg-slate-800">
          {product.imageUrl ? (
            <img
              alt={product.name}
              className="h-full w-full object-cover"
              src={product.imageUrl}
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-slate-500 dark:text-slate-300">
              Ürün görseli
            </div>
          )}
        </div>
        <div className="space-y-2 p-4">
          <p className="text-xs font-bold uppercase tracking-wide text-brand-turquoise">
            {product.categoryName || 'Kategori'}
          </p>
          <h2 className="line-clamp-2 text-base font-semibold text-brand-text dark:text-white">
            {product.name}
          </h2>
          {product.description ? (
            <p className="line-clamp-2 text-sm text-slate-600 dark:text-slate-300">{product.description}</p>
          ) : null}
          <div className="flex flex-wrap items-center justify-between gap-2 pt-2">
            <span className="font-semibold text-brand-text dark:text-white">{formatPrice(product.price)}</span>
            <span className="rounded-full bg-brand-light px-2 py-1 text-xs text-cyan-800 dark:bg-cyan-400/10 dark:text-cyan-100">Stok: {product.stock}</span>
          </div>
        </div>
      </Link>
      {onAddToCart ? (
        <div className="border-t border-cyan-50 p-4 pt-3 dark:border-white/10">
          <Button
            disabled={adding || product.stock <= 0}
            fullWidth
            onClick={() => onAddToCart(product)}
          >
            {product.stock <= 0 ? 'Stok yok' : adding ? 'Ekleniyor' : 'Sepete ekle'}
          </Button>
        </div>
      ) : null}
    </motion.article>
  )
}
