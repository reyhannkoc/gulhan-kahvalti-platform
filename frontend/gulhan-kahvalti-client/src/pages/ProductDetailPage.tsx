import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { EmptyState } from '../components/ui/EmptyState'
import { LoadingSpinner } from '../components/ui/LoadingSpinner'
import { useAuth } from '../hooks/useAuth'
import { getApiErrorMessage } from '../services/api'
import { cartService } from '../services/cartService'
import { productService } from '../services/productService'
import type { Product } from '../types'
import { formatPrice } from '../utils/formatPrice'

export function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { isAdmin, isAuthenticated } = useAuth()
  const [product, setProduct] = useState<Product | null>(null)
  const [loading, setLoading] = useState(true)
  const [adding, setAdding] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    let isMounted = true

    async function loadProduct() {
      if (!id) {
        return
      }

      try {
        setLoading(true)
        setError(null)
        const nextProduct = await productService.getById(Number(id))

        if (isMounted) {
          setProduct(nextProduct)
        }
      } catch (err) {
        if (isMounted) {
          setError(getApiErrorMessage(err, 'Ürün yüklenemedi.'))
        }
      } finally {
        if (isMounted) {
          setLoading(false)
        }
      }
    }

    loadProduct()

    return () => {
      isMounted = false
    }
  }, [id])

  async function addToCart() {
    if (!product) {
      return
    }

    if (!isAuthenticated) {
      navigate('/login')
      return
    }

    try {
      setAdding(true)
      setError(null)
      setMessage(null)
      await cartService.addItem({ productId: product.id, quantity: 1 })
      setMessage('Ürün sepete eklendi.')
    } catch (err) {
      setError(getApiErrorMessage(err, 'Ürün sepete eklenemedi.'))
    } finally {
      setAdding(false)
    }
  }

  if (loading) {
    return <LoadingSpinner label="Ürün yükleniyor. Servis uyanıyorsa bu işlem kısa sürebilir." />
  }

  if (error && !product) {
    return <EmptyState description={error} title="Ürün getirilemedi" />
  }

  if (!product) {
    return <EmptyState title="Ürün bulunamadı" />
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[0.9fr_1.1fr] lg:gap-8">
      <div className="aspect-[4/3] overflow-hidden rounded-3xl border border-cyan-100 bg-brand-light shadow-sm dark:border-white/10 dark:bg-slate-900">
        {product.imageUrl ? (
          <img alt={product.name} className="h-full w-full object-cover" src={product.imageUrl} />
        ) : (
          <div className="flex h-full items-center justify-center text-slate-500 dark:text-slate-300">Ürün görseli</div>
        )}
      </div>
      <div className="space-y-5 rounded-3xl border border-cyan-100 bg-white p-5 shadow-sm sm:p-6 dark:border-white/10 dark:bg-slate-900">
        <Link className="text-sm font-semibold text-brand-turquoise hover:text-cyan-700 dark:text-cyan-200" to="/products">
          Ürünlerimize dön
        </Link>
        <div>
          <p className="text-sm font-bold uppercase tracking-wide text-brand-turquoise">{product.categoryName || 'Kategori'}</p>
          <h1 className="mt-2 text-2xl font-bold text-brand-text sm:text-3xl dark:text-white">{product.name}</h1>
        </div>
        <p className="text-2xl font-bold text-brand-text dark:text-white">{formatPrice(product.price)}</p>
        <p className="leading-7 text-slate-600 dark:text-slate-300">{product.description || 'Bu ürün için açıklama henüz eklenmedi.'}</p>
        <p className={product.stock > 0 ? 'text-sm font-semibold text-cyan-700 dark:text-cyan-200' : 'text-sm font-semibold text-red-700 dark:text-red-300'}>
          {product.stock > 0 ? `Stokta ${product.stock} adet var` : 'Stokta yok'}
        </p>
        {message ? <p className="rounded-xl bg-cyan-50 p-3 text-sm text-cyan-800 dark:bg-cyan-400/10 dark:text-cyan-100">{message}</p> : null}
        {error ? <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700 dark:bg-red-400/10 dark:text-red-200">{error}</p> : null}
        {isAdmin ? (
          <Link className="inline-flex rounded-full bg-slate-900 px-4 py-2 text-sm font-semibold text-white transition hover:bg-slate-800 dark:bg-white dark:text-slate-950" to="/admin">
            Admin panele dön
          </Link>
        ) : (
          <Button disabled={adding || product.stock <= 0} onClick={addToCart}>
            {product.stock <= 0 ? 'Stok yok' : adding ? 'Ekleniyor' : 'Sepete ekle'}
          </Button>
        )}
      </div>
    </section>
  )
}
