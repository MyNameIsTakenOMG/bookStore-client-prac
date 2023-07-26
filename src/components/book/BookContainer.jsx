import { Box } from '@mui/material';
import React, { useEffect } from 'react';
import BookFilter from './BookFilter';
import { useDispatch, useSelector } from 'react-redux';
import {
  bookListErrorSelector,
  bookListSelector,
  fetchAllBooks,
} from '../../redux-store/bookSlice';

export default function BookContainer() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllBooks());

    return () => {};
  }, []);

  const books = useSelector(bookListSelector);
  const error = useSelector(bookListErrorSelector);
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', flexFlow: 'row' }}>
      <BookFilter />
      <Box sx={{ width: '80%' }}>
        here we will display all books.
        {books.length > 0 && books.length}
        {error && error.message}
      </Box>
    </Box>
  );
}
