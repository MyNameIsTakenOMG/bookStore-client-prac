import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import React from 'react';

export default function Login() {
  return (
    <form autoComplete="off" noValidate>
      <Box sx={{ display: 'flex', justifyContent: 'center' }}>
        <Paper
          sx={{ display: 'flex', flexFlow: 'column nowrap', padding: '20px' }}
        >
          <Typography variant="h4">Book Store Login</Typography>
          <TextField
            sx={{ marginTop: '2rem' }}
            name="email"
            id="email"
            data-testid="email-testid"
            label="enter email address"
            variant="outlined"
            placeholder="enter email address"
          />
          <TextField
            sx={{ marginTop: '2rem' }}
            name="password"
            id="password"
            data-testid="password-testid"
            label="enter password"
            variant="outlined"
            placeholder="enter password"
          />
          <Button type="submit" variant="contained">
            login
          </Button>
        </Paper>
      </Box>
    </form>
  );
}
