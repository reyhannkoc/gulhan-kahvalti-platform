import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import type { Product } from '../../types'
import { formatPrice } from '../../utils/formatPrice'
import { Button } from '../ui/Button'

interface ProductCardProps {
  product: Product
  onAddToCart?: (product: Product) => void
  adding?: boolean
}

export function ProductCard({ adding = false, onAddToCart, product }: ProductCardProps) {
  const outOfStock = product.stock <= 0

  return (
    <motion.article
      animate={{ opacity: 1, y: 0 }}
      className="group flex flex-col overflow-hidden rounded-3xl border border-cyan-100 bg-white shadow-card transition-shadow duration-350 dark:border-white/10 dark:bg-slate-900"
      initial={{ opacity: 0, y: 12 }}
      transition={{ duration: 0.28 }}
      whileHover={{ y: -4 }}
    >
      {/* Image */}
      <Link className="block" to={`/products/${product.id}`}>
        <div className="relative aspect-[4/3] overflow-hidden bg-brand-light dark:bg-slate-800">
          {product.imageUrl ? (
            <img
              alt={product.name}
              className="h-full w-full object-cover transition duration-450 ease-luxury group-hover:scale-105"
              src={product.imageUrl}
            />
          ) : (
            <div className="flex h-full items-center justify-center text-brand-turquoise/30 dark:text-cyan-400/20">
              <FoodPlaceholderIcon />
            </div>
          )}

          {/* Category chip — floated over image */}
          {product.categoryName ? (
            <span className="absolute left-3 top-3 rounded-full bg-white/90 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-brand-turquoise shadow-sm backdrop-blur-sm dark:bg-slate-900/90 dark:text-cyan-300">
              {product.categoryName}
            </span>
          ) : null}

          {/* Out-of-stock overlay */}
          {outOfStock ? (
            <div className="absolute inset-0 flex items-center justify-center bg-slate-950/55">
              <span className="rounded-full bg-white/92 px-3 py-1 text-xs font-bold text-slate-700">
                Stok Yok
              </span>
            </div>
          ) : null}
        </div>

        {/* Content */}
        <div className="flex flex-col gap-1.5 p-4 pb-3">
          <h2 className="line-clamp-2 font-semibold text-brand-text dark:text-white">
            {product.name}
          </h2>
          {product.description ? (
            <p className="line-clamp-2 text-sm leading-relaxed text-slate-500 dark:text-slate-400">
              {product.description}
            </p>
          ) : null}
          <p className="mt-1.5 text-xl font-bold text-brand-text dark:text-white">
            {formatPrice(product.price)}
          </p>
        </div>
      </Link>

      {/* CTA */}
      {onAddToCart ? (
        <div className="mt-auto border-t border-slate-100 p-4 pt-3 dark:border-white/10">
          <Button
            disabled={adding || outOfStock}
            fullWidth
            onClick={() => onAddToCart(product)}
          >
            {outOfStock ? 'Stok yok' : adding ? 'Ekleniyor…' : 'Sepete Ekle'}
          </Button>
        </div>
      ) : null}
    </motion.article>
  )
}

function FoodPlaceholderIcon() {
  return (
    <svg
      aria-hidden="true"
      className="h-10 w-10 opacity-60"
      fill="none"
      stroke="currentColor"
      strokeWidth={1.5}
      viewBox="0 0 24 24"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 15.75l5.159-5.159a2.25 2.25 0 013.182 0l5.159 5.159m-1.5-1.5l1.409-1.409a2.25 2.25 0 013.182 0l2.909 2.909m-18 3.75h16.5a1.5 1.5 0 001.5-1.5V6a1.5 1.5 0 00-1.5-1.5H3.75A1.5 1.5 0 002.25 6v12a1.5 1.5 0 001.5 1.5zm10.5-11.25h.008v.008h-.008V8.25zm.375 0a.375.375 0 11-.75 0 .375.375 0 01.75 0z"
      />
    </svg>
  )
}
