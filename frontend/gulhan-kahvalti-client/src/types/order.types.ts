export type OrderStatus = 'Pending' | 'Preparing' | 'Completed' | 'Cancelled'

export interface OrderItem {
  id: number
  productId: number
  productName: string
  quantity: number
  unitPrice: number
  lineTotal: number
}

export interface Order {
  id: number
  customerName: string
  customerPhone: string
  customerAddress: string
  note?: string | null
  totalPrice: number
  status: OrderStatus
  createdAt: string
  items: OrderItem[]
}

export interface CreateOrderRequest {
  customerName: string
  customerPhone: string
  customerAddress: string
  note?: string | null
}
