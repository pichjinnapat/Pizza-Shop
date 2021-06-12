import { configureStore } from '@reduxjs/toolkit'
import OrderReducer from './reducers/OrderReducer'
import productsReducer from './reducers/ProductReducer'

export default configureStore({
  reducer: {
    products: productsReducer,
    orders: OrderReducer,
  },
})
