import { Box } from '@mui/material';
import React from 'react';
import PropTypes from 'prop-types';
import Header from './Header';
import { Outlet } from 'react-router-dom';

const propTypes = {
  children: PropTypes.node.isRequired,
};

export default function Layout() {
  return (
    <Box>
      <Box>
        <Header />
      </Box>
      <Box mt={8} ml={5}>
        <Outlet />
      </Box>
    </Box>
  );
}

Layout.prototype = propTypes;
