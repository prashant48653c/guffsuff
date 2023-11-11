import { configureStore } from '@reduxjs/toolkit';
import toggleReducer from './slices/toggleSlicer'; // Assuming `toggleSlicer` has a `reducer` property

export const store = configureStore({
  reducer: {
    toggle: toggleReducer,
  },
});
