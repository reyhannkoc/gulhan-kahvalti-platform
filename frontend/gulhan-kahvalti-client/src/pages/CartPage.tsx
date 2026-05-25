import { useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { EmptyState } from '../components/ui/EmptyState'
import { LoadingSpinner } from '../components/ui/LoadingSpinner'
import { getApiErrorMessage } from '../services/api'
import { cartService } from '../services/cartService'
import type { CartItem } from '../types'
import { formatPrice } from '../utils/formatPrice'

export function CartPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const [updatingId, setUpdatingId] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  const total = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.lineTotal, 0),
    [cartItems],
  )

  useEffect(() => {
    loadCart()
  }, [])

  async function loadCart() {
    try {
      setLoading(true)
      setError(null)
      setCartItems(await cartService.getCart())
    } catch (err) {
      setError(getApiErrorMessage(err, 'Sepet yuklenemedi.'))
    } finally {
      setLoading(false)
    }
  }

  async function updateQuantity(item: CartItem, quantity: number) {
    if (quantity < 1) {
      return
    }

    try {
      setUpdatingId(item.id)
      setError(null)
      const updatedItem = await cartService.updateItem(item.id, { quantity })
      setCartItems((current) =>
        current.map((cartItem) => (cartItem.id === item.id ? updatedItem : cartItem)),
      )
    } catch (err) {
      setError(getApiErrorMessage(err, 'Sepet miktari guncellenemedi.'))
    } finally {
      setUpdatingId(null)
    }
  }

  async function removeItem(item: CartItem) {
    try {
      setUpdatingId(item.id)
      setError(null)
      await cartService.removeItem(item.id)
      setCartItems((current) => current.filter((cartItem) => cartItem.id !== item.id))
      setMessage('Urun sepetten kaldirildi.')
    } catch (err) {
      setError(getApiErrorMessage(err, 'Urun sepetten kaldirilamadi.'))
    } finally {
      setUpdatingId(null)
    }
  }

  async function clearCart() {
    try {
      setError(null)
      setMessage(null)
      await cartService.clearCart()
      setCartItems([])
      setMessage('Sepet temizlendi.')
    } catch (err) {
      setError(getApiErrorMessage(err, 'Sepet temizlenemedi.'))
    }
  }

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-stone-950 sm:text-3xl">Sepet</h1>
        <p className="mt-2 text-stone-600">Sepet urunlerinizi yonetin.</p>
      </div>

      {message ? <p className="rounded-lg bg-emerald-50 p-3 text-sm text-emerald-800">{message}</p> : null}
      {error ? <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p> : null}
      {loading ? <LoadingSpinner label="Sepet yukleniyor" /> : null}

      {!loading && cartItems.length === 0 ? (
        <EmptyState
          action={
            <Link to="/menu">
              <Button>Menuye git</Button>
            </Link>
          }
          description="Sepete urun ekledigide burada gorunecek."
          title="Sepet bos"
        />
      ) : null}

      {!loading && cartItems.length > 0 ? (
        <div className="grid min-w-0 gap-5 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-6">
          <div className="space-y-3">
            {cartItems.map((item) => (
              <article className="grid gap-4 rounded-lg border border-stone-200 bg-white p-4 sm:grid-cols-[80px_minmax(0,1fr)] sm:items-center lg:grid-cols-[80px_minmax(0,1fr)_auto_auto_auto]" key={item.id}>
                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-lg bg-stone-100">
                  {item.productImageUrl ? (
                    <img alt={item.productName} className="h-full w-full object-cover" src={item.productImageUrl} />
                  ) : null}
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="font-semibold text-stone-900">{item.productName}</h2>
                  <p className="text-sm text-stone-600">{formatPrice(item.unitPrice)}</p>
                </div>
                <div className="flex items-center gap-2 sm:col-start-2 lg:col-start-auto">
                  <Button disabled={updatingId === item.id} onClick={() => updateQuantity(item, item.quantity - 1)} variant="ghost">
                    -
                  </Button>
                  <span className="w-8 text-center text-sm font-semibold">{item.quantity}</span>
                  <Button disabled={updatingId === item.id} onClick={() => updateQuantity(item, item.quantity + 1)} variant="ghost">
                    +
                  </Button>
                </div>
                <div className="text-sm font-semibold text-stone-900 sm:col-start-2 lg:col-start-auto">{formatPrice(item.lineTotal)}</div>
                <Button className="w-full sm:col-start-2 sm:w-auto lg:col-start-auto" disabled={updatingId === item.id} onClick={() => removeItem(item)} variant="danger">
                  Sil
                </Button>
              </article>
            ))}
          </div>

          <aside className="h-fit rounded-lg border border-stone-200 bg-white p-4 sm:p-5 lg:sticky lg:top-24">
            <h2 className="text-lg font-semibold text-stone-950">Sepet ozeti</h2>
            <div className="mt-4 flex items-center justify-between text-sm">
              <span>Toplam</span>
              <span className="text-lg font-bold">{formatPrice(total)}</span>
            </div>
            <div className="mt-5 grid gap-2">
              <Link to="/checkout">
                <Button fullWidth>Checkout</Button>
              </Link>
              <Button fullWidth onClick={clearCart} variant="ghost">
                Sepeti temizle
              </Button>
            </div>
          </aside>
        </div>
      ) : null}
    </section>
  )
}
