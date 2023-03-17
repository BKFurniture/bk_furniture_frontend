import {createSlice} from '@reduxjs/toolkit'
import {setStoreCartItems} from 'helpers'
const initialState = {
  snackbar: {
    open: false,
    message: 'Please add meessage',
    severity: 'success',
  },
  cartItems: [],
}

export const AppSlice = createSlice({
  name: 'app',
  initialState,
  reducers: {
    setSnackbar(state, action) {
      if (action.payload.open) {
        state.snackbar = {...action.payload}
      } else state.snackbar.open = false
    },
    setCartItems(state, action) {
      state.cartItems = action.payload
    },
    addCartItem(state, action) {
      let existItem = state.cartItems
        .map((item) => item.id)
        .includes(action.payload.id)
      if (!existItem) {
        state.cartItems.push(action.payload)
        setStoreCartItems(state.cartItems)
      }
    },
    setQuantityCartItem(state, action) {
      if (action.payload.quantity == 0) {
        state.cartItems = state.cartItems.filter(
          (item) => item.id !== action.payload.id,
        )
      } else {
        state.cartItems = state.cartItems.map((item) => {
          if (item.id == action.payload.id) {
            return {
              ...item,
              quantity: action.payload.quantity,
            }
          } else return item
        })
      }
      setStoreCartItems(state.cartItems)
    },
  },
})
export const {setSnackbar, setCartItems, addCartItem, setQuantityCartItem} =
  AppSlice.actions

export default AppSlice.reducer
