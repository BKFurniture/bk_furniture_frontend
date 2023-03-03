import {createSlice} from '@reduxjs/toolkit'

const initialState = {
  value: 0,
}

export const UserSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {},
})

export default UserSlice.reducer
