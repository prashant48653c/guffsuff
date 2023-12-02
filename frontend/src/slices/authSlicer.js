import { createSlice } from '@reduxjs/toolkit'

 

export const authSlicer= createSlice({
  name: 'auth',
  initialState:{
    userData:false,
    friendData:[],
    allUser:[]
  },
  reducers: {
    
    setUserData: (state, action) => {
      state.userData = action.payload
    },
    setFriendData:(state,action)=>{
      state.friendData=action.payload
    },
    setAllUser:(state,action)=>{
      state.allUser=action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUserData,setFriendData,setAllUser } = authSlicer.actions

export default authSlicer.reducer