export interface Product {
  id: number
  name: string
  description?: string | null
  price: number
  stock: number
  imageUrl?: string | null
  isActive: boolean
  categoryId: number
  categoryName: string
}

export interface ProductCreateRequest {
  name: string
  description?: string | null
  price: number
  stock: number
  imageUrl?: string | null
  isActive: boolean
  categoryId: number
}

export type ProductUpdateRequest = ProductCreateRequest
