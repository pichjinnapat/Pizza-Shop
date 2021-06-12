import React, { FunctionComponent } from 'react'
import { Route, Switch } from 'react-router-dom'
import OrderIndex from './OrderIndex'
import OrderUserInformation from './OrderUserInformation'

export enum OrderRoutes {
  ORDER_INDEX = '/orders',
  ODER_USER_INFORMATION = '/orders/userinfo',
}

const OrderRouters: FunctionComponent = () => {
  return (
    <>
      <Switch>
        <Route exact path={OrderRoutes.ORDER_INDEX}>
          <OrderIndex />
        </Route>
        <Route exact path={OrderRoutes.ODER_USER_INFORMATION}>
          <OrderUserInformation />
        </Route>
        <Route path={`/orders/*`}>
          <div>404</div>
        </Route>
      </Switch>
    </>
  )
}

export default OrderRouters
