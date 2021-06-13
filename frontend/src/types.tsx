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

export type User = {
  id?: number
  first_name: string
  last_name: string
  email: string
}

export type Order = {
  id?: number
  product_id: number
  number: number
  size: string
  status: OrderStatus
  destination_address: string
  user_id: number
}

export type ProductState = {
  products: Product[]
  apiStatus: ApiStatus
}

export type UserState = {
  user: User
  apiStatus: ApiStatus
}

export type OrderState = {
  selectedProduct: Product
  selectedSize: ProductSize
  selectedNumber: number
  totalPrice: number
  destination_address: string
  userInfo: User
  cardInfo: CardFormType
  currentOrder: Order
  customerOrders: Order[]
  apiStatus: ApiStatus
}

export type CardFormType = {
  cardNumber: string
  name: string
  expiry: string
  cvc: string | number
}
