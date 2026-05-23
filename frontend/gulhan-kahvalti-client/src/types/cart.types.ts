export interface CartItem {
  id: number
  productId: number
  productName: string
  productImageUrl?: string | null
  quantity: number
  unitPrice: number
  lineTotal: number
}

export interface AddCartItemRequest {
  productId: number
  quantity: number
}

export interface UpdateCartItemRequest {
  quantity: number
}
