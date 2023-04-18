import {createSlice} from '@reduxjs/toolkit'
import {setStoreCartItems} from 'helpers'
import {ITEMS_ADDRESS} from 'page/Cart/StepContent/Address/Address'
const initialState = {
  cartItems: [],
  total: 0,
  address: ITEMS_ADDRESS[0],
  paymentMethod: 'cash',
}

export const CartSlice = createSlice({
  name: 'cart',
  initialState,
  reducers: {
    setCartItems(state, action) {
      state.cartItems = action.payload
      setStoreCartItems(state.cartItems)
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
    setTotalPrice(state, action) {
      state.total = action.payload
    },
    setAddress(state, action) {
      state.address = action.payload
    },
    setPaymentMethod(state, action) {
      state.paymentMethod = action.payload
    },
    setDiscountCode(state, action) {
      state.discount = action.payload
    },
  },
})
export const {
  setCartItems,
  addCartItem,
  setQuantityCartItem,
  setTotalPrice,
  setAddress,
  setPaymentMethod,
  setDiscountCode,
} = CartSlice.actions

export default CartSlice.reducer
