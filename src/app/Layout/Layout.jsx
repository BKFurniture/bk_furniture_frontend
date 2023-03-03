import React from 'react'
import Footer from './Footer'
import Header from './Header'
import {Outlet} from 'react-router-dom'
import {Container} from '@mui/material'
const Layout = () => {
  return (
    <>
      <Header />
      <Container style={{backgroundColor: '#F0F0F0', padding: '40px 0'}}>
        <Outlet />
      </Container>
      <Footer />
    </>
  )
}

export default Layout
