import React from 'react'
import {useSelector} from 'react-redux'
import {Navigate, Outlet} from 'react-router-dom'
const CheckedUser = ({accessPage}) => {
  const isUser = useSelector((state) => state.user.accessToken)
  if (accessPage)
    return isUser ? <Outlet /> : <Navigate to="/sign-in" replace />
  return !isUser ? <Outlet /> : <Navigate to="/" replace />
}

export default CheckedUser
