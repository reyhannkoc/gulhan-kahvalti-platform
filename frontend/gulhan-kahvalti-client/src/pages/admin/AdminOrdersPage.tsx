import { useEffect, useState } from 'react'
import { EmptyState } from '../../components/ui/EmptyState'
import { LoadingSpinner } from '../../components/ui/LoadingSpinner'
import { Toast } from '../../components/ui/Toast'
import { getApiErrorMessage } from '../../services/api'
import { orderService } from '../../services/orderService'
import type { Order, OrderStatus } from '../../types'
import { formatPrice } from '../../utils/formatPrice'

const statuses: OrderStatus[] = ['Pending', 'Preparing', 'Completed', 'Cancelled']

export function AdminOrdersPage() {
  const [orders, setOrders] = useState<Order[]>([])
  const [loading, setLoading] = useState(true)
  const [updatingId, setUpdatingId] = useState<number | null>(null)
  const [error, setError] = useState<string | null>(null)
  const [message, setMessage] = useState<string | null>(null)

  useEffect(() => {
    loadOrders()
  }, [])

  async function loadOrders() {
    try {
      setLoading(true)
      setError(null)
      setOrders(await orderService.getAdminOrders())
    } catch (err) {
      setError(getApiErrorMessage(err, 'Admin siparişleri yüklenemedi.'))
    } finally {
      setLoading(false)
    }
  }

  async function updateStatus(order: Order, status: OrderStatus) {
    try {
      setUpdatingId(order.id)
      setError(null)
      setMessage(null)
      const updatedOrder = await orderService.updateStatus(order.id, status)
      setOrders((current) =>
        current.map((currentOrder) => (currentOrder.id === order.id ? updatedOrder : currentOrder)),
      )
      setMessage(`Sipariş #${order.id} durumu güncellendi.`)
    } catch (err) {
      setError(getApiErrorMessage(err, 'Sipariş durumu güncellenemedi.'))
    } finally {
      setUpdatingId(null)
    }
  }

  return (
    <section className="space-y-6">
      <div>
        <h1 className="text-xl font-bold text-stone-950 sm:text-2xl dark:text-white">Sipariş Yönetimi</h1>
        <p className="mt-1 text-sm text-stone-600 dark:text-slate-300">Tüm siparişleri görüntüleyin ve durumlarını güncelleyin.</p>
      </div>

      {message ? <Toast message={message} type="success" /> : null}
      {error ? <Toast message={error} type="error" /> : null}
      {loading ? <LoadingSpinner label="Siparişler yükleniyor" /> : null}

      {!loading && orders.length === 0 ? <EmptyState title="Henüz sipariş yok" /> : null}

      {!loading && orders.length > 0 ? (
        <div className="grid gap-4">
          {orders.map((order) => (
            <article className="rounded-lg border border-stone-200 bg-white p-4 shadow-sm sm:p-5 dark:border-white/10 dark:bg-slate-900" key={order.id}>
              <div className="grid min-w-0 gap-4 lg:grid-cols-[minmax(0,1fr)_180px] lg:items-start">
                <div className="space-y-3">
                  <div className="min-w-0">
                    <h2 className="font-semibold text-stone-950 dark:text-white">Sipariş #{order.id}</h2>
                    <p className="text-sm text-stone-600 dark:text-slate-300">{order.customerName} - {order.customerPhone}</p>
                    <p className="text-sm text-stone-500 dark:text-slate-400">{order.customerAddress}</p>
                  </div>
                  <div className="space-y-2">
                    {order.items.map((item) => (
                      <div className="flex flex-wrap justify-between gap-3 text-sm" key={item.id}>
                        <span className="min-w-0 text-stone-700 dark:text-slate-200">{item.productName} x {item.quantity}</span>
                        <span className="font-medium text-stone-900 dark:text-white">{formatPrice(item.lineTotal)}</span>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="space-y-3">
                  <p className="text-left text-lg font-bold text-stone-950 lg:text-right dark:text-white">{formatPrice(order.totalPrice)}</p>
                  <select
                    className="w-full rounded-lg border border-stone-300 bg-white px-3 py-2 text-sm text-stone-900 outline-none focus:border-emerald-700 focus:ring-2 focus:ring-emerald-100 dark:border-white/15 dark:bg-slate-950 dark:text-white dark:focus:border-cyan-300 dark:focus:ring-cyan-400/20"
                    disabled={updatingId === order.id}
                    onChange={(event) => updateStatus(order, event.target.value as OrderStatus)}
                    value={order.status}
                  >
                    {statuses.map((status) => (
                      <option key={status} value={status}>
                        {status}
                      </option>
                    ))}
                  </select>
                  <p className="text-left text-xs text-stone-500 lg:text-right dark:text-slate-400">{new Date(order.createdAt).toLocaleString('tr-TR')}</p>
                </div>
              </div>
            </article>
          ))}
        </div>
      ) : null}
    </section>
  )
}
