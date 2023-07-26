import React from 'react';
import PropTypes from 'prop-types';
import { Avatar, Box, Paper, Typography } from '@mui/material';

const propTypes = {
  book: PropTypes.shape({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    releaseYear: PropTypes.number.isRequired,
  }).isRequired,
};

export default function BookListItem({ book }) {
  return (
    <Box mb={2}>
      <Paper
        elevation={2}
        sx={{ padding: '10px', display: 'flex', width: '80%' }}
      >
        <Avatar variant="square" sx={{ width: '180px', height: '200px' }}>
          {book.title}
        </Avatar>
        <Box ml={1}>
          <Typography variant="h5">{book.title}</Typography>
          <Typography variant="h5">{book.description}</Typography>
          <Typography variant="h5">{book.releaseYear}</Typography>
        </Box>
      </Paper>
    </Box>
  );
}

BookListItem.propTypes = propTypes;
