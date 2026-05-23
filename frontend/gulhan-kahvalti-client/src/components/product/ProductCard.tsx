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
      className="overflow-hidden rounded-lg border border-stone-200 bg-white shadow-sm transition hover:shadow-md"
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.2 }}
    >
      <Link className="block" to={`/products/${product.id}`}>
        <div className="aspect-[4/3] bg-stone-100">
          {product.imageUrl ? (
            <img
              alt={product.name}
              className="h-full w-full object-cover"
              src={product.imageUrl}
            />
          ) : (
            <div className="flex h-full items-center justify-center text-sm text-stone-500">
              Urun gorseli
            </div>
          )}
        </div>
        <div className="space-y-2 p-4">
          <p className="text-xs font-medium uppercase tracking-wide text-emerald-700">
            {product.categoryName || 'Kategori'}
          </p>
          <h2 className="line-clamp-2 text-base font-semibold text-stone-900">
            {product.name}
          </h2>
          {product.description ? (
            <p className="line-clamp-2 text-sm text-stone-600">{product.description}</p>
          ) : null}
          <div className="flex items-center justify-between pt-2">
            <span className="font-semibold text-stone-900">{formatPrice(product.price)}</span>
            <span className="text-xs text-stone-500">Stok: {product.stock}</span>
          </div>
        </div>
      </Link>
      {onAddToCart ? (
        <div className="border-t border-stone-100 p-4 pt-3">
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
