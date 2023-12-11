import { createSlice } from '@reduxjs/toolkit'

 

export const toggleSlicer = createSlice({
  name: 'toggle',
  initialState:{
    showEmoji:false,
    showGif:false,
    searchName:""
  },
  reducers: {
    
    setShowEmoji: (state, action) => {
      state.showEmoji = action.payload
    },
    setShowGif: (state, action) => {
        state.showGif = action.payload
      },
      setSearchName: (state, action) => {
        state.searchName = action.payload
      },
  },
})

// Action creators are generated for each case reducer function
export const { setShowEmoji,setShowGif,setSearchName } = toggleSlicer.actions

export default toggleSlicer.reducer