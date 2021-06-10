import React, { FunctionComponent } from 'react'
import { Route, Switch } from 'react-router-dom'
import UserDashboard from './UserDashboard'

const UserRouters: FunctionComponent = () => {
  return (
    <>
      <Switch>
        <Route exact path={`/users`}>
          <UserDashboard />
        </Route>
        <Route path={`/users/*`}>
          <div>404</div>
        </Route>
      </Switch>
    </>
  )
}

export default UserRouters
