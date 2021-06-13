import React, { FunctionComponent } from 'react'
import { useDispatch } from 'react-redux'
import { Redirect } from 'react-router-dom'
import { initialOrderState } from '../reducers/OrderReducer'
import { initialUserState } from '../reducers/UserReducer'

const Home: FunctionComponent = () => {
  const dispatch = useDispatch()

  dispatch(initialOrderState())
  dispatch(initialUserState())

  return <Redirect to="/orders" />
}

export default Home
