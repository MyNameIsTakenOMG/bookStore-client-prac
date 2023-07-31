import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import React, { useEffect } from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import {
  register,
  userErrorSelector,
  userIdSelector,
  userLoadingSelector,
} from '../../redux-store/userSlice';
import { useNavigate } from 'react-router-dom';
import { useSnackbar } from 'notistack';

const registrationSchema = yup.object({
  name: yup.string().required('name is required'),
  email: yup
    .string()
    .email('should be an valid email')
    .required('email is required'),
  password: yup
    .string()
    .min(8, 'password should be at least 8 chars')
    .required('password is required'),
});

export default function Register() {
  const navigate = useNavigate();
  const { enqueueSnackbar } = useSnackbar();
  const userId = useSelector(userIdSelector);
  const userError = useSelector(userErrorSelector);
  const userLoading = useSelector(userLoadingSelector);
  const dispatch = useDispatch();
  const registerForm = useFormik({
    validationSchema: registrationSchema,
    initialValues: {
      email: '',
      password: '',
      name: '',
    },
    onSubmit: (values) => {
      dispatch(
        register({
          name: values.name,
          email: values.email,
          password: values.password,
        })
      );
    },
  });

  useEffect(() => {
    if (userError !== null) {
      enqueueSnackbar({
        variant: 'error',
        message: 'server error',
      });
    } else if (!userLoading && userId !== '') {
      enqueueSnackbar({
        variant: 'success',
        message: 'registered successfully',
      });
      navigate('/login');
    }
    return () => {};
  }, [userError, userLoading, userId, enqueueSnackbar, navigator]);

  return (
    <Box sx={{ margin: 'auto', width: '40%' }}>
      <Typography
        sx={{ textAlign: 'center', fontWeight: 'bold', fontSize: 'larger' }}
      >
        Registration
      </Typography>
      <Paper
        sx={{ padding: '20px', display: 'flex', flexFlow: 'column nowrap' }}
      >
        <form
          noValidate
          autoComplete="off"
          onSubmit={registerForm.handleSubmit}
        >
          <TextField
            sx={{ margin: '12px' }}
            id="name"
            name="name"
            variant="outlined"
            label="enter user name"
            value={registerForm.values.name}
            onChange={registerForm.handleChange}
            helperText={registerForm.touched.name && registerForm.errors.name}
            error={
              registerForm.touched.name && Boolean(registerForm.errors.name)
            }
          />
          <TextField
            sx={{ margin: '12px' }}
            id="email"
            name="email"
            variant="outlined"
            label="enter email address"
            type="email"
            value={registerForm.values.email}
            onChange={registerForm.handleChange}
            helperText={registerForm.touched.email && registerForm.errors.email}
            error={
              registerForm.touched.email && Boolean(registerForm.errors.email)
            }
          />
          <TextField
            sx={{ margin: '12px' }}
            id="password"
            name="password"
            variant="outlined"
            label="enter password"
            type="password"
            value={registerForm.values.password}
            onChange={registerForm.handleChange}
            helperText={
              registerForm.touched.password && registerForm.errors.password
            }
            error={
              registerForm.touched.password &&
              Boolean(registerForm.errors.password)
            }
          />
          <Button
            sx={{ margin: '12px auto', width: '25%' }}
            type="submit"
            disabled={userLoading}
          >
            register
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
