import { configureStore } from '@reduxjs/toolkit'
import productsReducer from './reducers/ProductReducer'

export default configureStore({
  reducer: {
    products: productsReducer,
  },
})
