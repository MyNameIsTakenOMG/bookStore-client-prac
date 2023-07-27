import { configureStore } from '@reduxjs/toolkit';
import { combinedReducers } from './combinedReducers';

export const store = configureStore({
  reducer: {
    entities: combinedReducers,
  },
});
