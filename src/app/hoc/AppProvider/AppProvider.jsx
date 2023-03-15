import {getAccessToken} from 'helpers'
import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Outlet, useNavigate} from 'react-router-dom'
import {setUser} from 'store/userSlice'

const AppProvider = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = useSelector((state) => state.user.accessToken)
  useEffect(() => {
    const accessToken = getAccessToken()
    if (accessToken && !token) dispatch(setUser({accessToken}))
  }, [navigate])
  return <Outlet />
}

export default AppProvider
