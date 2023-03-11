import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  accessToken: null,
  refreshToken: null,
  username: null,
  first_name: null,
}

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    signIn(state, action) {
      state.accessToken = action.payload.accessToken
      state.refreshToken = action.payload.refreshToken
      state.username = action.payload.username
      state.first_name = action.payload.first_name
    },
  },
})
export const {signIn} = UserSlice.actions
export default UserSlice.reducer
