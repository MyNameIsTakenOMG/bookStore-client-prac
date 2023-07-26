import { Box } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';

const propTypes = {
  children: PropTypes.node.isRequired,
};

export default function Layout({ children }) {
  return (
    <Box>
      <Box>
        <Header />
      </Box>
      <Box mt={8} ml={5}>
        {children}
      </Box>
    </Box>
  );
}

Layout.prototype = propTypes;
