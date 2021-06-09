import React, { FunctionComponent } from 'react'
import { Route } from 'react-router-dom'
import OrderIndex from './OrderIndex'

const OrderRouters: FunctionComponent = () => {
  return (
    <>
      <Route path={`/orders`}>
        <OrderIndex />
      </Route>
    </>
  )
}

export default OrderRouters
