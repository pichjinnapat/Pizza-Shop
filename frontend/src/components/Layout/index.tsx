import React, { FunctionComponent } from 'react'
import SiteFooter from './SiteFooter'
import SiteHeader from './SIteHeader'

const Layout: FunctionComponent = ({ children }) => {
  return (
    <div className="bg-yellow-50 flex flex-col justify-between min-h-screen">
      <SiteHeader />
      <div className="container mx-auto p-4">
        <div>{children}</div>
      </div>
      <SiteFooter />
    </div>
  )
}

export default Layout
