import { useEffect, useState } from 'react'
import { EmptyState } from '../components/ui/EmptyState'
import { LoadingSpinner } from '../components/ui/LoadingSpinner'
import { Toast } from '../components/ui/Toast'
import { getApiErrorMessage } from '../services/api'
import { orderService } from '../services/orderService'
import type { Order } from '../types'
import { formatPrice } from '../utils/formatPrice'

export function MyOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function loadOrders() {
      try {
        setLoading(true)
        setError(null)
        setOrders(await orderService.getMyOrders())
      } catch (err) {
        setError(getApiErrorMessage(err, 'Siparisler yuklenemedi.'))
      } finally {
        setLoading(false)
      }
    }

    loadOrders()
  }, [])

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-stone-950">Siparislerim</h1>
        <p className="mt-2 text-stone-600">Onceki demo siparislerinizi goruntuleyin.</p>
      </div>

      {error ? <Toast message={error} type="error" /> : null}
      {loading ? <LoadingSpinner label="Siparisler yukleniyor" /> : null}

      {!loading && orders.length === 0 ? (
        <EmptyState description="Checkout yaptiginizda siparisler burada listelenecek." title="Henuz siparis yok" />
      ) : null}

      {!loading && orders.length > 0 ? (
        <div className="grid gap-4">
          {orders.map((order) => (
            <article className="rounded-lg border border-stone-200 bg-white p-5 shadow-sm" key={order.id}>
              <div className="flex flex-col gap-3 border-b border-stone-100 pb-4 sm:flex-row sm:items-center sm:justify-between">
                <div>
                  <h2 className="font-semibold text-stone-950">Siparis #{order.id}</h2>
                  <p className="text-sm text-stone-500">{new Date(order.createdAt).toLocaleString('tr-TR')}</p>
                </div>
                <div className="flex items-center gap-3">
                  <span className="rounded-full bg-emerald-50 px-3 py-1 text-sm font-medium text-emerald-800">{order.status}</span>
                  <span className="font-bold text-stone-950">{formatPrice(order.totalPrice)}</span>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                {order.items.map((item) => (
                  <div className="flex justify-between gap-4 text-sm" key={item.id}>
                    <span className="text-stone-700">{item.productName} x {item.quantity}</span>
                    <span className="font-medium text-stone-900">{formatPrice(item.lineTotal)}</span>
                  </div>
                ))}
              </div>
            </article>
          ))}
        </div>
      ) : null}
    </section>
  )
}
