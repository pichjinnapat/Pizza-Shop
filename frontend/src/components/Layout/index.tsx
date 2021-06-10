import React, { FunctionComponent } from 'react'
import SiteHeader from './SIteHeader'

const Layout: FunctionComponent = ({ children }) => {
  return (
    <>
      <SiteHeader />
      {children}
    </>
  )
}

export default Layout
