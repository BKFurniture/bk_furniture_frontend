import {getAccessToken} from 'helpers'
import React, {useEffect} from 'react'
import {useDispatch} from 'react-redux'
import {Outlet} from 'react-router-dom'
import {setUser} from 'store/userSlice'

const AppProvider = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    const accessToken = getAccessToken()
    console.log(accessToken, 'oke')
    if (accessToken) dispatch(setUser({accessToken}))
  }, [])
  return <Outlet />
}

export default AppProvider
