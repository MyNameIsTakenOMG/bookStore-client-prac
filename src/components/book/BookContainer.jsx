import { Box } from '@mui/material';
import React from 'react';
import BookFilter from './BookFilter';

export default function BookContainer() {
  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', flexFlow: 'row' }}>
      <BookFilter />
      <Box sx={{ width: '80%' }}>here we will display all books.</Box>
    </Box>
  );
}
