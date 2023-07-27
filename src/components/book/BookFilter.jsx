import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { fetchBooksByTitle } from '../../redux-store/bookSlice';

export default function BookFilter() {
  const [searchText, setSearchText] = useState('');
  const dispatch = useDispatch();

  return (
    <Box sx={{ width: '20%', height: 500 }}>
      <Paper sx={{ width: '100%', height: '100%' }}>
        <Typography>book filter</Typography>
        <Box>
          <TextField
            label="enter-book-title"
            value={searchText}
            onChange={(e) => {
              setSearchText(e.target.value);
            }}
          />
        </Box>
        <Button
          onClick={() => {
            dispatch(fetchBooksByTitle(searchText));
          }}
        >
          Search
        </Button>
      </Paper>
    </Box>
  );
}
