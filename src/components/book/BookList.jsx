import React from 'react';
import PropTypes from 'prop-types';
import { Box } from '@mui/material';

const propTypes = {
  books: PropTypes.arrayOf({
    id: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
    releaseYear: PropTypes.number.isRequired,
  }).isRequired,
};

BookList.prototype = propTypes;

export default function BookList({ books }) {
  return (
    <Box>
      {books.map((book) => (
        <div key={book.id}>{book.id}</div>
      ))}
    </Box>
  );
}
