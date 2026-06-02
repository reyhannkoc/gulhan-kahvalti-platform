import { type FormEvent, useEffect, useMemo, useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '../components/ui/Button'
import { EmptyState } from '../components/ui/EmptyState'
import { FormField } from '../components/ui/FormField'
import { Input } from '../components/ui/Input'
import { LoadingSpinner } from '../components/ui/LoadingSpinner'
import { getApiErrorMessage } from '../services/api'
import { cartService } from '../services/cartService'
import { orderService } from '../services/orderService'
import type { CartItem, Order } from '../types'
import { formatPrice } from '../utils/formatPrice'

export function CheckoutPage() {
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [customerName, setCustomerName] = useState('')
  const [customerPhone, setCustomerPhone] = useState('')
  const [customerAddress, setCustomerAddress] = useState('')
  const [note, setNote] = useState('')
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [order, setOrder] = useState<Order | null>(null)

  const total = useMemo(
    () => cartItems.reduce((sum, item) => sum + item.lineTotal, 0),
    [cartItems],
  )

  useEffect(() => {
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

    loadCart()
  }, [])

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setSubmitting(true)
    setError(null)
    setOrder(null)

    try {
      const createdOrder = await orderService.checkout({
        customerName,
        customerPhone,
        customerAddress,
        note: note || null,
      })
      setOrder(createdOrder)
      setCartItems([])
    } catch (err) {
      setError(getApiErrorMessage(err, 'Sipariş oluşturulamadı.'))
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return <LoadingSpinner label="Ödeme hazırlanıyor" />
  }

  if (order) {
    return (
      <EmptyState
        action={
          <Link to="/products">
            <Button>Ürünlerimize dön</Button>
          </Link>
        }
        description={`Sipariş #${order.id} oluşturuldu. Durum: ${order.status}`}
        title="Sipariş alındı"
      />
    )
  }

  if (cartItems.length === 0) {
    return (
      <EmptyState
        action={
          <Link to="/products">
            <Button>Ürünlerimize git</Button>
          </Link>
        }
        description="Ödeme için önce sepete ürün ekleyin."
        title="Sepet boş"
      />
    )
  }

  return (
    <section className="grid min-w-0 gap-5 lg:grid-cols-[minmax(0,1fr)_320px] lg:gap-6">
      <form className="space-y-4 rounded-3xl border border-cyan-100 bg-white p-4 shadow-sm sm:p-5 dark:border-white/10 dark:bg-slate-900" onSubmit={handleSubmit}>
        <div>
          <h1 className="text-2xl font-bold text-stone-950 sm:text-3xl">Ödeme</h1>
          <p className="mt-2 text-stone-600">Demo sipariş için teslimat bilgilerini girin.</p>
        </div>

        {error ? <p className="rounded-xl bg-red-50 p-3 text-sm text-red-700 dark:bg-red-400/10 dark:text-red-200">{error}</p> : null}

        <FormField htmlFor="customerName" label="Ad soyad">
          <Input id="customerName" onChange={(event) => setCustomerName(event.target.value)} required value={customerName} />
        </FormField>
        <FormField htmlFor="customerPhone" label="Telefon">
          <Input id="customerPhone" onChange={(event) => setCustomerPhone(event.target.value)} required value={customerPhone} />
        </FormField>
        <FormField htmlFor="customerAddress" label="Adres">
          <textarea
            className="min-h-24 w-full rounded-xl border border-cyan-100 bg-white px-3 py-2 text-sm text-brand-text outline-none transition focus:border-brand-turquoise focus:ring-2 focus:ring-cyan-100 dark:border-white/15 dark:bg-slate-950 dark:text-white dark:focus:ring-cyan-400/20"
            id="customerAddress"
            onChange={(event) => setCustomerAddress(event.target.value)}
            required
            value={customerAddress}
          />
        </FormField>
        <FormField htmlFor="note" label="Not">
          <Input id="note" onChange={(event) => setNote(event.target.value)} value={note} />
        </FormField>
        <Button disabled={submitting} type="submit">
          {submitting ? 'Sipariş oluşturuluyor' : 'Siparişi oluştur'}
        </Button>
      </form>

      <aside className="h-fit rounded-3xl border border-cyan-100 bg-white p-4 shadow-sm sm:p-5 lg:sticky lg:top-24 dark:border-white/10 dark:bg-slate-900">
        <h2 className="text-lg font-semibold text-stone-950">Sipariş özeti</h2>
        <div className="mt-4 space-y-3">
          {cartItems.map((item) => (
            <div className="flex flex-wrap justify-between gap-3 text-sm" key={item.id}>
              <span className="min-w-0 text-stone-600">{item.productName} x {item.quantity}</span>
              <span className="font-medium text-stone-900">{formatPrice(item.lineTotal)}</span>
            </div>
          ))}
        </div>
        <div className="mt-5 border-t border-cyan-100 pt-4 dark:border-white/10">
          <div className="flex justify-between">
            <span>Toplam</span>
            <span className="font-bold">{formatPrice(total)}</span>
          </div>
        </div>
      </aside>
    </section>
  )
}
