import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import api from '../api'
import { ApiStatus, Product, ProductState } from '../types'

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

const productSlice = createSlice({
  name: 'products',
  initialState,
  reducers: {
    initialProductState: () => {
      return initialState
    },
    'getProducts/pending': (productState: ProductState) => {
      return { ...productState, apiStatus: ApiStatus.pending }
    },
    'getProducts/fulfilled': (
      productState: ProductState,
      action: { payload: Product[]; type: string }
    ) => {
      return {
        ...productState,
        products: action.payload.map((product) => ({
          ...product,
          price_s: Number(product.price_s),
          price_m: Number(product.price_m),
          price_l: Number(product.price_l),
        })),
        apiStatus: ApiStatus.fulfilled,
      }
    },
    'getProducts/rejected': (productState: ProductState, action) => {
      return { ...productState, error: action.payload, apiStatus: ApiStatus.rejected }
    },
  },
})

export const { getProducts } = asyncReducers

export const { initialProductState } = productSlice.actions

export default productSlice.reducer
