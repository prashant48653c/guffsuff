import { configureStore } from '@reduxjs/toolkit';
import toggleReducer from './slices/toggleSlicer'; // Assuming `toggleSlicer` has a `reducer` property
import messegeSlicer from './slices/messegeSlicer';

export const store = configureStore({
  reducer: {
    toggle: toggleReducer,
    conversation:messegeSlicer
  },
});
