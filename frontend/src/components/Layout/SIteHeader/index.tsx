import React, { FunctionComponent } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { initialOrderState } from '../../../reducers/OrderReducer'
import { initialUserState } from '../../../reducers/UserReducer'

const SiteHeader: FunctionComponent = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  return (
    <div className="container mx-auto bg-primary rounded-b-full flex justify-between shadow-md px-6 py-2 h-12 relative">
      <button className="h-14 w-14 focus:outline-none" onClick={() => history.push('/')}>
        <img className="top-0" src="/img/logo.png" alt="logo" />
      </button>
      <button
        className="text-sm font-bold bg-red-500 rounded-full p-2 focus:outline-none transition ease-out duration-500 hover:bg-orange-800 text-white"
        onClick={() => {
          dispatch(initialOrderState())
          dispatch(initialUserState())
          history.push('/orders')
        }}
      >
        ORDER PIZZA
      </button>
    </div>
  )
}

export default SiteHeader
