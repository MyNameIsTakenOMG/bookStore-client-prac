import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React from 'react';
import { useDispatch } from 'react-redux';
import * as yup from 'yup';
import { login } from '../../redux-store/userSlice';

const validationSchema = yup.object({
  email: yup
    .string('enter email address')
    .email('enter valid email address')
    .required('email is required'),
  password: yup
    .string('enter password')
    .min(8, 'password should be at least 8 characters')
    .required('password is required'),
});

export default function Login() {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema,
    onSubmit: (values) => {
      dispatch(login({ email: values.email, password: values.password }));
    },
  });

  return (
    <form autoComplete="off" noValidate onSubmit={formik.handleSubmit}>
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
            value={formik.values.email}
            onChange={formik.handleChange}
            helperText={formik.touched.email && formik.errors.email}
            error={formik.touched.email && Boolean(formik.errors.email)}
          />
          <TextField
            sx={{ marginTop: '2rem' }}
            name="password"
            id="password"
            data-testid="password-testid"
            label="enter password"
            variant="outlined"
            placeholder="enter password"
            value={formik.values.password}
            onChange={formik.handleChange}
            helperText={formik.touched.password && formik.errors.password}
            error={formik.touched.password && Boolean(formik.errors.password)}
          />
          <Button type="submit" variant="contained">
            login
          </Button>
        </Paper>
      </Box>
    </form>
  );
}
