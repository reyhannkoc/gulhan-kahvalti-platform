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
  const { isAuthenticated } = useAuth()
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
          setError(getApiErrorMessage(err, 'Urun yuklenemedi.'))
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
      setMessage('Urun sepete eklendi.')
    } catch (err) {
      setError(getApiErrorMessage(err, 'Urun sepete eklenemedi.'))
    } finally {
      setAdding(false)
    }
  }

  if (loading) {
    return <LoadingSpinner label="Urun yukleniyor" />
  }

  if (error && !product) {
    return <EmptyState description={error} title="Urun getirilemedi" />
  }

  if (!product) {
    return <EmptyState title="Urun bulunamadi" />
  }

  return (
    <section className="grid gap-8 lg:grid-cols-[0.9fr_1.1fr]">
      <div className="aspect-[4/3] overflow-hidden rounded-lg bg-stone-100">
        {product.imageUrl ? (
          <img alt={product.name} className="h-full w-full object-cover" src={product.imageUrl} />
        ) : (
          <div className="flex h-full items-center justify-center text-stone-500">Urun gorseli</div>
        )}
      </div>
      <div className="space-y-5">
        <Link className="text-sm font-semibold text-emerald-700 hover:text-emerald-800" to="/menu">
          Menuye don
        </Link>
        <div>
          <p className="text-sm font-medium uppercase tracking-wide text-emerald-700">{product.categoryName || 'Kategori'}</p>
          <h1 className="mt-2 text-3xl font-bold text-stone-950">{product.name}</h1>
        </div>
        <p className="text-2xl font-bold text-stone-900">{formatPrice(product.price)}</p>
        <p className="leading-7 text-stone-600">{product.description || 'Bu urun icin aciklama henuz eklenmedi.'}</p>
        <p className={product.stock > 0 ? 'text-sm text-emerald-700' : 'text-sm text-red-700'}>
          {product.stock > 0 ? `Stokta ${product.stock} adet var` : 'Stokta yok'}
        </p>
        {message ? <p className="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-800">{message}</p> : null}
        {error ? <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p> : null}
        <Button disabled={adding || product.stock <= 0} onClick={addToCart}>
          {product.stock <= 0 ? 'Stok yok' : adding ? 'Ekleniyor' : 'Sepete ekle'}
        </Button>
      </div>
    </section>
  )
}
