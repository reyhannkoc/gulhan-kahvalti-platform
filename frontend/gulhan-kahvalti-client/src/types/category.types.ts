export interface Category {
  id: number
  name: string
  description?: string | null
}

export interface CategoryCreateRequest {
  name: string
  description?: string | null
}

export type CategoryUpdateRequest = CategoryCreateRequest
