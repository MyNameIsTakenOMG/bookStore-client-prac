import { Box, Button, Paper, TextField, Typography } from '@mui/material';
import React from 'react';
import * as yup from 'yup';
import { useFormik } from 'formik';
import { useDispatch, useSelector } from 'react-redux';
import { register, userLoadingSelector } from '../../redux-store/userSlice';

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

  return (
    <Box>
      <Typography>Registration</Typography>
      <Paper>
        <form
          noValidate
          autoComplete="off"
          onSubmit={registerForm.handleSubmit}
        >
          <TextField
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
          <Button type="submit" disabled={userLoading}>
            register
          </Button>
        </form>
      </Paper>
    </Box>
  );
}
