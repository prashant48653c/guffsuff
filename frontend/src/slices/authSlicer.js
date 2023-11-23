import { createSlice } from '@reduxjs/toolkit'

 

export const authSlicer= createSlice({
  name: 'auth',
  initialState:{
    userData:false
  },
  reducers: {
    
    setUserData: (state, action) => {
      state.userData = action.payload
    },
  },
})

// Action creators are generated for each case reducer function
export const { setUserData } = authSlicer.actions

export default authSlicer.reducer