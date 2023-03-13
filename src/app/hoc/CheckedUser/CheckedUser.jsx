import React from 'react'
import {useSelector} from 'react-redux'
import {Navigate, Outlet} from 'react-router-dom'
const CheckedUser = () => {
  const isUser = useSelector((state) => state.user.accessToken)
  return !isUser ? <Outlet /> : <Navigate to="/" replace />
}

export default CheckedUser
