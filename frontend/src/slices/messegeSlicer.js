import { createSlice } from '@reduxjs/toolkit';

export const messegeSlice = createSlice({
  name: 'toggle',
  initialState: {
    messege: [],
    conversation: [],
    currentChat: [],
  },
  reducers: {
    setMessege: (state, action) => {
      // Check if the payload is a function before executing it
      if (typeof action.payload === 'function') {
        state.messege = action.payload(state.messege);
      }else{
        state.messege =action.payload
      }
    },
    setConversation: (state, action) => {
      state.conversation = action.payload;
    },
    setCurrentChat: (state, action) => {
      state.currentChat = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setConversation, setMessege, setCurrentChat } = messegeSlice.actions;

export default messegeSlice.reducer;
