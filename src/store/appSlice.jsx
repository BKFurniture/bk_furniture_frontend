import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  snackbar: {
    open: false,
    message: 'Please add meessage',
    severity: 'success',
  },
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
  },
})
export const {setSnackbar} = AppSlice.actions
export default AppSlice.reducer
