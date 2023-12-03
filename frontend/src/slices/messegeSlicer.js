import { createSlice } from '@reduxjs/toolkit';

export const messegeSlice = createSlice({
  name: 'toggle',
  initialState: {
    messege: [],
    conversation: [],
    currentChat: [],
    emoGif: '',
    senderGif: '',
  },
  reducers: {
    setMessege: (state, action) => {
      // Check if the payload is a function before executing it
      const payloadValue = typeof action.payload === 'function' ? action.payload(state.messege) : action.payload;
      state.messege = payloadValue;
    },
    setConversation: (state, action) => {
      state.conversation = action.payload;
    },
    setCurrentChat: (state, action) => {
      state.currentChat = action.payload;
    },
    setEmoGif: (state, action) => {
      state.emoGif = action.payload;
    },
    setSenderGif: (state, action) => {
      state.senderGif = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setConversation, setMessege, setCurrentChat, setEmoGif, setSenderGif } = messegeSlice.actions;

export default messegeSlice.reducer;
