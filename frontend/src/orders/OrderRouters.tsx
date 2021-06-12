import React, { FunctionComponent } from 'react'
import { Route, Switch } from 'react-router-dom'
import OrderIndex from './OrderIndex'
import OrderPayment from './OrderPayment'
import OrderUserInformation from './OrderUserInformation'

export enum OrderRoutes {
  ORDER_INDEX = '/orders',
  ORDER_USER_INFORMATION = '/orders/userinfo',
  ORDER_PAYMENT = '/orders/payment',
}

const OrderRouters: FunctionComponent = () => {
  return (
    <>
      <Switch>
        <Route exact path={OrderRoutes.ORDER_INDEX}>
          <OrderIndex />
        </Route>
        <Route exact path={OrderRoutes.ORDER_USER_INFORMATION}>
          <OrderUserInformation />
        </Route>
        <Route exact path={OrderRoutes.ORDER_PAYMENT}>
          <OrderPayment />
        </Route>
        <Route path={`/orders/*`}>
          <div>404</div>
        </Route>
      </Switch>
    </>
  )
}

export default OrderRouters
