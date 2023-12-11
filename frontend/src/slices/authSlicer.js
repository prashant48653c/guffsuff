import { createSlice } from '@reduxjs/toolkit'

 

export const authSlicer= createSlice({
  name: 'auth',
  initialState:{
    userData:false,
    friendData:[],
    allUser:[],
    onlineUser:[]
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
    },
    setOnlineUser:(state,action)=>{
      state.onlineUser=action.payload
    }
  },
})

// Action creators are generated for each case reducer function
export const { setUserData,setFriendData,setAllUser,setOnlineUser } = authSlicer.actions

export default authSlicer.reducer