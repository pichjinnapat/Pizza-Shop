import React, { FunctionComponent } from 'react'
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom'
import HomeRouters from './home/HomeRouters'
import OrderRouters from './orders/OrderRouters'
import UserRouters from './users/UserRouters'

const App: FunctionComponent = () => {
  return (
    <Router>
      <div>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/orders">Orders</Link>
            </li>
            <li>
              <Link to="/users">Users</Link>
            </li>
          </ul>
        </nav>

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
      </div>
    </Router>
  )
}

export default App
