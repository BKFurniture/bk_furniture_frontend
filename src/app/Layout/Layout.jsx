import React from 'react'
import Footer from './Footer'
import Header from './Header'
import {Outlet} from 'react-router-dom'
import {Container} from '@mui/material'
import ChatBox from 'page/ChatBox'
const Layout = () => {
  return (
    <>
      <Header />
      <Container style={{backgroundColor: '#F0F0F0', padding: '40px 0'}}>
        <Outlet />
        <ChatBox />
      </Container>
      <Footer />
    </>
  )
}

export default Layout
