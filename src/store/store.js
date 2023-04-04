import {configureStore} from '@reduxjs/toolkit'
import userReducer from './userSlice'
import appReducer from './appSlice'
import cartReducer from './cartSlice'
export const store = configureStore({
  reducer: {
    user: userReducer,
    app: appReducer,
    cart: cartReducer,
  },
})
