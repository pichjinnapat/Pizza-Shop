import React, { FunctionComponent } from 'react'
import { Route, Switch } from 'react-router-dom'
import OrderIndex from './OrderIndex'

const OrderRouters: FunctionComponent = () => {
  return (
    <>
      <Switch>
        <Route path={`/orders`}>
          <OrderIndex />
        </Route>
        <Route path={`/users/*`}>
          <div>404</div>
        </Route>
      </Switch>
    </>
  )
}

export default OrderRouters
