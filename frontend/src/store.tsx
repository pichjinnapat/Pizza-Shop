import { configureStore } from '@reduxjs/toolkit'
import OrderReducer from './reducers/OrderReducer'
import productsReducer from './reducers/ProductReducer'
import UserReducer from './reducers/UserReducer'

export default configureStore({
  reducer: {
    products: productsReducer,
    orders: OrderReducer,
    users: UserReducer,
  },
})
