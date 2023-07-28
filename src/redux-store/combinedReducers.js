import { combineReducers } from '@reduxjs/toolkit';
import bookReducer from './bookSlice';
import userReducer from './userSlice';

export const combinedReducers = combineReducers({
  book: bookReducer,
  user: userReducer,
});
