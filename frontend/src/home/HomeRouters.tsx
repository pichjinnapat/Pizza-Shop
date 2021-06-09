import React, { FunctionComponent } from 'react'
import { Route } from 'react-router-dom'
import Home from './index'

const HomeRouters: FunctionComponent = () => {
  return (
    <>
      <Route path={`/`}>
        <Home />
      </Route>
    </>
  )
}

export default HomeRouters
