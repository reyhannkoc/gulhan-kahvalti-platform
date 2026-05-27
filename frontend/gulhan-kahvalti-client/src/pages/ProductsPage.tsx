import { useEffect, useState } from 'react'
import { ProductCard } from '../components/product/ProductCard'
import { EmptyState } from '../components/ui/EmptyState'
import { LoadingSpinner } from '../components/ui/LoadingSpinner'
import { useAuth } from '../hooks/useAuth'
import { getApiErrorMessage } from '../services/api'
import { cartService } from '../services/cartService'
import { productService } from '../services/productService'
import type { Product } from '../types'

export function ProductsPage() {
  const { isAdmin, isAuthenticated } = useAuth()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)
  const [addingProductId, setAddingProductId] = useState<number | null>(null)

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
      <div className="rounded-2xl bg-cyan-50 px-4 py-6 sm:px-6">
        <p className="text-sm font-semibold uppercase tracking-wide text-cyan-700">Online sipariş</p>
        <h1 className="mt-2 text-2xl font-bold text-slate-950 sm:text-3xl">Ürünlerimiz</h1>
        <p className="mt-2 max-w-2xl text-slate-600">
          Sepete ekleyebileceğiniz ürünler burada listelenir. Menü sayfası ise yalnızca restoran menüsü ve fiyat bilgilendirmesi içindir.
        </p>
      </div>

      {loading ? <LoadingSpinner label="Ürünler yükleniyor" /> : null}

      {error ? <EmptyState description={error} title="Ürünler getirilemedi" /> : null}
      {message ? <p className="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-800">{message}</p> : null}

      {!loading && !error && products.length === 0 ? (
        <EmptyState
          description="Admin panelinden ürün eklendiğinde burada listelenecek."
          title="Henüz ürün yok"
        />
      ) : null}

      {!loading && !error && products.length > 0 ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {products.map((product) => (
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
