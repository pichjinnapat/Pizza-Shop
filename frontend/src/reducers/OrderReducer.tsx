import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../api'
import { ApiStatus, Order, OrderState, OrderStatus, Product, ProductSize } from '../types'

const initialState: OrderState = {
  selectedProduct: {} as Product,
  selectedSize: '' as ProductSize,
  selectedNumber: 0,
  totalPrice: 0,
  userInfo: { first_name: '', last_name: '', email: '', address: '' },
  cardInfo: { cardNumber: '', name: '', expiry: '', cvc: '' },
  currentOrder: {} as Order,
  customerOrders: [],
  apiStatus: ApiStatus.idle,
}

const asyncReducers = {
  createOrder: createAsyncThunk(
    'orders/createOrder',
    async (params: {
      product_id: number
      number: number
      size: string
      status: OrderStatus
      user_id: number
    }) => {
      const data = { ...params }

      const response = await api.post(`/orders`, data)

      return response.data
    }
  ),
}

const orderSlice = createSlice({
  name: 'orders',
  initialState,
  reducers: {
    initialOrderState: () => {
      return initialState
    },
    setSelectedProduct: (orderState: OrderState, action) => {
      return { ...orderState, selectedProduct: action.payload }
    },
    setSelectedSize: (orderState: OrderState, action) => {
      return { ...orderState, selectedSize: action.payload }
    },
    setSelectedNumber: (orderState: OrderState, action) => {
      return { ...orderState, selectedNumber: action.payload }
    },
    setTotalPrice: (orderState: OrderState, action) => {
      return { ...orderState, totalPrice: action.payload }
    },
    setUserInfo: (orderState: OrderState, action) => {
      return { ...orderState, userInfo: action.payload }
    },
    setCardInfo: (orderState: OrderState, action) => {
      return { ...orderState, cardInfo: action.payload }
    },
    'createOrder/pending': (orderState: OrderState) => {
      return { ...orderState, apiStatus: ApiStatus.pending }
    },
    'createOrder/fulfilled': (orderState: OrderState, action) => {
      return { ...orderState, currentOrder: action.payload, apiStatus: ApiStatus.fulfilled }
    },
    'createOrder/rejected': (orderState: OrderState, action) => {
      return { ...orderState, error: action.payload, apiStatus: ApiStatus.rejected }
    },
  },
})

export const { createOrder } = asyncReducers

export const {
  initialOrderState,
  setSelectedProduct,
  setSelectedSize,
  setSelectedNumber,
  setTotalPrice,
  setUserInfo,
  setCardInfo,
} = orderSlice.actions

export default orderSlice.reducer
