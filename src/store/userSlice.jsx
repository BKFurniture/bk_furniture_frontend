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
    logout() {
      window.localStorage.removeItem('access_token')
      return {...initialState}
    },
  },
})
export const {setUser, logout} = UserSlice.actions
export default UserSlice.reducer
