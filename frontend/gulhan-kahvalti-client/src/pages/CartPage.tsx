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
      setError(getApiErrorMessage(err, 'Sepet yüklenemedi.'))
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
      setError(getApiErrorMessage(err, 'Sepet miktarı güncellenemedi.'))
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
      setMessage('Ürün sepetten kaldırıldı.')
    } catch (err) {
      setError(getApiErrorMessage(err, 'Ürün sepetten kaldırılamadı.'))
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
      <div className="rounded-3xl border border-cyan-100 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-slate-900">
        <h1 className="text-2xl font-bold text-stone-950 sm:text-3xl dark:text-white">Sepet</h1>
        <p className="mt-2 text-stone-600 dark:text-slate-300">Sepet ürünlerinizi yönetin ve ödeme adımına geçin.</p>
      </div>

      {message ? <p className="rounded-xl bg-cyan-50 p-3 text-sm text-cyan-800 dark:bg-cyan-400/10 dark:text-cyan-100">{message}</p> : null}
      {error ? <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700 dark:bg-red-400/10 dark:text-red-200">{error}</p> : null}
      {loading ? <LoadingSpinner label="Sepet yükleniyor" /> : null}

      {!loading && cartItems.length === 0 ? (
        <EmptyState
          action={
            <Link to="/products">
              <Button>Ürünlerimize git</Button>
            </Link>
          }
          description="Sepete ürün eklediğinizde burada görünecek."
          title="Sepet boş"
        />
      ) : null}

      {!loading && cartItems.length > 0 ? (
        <div className="grid min-w-0 gap-5 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-6">
          <div className="space-y-3">
            {cartItems.map((item) => (
              <article className="grid gap-4 rounded-2xl border border-cyan-100 bg-white p-4 shadow-sm sm:grid-cols-[80px_minmax(0,1fr)] sm:items-center lg:grid-cols-[80px_minmax(0,1fr)_auto_auto_auto] dark:border-white/10 dark:bg-slate-900" key={item.id}>
                <div className="h-20 w-20 shrink-0 overflow-hidden rounded-2xl bg-brand-light dark:bg-slate-800">
                  {item.productImageUrl ? (
                    <img alt={item.productName} className="h-full w-full object-cover" src={item.productImageUrl} />
                  ) : null}
                </div>
                <div className="min-w-0 flex-1">
                  <h2 className="font-semibold text-stone-900 dark:text-white">{item.productName}</h2>
                  <p className="text-sm text-stone-600 dark:text-slate-300">{formatPrice(item.unitPrice)}</p>
                </div>
                <div className="flex items-center gap-2 sm:col-start-2 lg:col-start-auto">
                  <Button disabled={updatingId === item.id} onClick={() => updateQuantity(item, item.quantity - 1)} variant="ghost">
                    -
                  </Button>
                  <span className="w-8 text-center text-sm font-semibold text-stone-900 dark:text-white">{item.quantity}</span>
                  <Button disabled={updatingId === item.id} onClick={() => updateQuantity(item, item.quantity + 1)} variant="ghost">
                    +
                  </Button>
                </div>
                <div className="text-sm font-semibold text-stone-900 sm:col-start-2 lg:col-start-auto dark:text-white">{formatPrice(item.lineTotal)}</div>
                <Button className="w-full sm:col-start-2 sm:w-auto lg:col-start-auto" disabled={updatingId === item.id} onClick={() => removeItem(item)} variant="danger">
                  Sil
                </Button>
              </article>
            ))}
          </div>

          <aside className="h-fit rounded-2xl border border-cyan-100 bg-white p-4 shadow-sm sm:p-5 lg:sticky lg:top-24 dark:border-white/10 dark:bg-slate-900">
            <h2 className="text-lg font-semibold text-stone-950 dark:text-white">Sepet özeti</h2>
            <div className="mt-4 flex items-center justify-between text-sm">
              <span className="text-stone-600 dark:text-slate-300">Toplam</span>
              <span className="text-lg font-bold text-stone-950 dark:text-white">{formatPrice(total)}</span>
            </div>
            <div className="mt-5 grid gap-2">
              <Link to="/checkout">
                <Button fullWidth>Ödemeye geç</Button>
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
