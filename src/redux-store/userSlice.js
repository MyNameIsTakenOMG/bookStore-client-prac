import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import baseUrl from '../config/index';

export const login = createAsyncThunk(
  'user/login',
  async (userCredential, { rejectWithValue }) => {
    try {
      const { email, password } = userCredential;
      const response = await axios.post(`${baseUrl}/api/v1/login`, {
        username: email,
        password: password,
      });
      localStorage.setItem('bookStore-token', response.data.token);
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error.message,
        code: error.code,
      });
    }
  }
);

const userSlice = createSlice({
  initialState: {
    token: '',
    isLoading: false,
    error: null,
  },
  name: 'user',
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isLoading = false;
        state.token = action.payload.token;
      })
      .addCase(login.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      })
      .addCase(login.pending, (state, action) => {
        state.isLoading = true;
      });
  },
});

export default userSlice.reducer;
