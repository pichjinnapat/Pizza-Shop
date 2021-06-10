import React, { FunctionComponent } from 'react'
import { useHistory } from 'react-router-dom'

const SiteHeader: FunctionComponent = () => {
  const history = useHistory()
  return (
    <div className="container mx-auto bg-primary rounded-b-full flex justify-between shadow-md px-6 py-2 h-12 relative">
      <button className=" h-14 w-14" onClick={() => history.push('/')}>
        <img className=" top-0" src="/img/logo.png" alt="logo" />
      </button>
      <button
        className="text-sm font-bold bg-secondary rounded-full p-2 focus:outline-none transition ease-out duration-500 hover:bg-orange-800 hover:text-white"
        onClick={() => history.push('/orders')}
      >
        ORDER PIZZA
      </button>
    </div>
  )
}

export default SiteHeader
