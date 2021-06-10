import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../api'
import { ApiStatus, ProductState } from '../types'

const initialState: ProductState = {
  products: [],
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
    initialProductState: () => {
      return initialState
    },
    'getProducts/pending': (productState: ProductState) => {
      return { ...productState, apiStatus: ApiStatus.pending }
    },
    'getProducts/fulfilled': (productState: ProductState, action) => {
      return { ...productState, products: action.payload, apiStatus: ApiStatus.fulfilled }
    },
    'getProducts/rejected': (productState: ProductState, action) => {
      return { ...productState, error: action.payload, apiStatus: ApiStatus.rejected }
    },
  },
})

export const { getProducts } = asyncReducers

export const { initialProductState } = orderSlice.actions

export default orderSlice.reducer
