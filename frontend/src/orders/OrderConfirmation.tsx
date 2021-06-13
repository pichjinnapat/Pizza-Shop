import React, { FunctionComponent, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import Layout from '../components/Layout'
import productSizeName from '../lib/productSizeName'
import { OrderState, ProductSize, ProductState, UserState } from '../types'
import { OrderRoutes } from './OrderRouters'

const OrderConfirmaion: FunctionComponent = () => {
  const history = useHistory()
  const { currentOrder } = useSelector((state: { orders: OrderState }) => state.orders)
  const { products } = useSelector((state: { products: ProductState }) => state.products)
  const { user } = useSelector((state: { users: UserState }) => state.users)
  const currentProduct = products.find((product) => product.id === currentOrder.product_id)

  useEffect(() => {
    if (!currentOrder.id || !products || !user.id) {
      history.push(OrderRoutes.ORDER_INDEX)
    }
  }, [currentOrder.id, history, products, user.id])

  return (
    <Layout>
      <div className="w-full bg-yellow-100 p-4 my-2 rounded-2xl shadow-xl">
        <img
          src={`/img/${currentProduct?.type}.png`}
          className="animate-spin-slow mx-auto w-3/5 md:w-2/5 lg:w-1/5"
          alt={currentProduct?.type}
        />
        <p className="text-3xl text-center font-bold">{`Congratulations ${user.first_name}!!`}</p>
        <p className="text-2xl text-center">{`Your ${currentOrder.number}x ${productSizeName(
          currentOrder.size as ProductSize
        )} ${currentProduct?.type} are on the way to`}</p>
        <p className="text-2xl text-center">{currentOrder.destination_address}!</p>
      </div>
    </Layout>
  )
}

export default OrderConfirmaion
