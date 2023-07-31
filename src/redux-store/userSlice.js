import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
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

export const register = createAsyncThunk(
  'user/register',
  async (userRegisterInfo, { rejectWithValue }) => {
    try {
      const { name, email, password } = userRegisterInfo;
      const response = await axios.post(`${baseUrl}/api/v1/register`, {
        name: name,
        email: email,
        password: password,
      });
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error.message,
        code: error.code,
      });
    }
  }
);

// matchers
const isUserSlicePending = (action) => {
  return action.type.startsWith('user') && action.type.endsWith('pending');
};
const isUserSliceRejected = (action) => {
  return action.type.startsWith('user') && action.type.endsWith('rejected');
};

const userSlice = createSlice({
  initialState: {
    userId: '',
    token: localStorage.getItem('bookstore-token'),
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
      .addCase(register.fulfilled, (state, action) => {
        state.isLoading = false;
        state.userId = action.payload;
      })
      .addMatcher(isUserSlicePending, (state, action) => {
        state.isLoading = true;
      })
      .addMatcher(isUserSliceRejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
      });
  },
});

export default userSlice.reducer;

// selector
export const userTokenSelector = createSelector(
  (reduxState) => reduxState.entities.user,
  (user) => user.token
);
export const userLoadingSelector = createSelector(
  (reduxState) => reduxState.entities.user,
  (user) => user.isLoading
);
export const userErrorSelector = createSelector(
  (reduxState) => reduxState.entities.user,
  (user) => user.error
);
export const userIdSelector = createSelector(
  (reduxState) => reduxState.entities.user,
  (user) => user.userId
);
