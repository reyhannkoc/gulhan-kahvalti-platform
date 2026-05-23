import { api } from './api'
import type { Category, CategoryCreateRequest, CategoryUpdateRequest } from '../types'

export const categoryService = {
  async getAll() {
    const { data } = await api.get<Category[]>('/categories')
    return data
  },

  async getById(id: number) {
    const { data } = await api.get<Category>(`/categories/${id}`)
    return data
  },

  async create(request: CategoryCreateRequest) {
    const { data } = await api.post<Category>('/categories', request)
    return data
  },

  async update(id: number, request: CategoryUpdateRequest) {
    const { data } = await api.put<Category>(`/categories/${id}`, request)
    return data
  },

  async remove(id: number) {
    await api.delete(`/categories/${id}`)
  },
}
