import { createSlice } from '@reduxjs/toolkit'

 

export const messegeSlicer = createSlice({
  name: 'toggle',
  initialState:{
    messege:[],
    conversation:[],
    currentChat:null,
   
  },
  reducers: {
    
    setMessege: (state, action) => {
      state.messege = action.payload
    },
    setConversation: (state, action) => {
        state.conversation = action.payload
      },
      setCurrentChat: (state, action) => {
        state.currentChat = action.payload
      },
  },
})

// Action creators are generated for each case reducer function
export const { setConversation,setMessege,setCurrentChat } = messegeSlicer.actions

export default messegeSlicer.reducer