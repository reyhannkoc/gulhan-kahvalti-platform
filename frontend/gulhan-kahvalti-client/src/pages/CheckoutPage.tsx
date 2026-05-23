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
        setError(getApiErrorMessage(err, 'Sepet yuklenemedi.'))
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
      setError(getApiErrorMessage(err, 'Siparis olusturulamadi.'))
    } finally {
      setSubmitting(false)
    }
  }

  if (loading) {
    return <LoadingSpinner label="Checkout hazirlaniyor" />
  }

  if (order) {
    return (
      <EmptyState
        action={
          <Link to="/menu">
            <Button>Menuye don</Button>
          </Link>
        }
        description={`Siparis #${order.id} olusturuldu. Durum: ${order.status}`}
        title="Siparis alindi"
      />
    )
  }

  if (cartItems.length === 0) {
    return (
      <EmptyState
        action={
          <Link to="/menu">
            <Button>Menuye git</Button>
          </Link>
        }
        description="Checkout icin once sepete urun ekleyin."
        title="Sepet bos"
      />
    )
  }

  return (
    <section className="grid gap-6 lg:grid-cols-[1fr_320px]">
      <form className="space-y-4 rounded-lg border border-stone-200 bg-white p-5" onSubmit={handleSubmit}>
        <div>
          <h1 className="text-3xl font-bold text-stone-950">Checkout</h1>
          <p className="mt-2 text-stone-600">Demo siparis icin teslimat bilgilerini girin.</p>
        </div>

        {error ? <p className="rounded-lg bg-red-50 p-3 text-sm text-red-700">{error}</p> : null}

        <FormField htmlFor="customerName" label="Ad soyad">
          <Input id="customerName" onChange={(event) => setCustomerName(event.target.value)} required value={customerName} />
        </FormField>
        <FormField htmlFor="customerPhone" label="Telefon">
          <Input id="customerPhone" onChange={(event) => setCustomerPhone(event.target.value)} required value={customerPhone} />
        </FormField>
        <FormField htmlFor="customerAddress" label="Adres">
          <textarea
            className="min-h-24 w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100"
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
          {submitting ? 'Siparis olusturuluyor' : 'Siparisi olustur'}
        </Button>
      </form>

      <aside className="h-fit rounded-lg border border-stone-200 bg-white p-5">
        <h2 className="text-lg font-semibold text-stone-950">Siparis ozeti</h2>
        <div className="mt-4 space-y-3">
          {cartItems.map((item) => (
            <div className="flex justify-between gap-3 text-sm" key={item.id}>
              <span className="text-stone-600">{item.productName} x {item.quantity}</span>
              <span className="font-medium text-stone-900">{formatPrice(item.lineTotal)}</span>
            </div>
          ))}
        </div>
        <div className="mt-5 border-t border-stone-200 pt-4">
          <div className="flex justify-between">
            <span>Toplam</span>
            <span className="font-bold">{formatPrice(total)}</span>
          </div>
        </div>
      </aside>
    </section>
  )
}
