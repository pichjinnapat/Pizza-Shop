export enum ApiStatus {
  idle,
  pending,
  fulfilled,
  rejected,
}

export enum ProductSize {
  SMALL = 's',
  MEDIUM = 'm',
  LARGE = 'l',
}

export enum OrderStatus {
  NEW,
  PREPARING,
  DELIVERING,
  DELIVERED,
}

export type Product = {
  id: number
  type: string
  price_s: number
  price_m: number
  price_l: number
}

export type Order = {
  id: number
  product_id: number
  number: number
  size: string
  status: OrderStatus
  user_id: number
}

export type ProductState = {
  products: Product[]
  apiStatus: ApiStatus
}

export type OrderState = {
  currentOrder: Order
  customerOrders: Order[]
  apiStatus: ApiStatus
}
