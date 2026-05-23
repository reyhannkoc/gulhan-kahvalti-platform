import { api } from './api'
import type { CreateOrderRequest, Order, OrderStatus } from '../types'

export const orderService = {
  async checkout(request: CreateOrderRequest) {
    const { data } = await api.post<Order>('/orders/checkout', request)
    return data
  },

  async getMyOrders() {
    const { data } = await api.get<Order[]>('/orders/my-orders')
    return data
  },

  async getById(id: number) {
    const { data } = await api.get<Order>(`/orders/${id}`)
    return data
  },

  async getAdminOrders() {
    const { data } = await api.get<Order[]>('/admin/orders')
    return data
  },

  async updateStatus(id: number, status: OrderStatus) {
    const { data } = await api.put<Order>(`/admin/orders/${id}/status`, { status })
    return data
  },
}
