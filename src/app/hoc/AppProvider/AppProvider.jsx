import {getAccessToken, getItemLocalStorage, getRefreshToken} from 'helpers'
import React, {useEffect} from 'react'
import {useDispatch, useSelector} from 'react-redux'
import {Outlet, useNavigate} from 'react-router-dom'
import {setUser} from 'store/userSlice'
import userApi from 'api/user'
import {setCartItems} from 'store/appSlice'
const AppProvider = () => {
  const dispatch = useDispatch()
  const navigate = useNavigate()
  const token = useSelector((state) => state.user.accessToken)
  useEffect(() => {
    const accessToken = getAccessToken()
    const refreshToken = getRefreshToken()
    const cartItems = JSON.parse(getItemLocalStorage('cartItems'))
    if (accessToken && !token) {
      userApi.detail().then((res) => {
        dispatch(setUser({accessToken, refreshToken, ...res}))
      })
    }

    if (cartItems?.length) dispatch(setCartItems(cartItems))
  }, [navigate])
  return <Outlet />
}

export default AppProvider
