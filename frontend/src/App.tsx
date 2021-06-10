import React, { FunctionComponent } from 'react'
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom'
import HomeRouters from './home/HomeRouters'
import OrderRouters from './orders/OrderRouters'
import UserRouters from './users/UserRouters'

const App: FunctionComponent = () => {
  return (
    <Router>
      <Switch>
        <Route path="/orders">
          <OrderRouters />
        </Route>
        <Route path="/users">
          <UserRouters />
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
