import { api } from './api'
import type { AddCartItemRequest, CartItem, UpdateCartItemRequest } from '../types'

export const cartService = {
  async getCart() {
    const { data } = await api.get<CartItem[]>('/cart')
    return data
  },

  async addItem(request: AddCartItemRequest) {
    const { data } = await api.post<CartItem>('/cart/add', request)
    return data
  },

  async updateItem(id: number, request: UpdateCartItemRequest) {
    const { data } = await api.put<CartItem>(`/cart/update/${id}`, request)
    return data
  },

  async removeItem(id: number) {
    await api.delete(`/cart/remove/${id}`)
  },

  async clearCart() {
    await api.delete('/cart/clear')
  },
}
