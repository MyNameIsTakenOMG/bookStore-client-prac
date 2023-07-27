import { combineReducers } from '@reduxjs/toolkit';
import bookReducer from './bookSlice';

export const combinedReducers = combineReducers({
  book: bookReducer,
});
