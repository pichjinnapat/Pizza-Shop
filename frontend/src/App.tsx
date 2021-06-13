import React, { FunctionComponent } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import HomeRouters from './home/HomeRouters'
import OrderRouters from './orders/OrderRouters'

const App: FunctionComponent = () => {
  return (
    <Router>
      <Switch>
        <Route path="/orders">
          <OrderRouters />
        </Route>
        <Route exact path="/">
          <HomeRouters />
        </Route>
        <Route path="*">
          <div>404</div>
        </Route>
      </Switch>
    </Router>
  )
}

export default App
