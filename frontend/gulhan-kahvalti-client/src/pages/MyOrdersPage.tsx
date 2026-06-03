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
        setError(getApiErrorMessage(err, 'Siparişler yüklenemedi.'))
      } finally {
        setLoading(false)
      }
    }

    loadOrders()
  }, [])

  return (
    <section className="space-y-6">
      <div className="rounded-3xl border border-cyan-100 bg-white p-5 shadow-sm dark:border-white/10 dark:bg-slate-900">
        <h1 className="text-2xl font-bold text-stone-950 sm:text-3xl dark:text-white">Siparişlerim</h1>
        <p className="mt-2 text-stone-600 dark:text-slate-300">Önceki demo siparişlerinizi görüntüleyin.</p>
      </div>

      {error ? <Toast message={error} type="error" /> : null}
      {loading ? <LoadingSpinner label="Siparişler yükleniyor" /> : null}

      {!loading && orders.length === 0 ? (
        <EmptyState description="Ödeme yaptığınızda siparişler burada listelenecek." title="Henüz sipariş yok" />
      ) : null}

      {!loading && orders.length > 0 ? (
        <div className="grid gap-4">
          {orders.map((order) => (
            <article className="rounded-3xl border border-cyan-100 bg-white p-4 shadow-sm sm:p-5 dark:border-white/10 dark:bg-slate-900" key={order.id}>
              <div className="flex flex-col gap-3 border-b border-cyan-50 pb-4 sm:flex-row sm:items-center sm:justify-between dark:border-white/10">
                <div>
                  <h2 className="font-semibold text-stone-950 dark:text-white">Sipariş #{order.id}</h2>
                  <p className="text-sm text-stone-500 dark:text-slate-400">{new Date(order.createdAt).toLocaleString('tr-TR')}</p>
                </div>
                <div className="flex flex-wrap items-center gap-3">
                  <span className="rounded-full bg-brand-light px-3 py-1 text-sm font-medium text-cyan-800 dark:bg-cyan-400/10 dark:text-cyan-100">{order.status}</span>
                  <span className="font-bold text-stone-950 dark:text-white">{formatPrice(order.totalPrice)}</span>
                </div>
              </div>
              <div className="mt-4 space-y-2">
                {order.items.map((item) => (
                  <div className="flex flex-wrap justify-between gap-4 text-sm" key={item.id}>
                    <span className="min-w-0 text-stone-700 dark:text-slate-200">{item.productName} x {item.quantity}</span>
                    <span className="font-medium text-stone-900 dark:text-white">{formatPrice(item.lineTotal)}</span>
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
