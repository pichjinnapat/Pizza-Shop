import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../api'
import { ApiStatus, Order, OrderState, Product, ProductSize } from '../types'

const initialState: OrderState = {
  selectedProduct: {} as Product,
  selectedSize: '' as ProductSize,
  selectedNumber: 0,
  currentOrder: {} as Order,
  customerOrders: [],
  apiStatus: ApiStatus.idle,
}

const asyncReducers = {
  getProducts: createAsyncThunk('products/getProducts', async () => {
    const response = await api.get('/products')

    return response.data
  }),
}

const orderSlice = createSlice({
  name: 'products',
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
    // 'getProducts/pending': (productState: ProductState) => {
    //   return { ...productState, apiStatus: ApiStatus.pending }
    // },
    // 'getProducts/fulfilled': (productState: ProductState, action) => {
    //   return { ...productState, products: action.payload, apiStatus: ApiStatus.fulfilled }
    // },
    // 'getProducts/rejected': (productState: ProductState, action) => {
    //   return { ...productState, error: action.payload, apiStatus: ApiStatus.rejected }
    // },
  },
})

export const { getProducts } = asyncReducers

export const { initialOrderState, setSelectedProduct, setSelectedSize, setSelectedNumber } =
  orderSlice.actions

export default orderSlice.reducer
