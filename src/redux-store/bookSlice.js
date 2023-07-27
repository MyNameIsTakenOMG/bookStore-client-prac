import {
  createAsyncThunk,
  createSelector,
  createSlice,
} from '@reduxjs/toolkit';
import axios from 'axios';
import baseUrl from '../config/index';

export const fetchAllBooks = createAsyncThunk(
  'books/fetchAllBooks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${baseUrl}/api/v1/books`);
      return response.data;
    } catch (error) {
      return rejectWithValue({
        message: error.message,
        code: error.code,
      });
    }
  }
);

const bookSlice = createSlice({
  initialState: {
    books: [],
    isLoading: false,
    error: null,
  },
  name: 'bookSlice',
  reducers: {
    listBooks: (state) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(fetchAllBooks.pending, (state, action) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllBooks.fulfilled, (state, action) => {
      state.books = action.payload;
      state.isLoading = false;
    });
    builder.addCase(fetchAllBooks.rejected, (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    });
  },
});

export const { listBooks } = bookSlice.actions;

export const bookListSelector = createSelector(
  (reduxState) => reduxState.entities.book,
  (book) => book.books
);

export const bookListErrorSelector = createSelector(
  (reduxState) => reduxState.entities.book,
  (book) => book.error
);
export const bookListLoadingSelector = createSelector(
  (reduxState) => reduxState.entities.book,
  (book) => book.isLoading
);

export default bookSlice.reducer;
