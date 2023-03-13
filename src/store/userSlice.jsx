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
    setUser(state, action) {
      return {...state, ...action.payload}
    },
  },
})
export const {setUser} = UserSlice.actions
export default UserSlice.reducer
