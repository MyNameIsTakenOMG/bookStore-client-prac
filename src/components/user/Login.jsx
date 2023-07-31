import { Box, Button, Link, Paper, TextField, Typography } from '@mui/material';
import { useFormik } from 'formik';
import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import * as yup from 'yup';
import {
  login,
  userErrorSelector,
  userLoadingSelector,
  userTokenSelector,
} from '../../redux-store/userSlice';
import { useSnackbar } from 'notistack';
import { useNavigate } from 'react-router-dom';

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
  const userLoading = useSelector(userLoadingSelector);
  const userToken = useSelector(userTokenSelector);
  const userError = useSelector(userErrorSelector);
  const navigate = useNavigate();
  const { enqueueSnackbar, closeSnackbar } = useSnackbar();

  useEffect(() => {
    if (userError !== null) {
      enqueueSnackbar({
        variant: 'error',
        message: 'user credentials incorrect',
      });
    } else if (!userLoading && userToken !== '') {
      enqueueSnackbar({
        variant: 'success',
        message: 'successfully logged in',
      });
      navigate('/');
    }
    return () => {};
  }, []);

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

  const handleRegister = () => {
    navigator('/register');
  };
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
          <Button type="submit" variant="contained" disabled={userLoading}>
            login
          </Button>
          <br />
          <Link component="button" variant="body2" onClick={handleRegister}>
            Register
          </Link>
        </Paper>
      </Box>
    </form>
  );
}
