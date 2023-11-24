import { createSlice } from '@reduxjs/toolkit'

 

export const authSlicer= createSlice({
  name: 'auth',
  initialState:{
    userData:false,
    friendData:[]
  },
  reducers: {
    
    setUserData: (state, action) => {
      state.userData = action.payload
    },
    setFriendData:(state,action)=>{
      state.friendData=action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUserData,setFriendData } = authSlicer.actions

export default authSlicer.reducer