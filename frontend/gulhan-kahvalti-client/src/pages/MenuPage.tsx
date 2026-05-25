import { useEffect, useState } from 'react'
import { ProductCard } from '../components/product/ProductCard'
import { EmptyState } from '../components/ui/EmptyState'
import { LoadingSpinner } from '../components/ui/LoadingSpinner'
import { useAuth } from '../hooks/useAuth'
import { getApiErrorMessage } from '../services/api'
import { cartService } from '../services/cartService'
import { productService } from '../services/productService'
import type { Product } from '../types'

export function MenuPage() {
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
          setError(getApiErrorMessage(err, 'Urunler yuklenemedi.'))
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
      setError('Sepete eklemek icin giris yapmalisiniz.')
      return
    }

    try {
      setAddingProductId(product.id)
      setError(null)
      setMessage(null)
      await cartService.addItem({ productId: product.id, quantity: 1 })
      setMessage(`${product.name} sepete eklendi.`)
    } catch (err) {
      setError(getApiErrorMessage(err, 'Urun sepete eklenemedi.'))
    } finally {
      setAddingProductId(null)
    }
  }

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-stone-950 sm:text-3xl">Menu</h1>
        <p className="mt-2 text-stone-600">Backend API'den gelen urun listesi.</p>
      </div>

      {loading ? <LoadingSpinner label="Urunler yukleniyor" /> : null}

      {error ? (
        <EmptyState description={error} title="Urunler getirilemedi" />
      ) : null}
      {message ? <p className="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-800">{message}</p> : null}

      {!loading && !error && products.length === 0 ? (
        <EmptyState
          description="Admin panelinden urun eklendiginde burada listelenecek."
          title="Henuz urun yok"
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
