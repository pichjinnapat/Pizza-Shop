import React, { FunctionComponent, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Layout from '../components/Layout'
import {
  initialOrderState,
  setSelectedNumber,
  setSelectedProduct,
  setSelectedSize,
} from '../reducers/OrderReducer'
import { getProducts } from '../reducers/ProductReducer'
import { OrderState, ProductState } from '../types'
import ProductSelector from './components/ProductSelector'
import { OrderRoutes } from './OrderRouters'

const OrderIndex: FunctionComponent = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const { products } = useSelector((state: { products: ProductState }) => state.products)
  const { selectedProduct, selectedSize, selectedNumber } = useSelector(
    (state: { orders: OrderState }) => state.orders
  )

  useEffect(() => {
    dispatch(getProducts())
    return () => {
      if (history.location.pathname !== OrderRoutes.ORDER_USER_INFORMATION) {
        dispatch(initialOrderState())
      }
    }
  }, [dispatch, history.location.pathname])

  return (
    <Layout>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 h-full py-4">
        {products.map((product) => (
          <ProductSelector
            selectProduct={(prod) => dispatch(setSelectedProduct(prod))}
            selectSize={(size) => dispatch(setSelectedSize(size))}
            selectNumber={(number) => dispatch(setSelectedNumber(number))}
            onOrder={() => history.push(OrderRoutes.ORDER_USER_INFORMATION)}
            selected={selectedProduct.type === product.type}
            productSize={selectedSize}
            productNumber={selectedNumber}
            key={product.id}
            product={product}
          />
        ))}
      </div>
    </Layout>
  )
}

export default OrderIndex
