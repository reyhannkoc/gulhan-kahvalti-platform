import { api } from './api'
import type { Product, ProductCreateRequest, ProductUpdateRequest } from '../types'

export const productService = {
  async getAll() {
    const { data } = await api.get<Product[]>('/products')
    return data
  },

  async getById(id: number) {
    const { data } = await api.get<Product>(`/products/${id}`)
    return data
  },

  async create(request: ProductCreateRequest) {
    const { data } = await api.post<Product>('/products', request)
    return data
  },

  async update(id: number, request: ProductUpdateRequest) {
    const { data } = await api.put<Product>(`/products/${id}`, request)
    return data
  },

  async remove(id: number) {
    await api.delete(`/products/${id}`)
  },
}
