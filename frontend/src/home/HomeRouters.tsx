import React, { FunctionComponent } from 'react'
import { Route, Switch } from 'react-router-dom'
import Home from './index'

const HomeRouters: FunctionComponent = () => {
  return (
    <>
      <Switch>
        <Route exact path={`/`}>
          <Home />
        </Route>
        <Route path={`/*`}>
          <div>404</div>
        </Route>
      </Switch>
    </>
  )
}

export default HomeRouters
