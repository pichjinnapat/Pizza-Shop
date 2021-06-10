import React, { FunctionComponent } from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './index'

const HomeRouters: FunctionComponent = () => {
  return (
    <>
      <Switch>
        <Route path={`/`}>
          <Home />
        </Route>
        <Route path={`/users/*`}>
          <div>404</div>
        </Route>
      </Switch>
    </>
  )
}

export default HomeRouters
