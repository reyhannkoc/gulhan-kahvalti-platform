import { AnimatePresence, motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import { ProductCard } from '../components/product/ProductCard'
import { EmptyState } from '../components/ui/EmptyState'
import { LoadingSpinner } from '../components/ui/LoadingSpinner'
import { useAuth } from '../hooks/useAuth'
import { getApiErrorMessage } from '../services/api'
import { cartService } from '../services/cartService'
import { productService } from '../services/productService'
import type { Product } from '../types'

const allCategories = 'Tümü'

export function ProductsPage() {
  const { isAdmin, isAuthenticated } = useAuth()
  const [products, setProducts] = useState<Product[]>([])
  const [selectedCategory, setSelectedCategory] = useState(allCategories)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [addingProductId, setAddingProductId] = useState<number | null>(null)

  const categories = useMemo(
    () => [
      allCategories,
      ...Array.from(
        new Set(
          products
            .map((product) => product.categoryName)
            .filter((category): category is string => Boolean(category)),
        ),
      ),
    ],
    [products],
  )

  const categoryCounts = useMemo(() => {
    const counts: Record<string, number> = { [allCategories]: products.length }
    for (const p of products) {
      if (p.categoryName) counts[p.categoryName] = (counts[p.categoryName] ?? 0) + 1
    }
    return counts
  }, [products])

  const visibleProducts = useMemo(
    () =>
      selectedCategory === allCategories
        ? products
        : products.filter((product) => product.categoryName === selectedCategory),
    [products, selectedCategory],
  )

  useEffect(() => {
    let isMounted = true

    async function loadProducts() {
      try {
        setLoading(true)
        setError(null)
        const nextProducts = await productService.getAll()

        if (isMounted) {
          setProducts(nextProducts)
        }
      } catch (err) {
        if (isMounted) {
          setError(getApiErrorMessage(err, 'Ürünler yüklenemedi.'))
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadProducts()

    return () => {
      isMounted = false
    }
  }, [])

  async function addToCart(product: Product) {
    if (!isAuthenticated) {
      setError('Sepete eklemek için giriş yapmalısınız.')
      return
    }

    try {
      setAddingProductId(product.id)
      setError(null)
      setMessage(null)
      await cartService.addItem({ productId: product.id, quantity: 1 })
      setMessage(`${product.name} sepete eklendi.`)
    } catch (err) {
      setError(getApiErrorMessage(err, 'Ürün sepete eklenemedi.'))
    } finally {
      setAddingProductId(null)
    }
  }

  return (
    <section className="space-y-6">
      {/* Hero header */}
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        className="overflow-hidden rounded-[2rem] border border-brand-turquoise/25 bg-gradient-to-br from-brand-light via-white to-white px-5 py-8 shadow-brand-sm sm:px-8 sm:py-10 dark:border-cyan-400/15 dark:from-cyan-400/10 dark:via-slate-900 dark:to-slate-900"
        initial={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
      >
        <p className="text-xs font-bold uppercase tracking-[0.2em] text-brand-turquoise">
          Online Sipariş
        </p>
        <h1 className="mt-3 font-display text-3xl font-bold text-brand-text dark:text-white sm:text-4xl">
          Ürünlerimiz
        </h1>
        <p className="mt-3 max-w-xl text-base leading-7 text-slate-600 dark:text-slate-300">
          Sepete ekleyebileceğiniz ürünler burada listelenir. Menü sayfası yalnızca fiyat
          bilgilendirmesi içindir.
        </p>
      </motion.div>

      {loading ? <LoadingSpinner label="Ürünler yükleniyor, sistem hazırlanıyor..." /> : null}

      {error ? <EmptyState description={error} title="Ürünler getirilemedi" /> : null}
      {message ? (
        <p className="rounded-xl bg-brand-light p-3 text-sm text-cyan-800 dark:bg-cyan-400/10 dark:text-cyan-100">
          {message}
        </p>
      ) : null}

      {/* Category filter with count badges */}
      {!loading && !error && products.length > 0 ? (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {categories.map((category) => (
              <button
                className={[
                  'shrink-0 inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold transition duration-250',
                  selectedCategory === category
                    ? 'border-brand-turquoise bg-brand-turquoise text-white shadow-brand-sm'
                    : 'border-cyan-100 bg-white text-slate-700 hover:border-brand-turquoise/40 hover:bg-brand-light dark:border-white/10 dark:bg-slate-900 dark:text-slate-300 dark:hover:bg-white/10',
                ].join(' ')}
                key={category}
                onClick={() => setSelectedCategory(category)}
                type="button"
              >
                {category}
                <span
                  className={[
                    'rounded-full px-1.5 py-0.5 text-xs font-bold',
                    selectedCategory === category
                      ? 'bg-white/20 text-white'
                      : 'bg-slate-100 text-slate-500 dark:bg-white/10 dark:text-slate-400',
                  ].join(' ')}
                >
                  {categoryCounts[category] ?? 0}
                </span>
              </button>
            ))}
        </div>
      ) : null}

      {!loading && !error && products.length === 0 ? (
        <EmptyState
          description="Admin panelinden ürün eklendiğinde burada listelenecek."
          title="Henüz ürün yok"
        />
      ) : null}

      {!loading && !error && products.length > 0 && visibleProducts.length === 0 ? (
        <EmptyState title="Bu kategoride ürün yok" />
      ) : null}

      {/* Product grid — animates when category changes */}
      {!loading && !error && visibleProducts.length > 0 ? (
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedCategory}
            animate={{ opacity: 1, y: 0 }}
            className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3"
            exit={{ opacity: 0, y: -6 }}
            initial={{ opacity: 0, y: 8 }}
            transition={{ duration: 0.22 }}
          >
            {visibleProducts.map((product) => (
              <ProductCard
                adding={addingProductId === product.id}
                key={product.id}
                onAddToCart={isAdmin ? undefined : addToCart}
                product={product}
              />
            ))}
          </motion.div>
        </AnimatePresence>
      ) : null}
    </section>
  )
}
