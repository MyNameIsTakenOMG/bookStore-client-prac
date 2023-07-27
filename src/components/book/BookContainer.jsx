import { Box, Skeleton } from '@mui/material';
import React, { useEffect } from 'react';
import BookFilter from './BookFilter';
import { useDispatch, useSelector } from 'react-redux';
import {
  bookListErrorSelector,
  bookListSelector,
  fetchAllBooks,
  bookListLoadingSelector,
} from '../../redux-store/bookSlice';
import BookList from './BookList';

export default function BookContainer() {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(fetchAllBooks());

    return () => {};
  }, [dispatch]);

  const books = useSelector(bookListSelector);
  const error = useSelector(bookListErrorSelector);
  const isLoading = useSelector(bookListLoadingSelector);
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', flexFlow: 'row' }}>
      <BookFilter />
      <Box sx={{ width: '80%' }}>
        {isLoading && (
          <Box>
            <Skeleton
              variant="rectangular"
              animation="pulse"
              width="80%"
              height="200px"
            />
          </Box>
        )}
        {books.length > 0 && <BookList books={books} />}
        {error && error.message}
      </Box>
    </Box>
  );
}
