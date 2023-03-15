import {createSlice} from '@reduxjs/toolkit'

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
        window.localStorage
          ? window.localStorage.setItem(
              'cartItems',
              JSON.stringify(state.cartItems),
            )
          : null
      }
    },
  },
})
export const {setSnackbar, setCartItems, addCartItem} = AppSlice.actions
export default AppSlice.reducer
