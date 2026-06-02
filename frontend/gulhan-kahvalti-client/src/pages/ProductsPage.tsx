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
        new Set(products.map((product) => product.categoryName).filter((category): category is string => Boolean(category))),
      ),
    ],
    [products],
  )

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
      <div className="rounded-3xl border border-cyan-100 bg-brand-light px-4 py-6 shadow-sm sm:px-6 dark:border-white/10 dark:bg-cyan-400/10">
        <p className="text-sm font-semibold uppercase tracking-wide text-cyan-700 dark:text-cyan-200">Online sipariş</p>
        <h1 className="mt-2 text-2xl font-bold text-slate-950 sm:text-3xl">Ürünlerimiz</h1>
        <p className="mt-2 max-w-2xl text-slate-600 dark:text-slate-300">
          Sepete ekleyebileceğiniz ürünler burada listelenir. Menü sayfası yalnızca restoran menüsü ve fiyat bilgilendirmesi içindir.
        </p>
      </div>

      {loading ? <LoadingSpinner label="Ürünler yükleniyor, sistem hazırlanıyor..." /> : null}

      {error ? <EmptyState description={error} title="Ürünler getirilemedi" /> : null}
      {message ? <p className="rounded-xl bg-brand-light p-3 text-sm text-cyan-800 dark:bg-cyan-400/10 dark:text-cyan-100">{message}</p> : null}

      {!loading && !error && products.length > 0 ? (
        <div className="flex gap-2 overflow-x-auto pb-1">
          {categories.map((category) => (
            <button
              className={[
                'shrink-0 rounded-full border px-4 py-2 text-sm font-semibold transition',
                selectedCategory === category
                  ? 'border-brand-turquoise bg-brand-turquoise text-white'
                  : 'border-cyan-100 bg-white text-cyan-800 hover:bg-brand-light dark:border-white/10 dark:bg-slate-900 dark:text-cyan-100 dark:hover:bg-white/10',
              ].join(' ')}
              key={category}
              onClick={() => setSelectedCategory(category)}
              type="button"
            >
              {category}
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

      {!loading && !error && visibleProducts.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {visibleProducts.map((product) => (
            <ProductCard
              adding={addingProductId === product.id}
              key={product.id}
              onAddToCart={isAdmin ? undefined : addToCart}
              product={product}
            />
          ))}
        </div>
      ) : null}
    </section>
  )
}
