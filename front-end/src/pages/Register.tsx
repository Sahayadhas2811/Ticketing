import React from 'react';
import { TextField, Button, Typography, Box, Container, Link } from '@mui/material';
import { Formik, Form, FormikHelpers } from 'formik';
import { useState } from 'react';
import * as yup from 'yup';
import { toast } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import { axiosPrivate } from '../axios/Axios';
import { useNavigate } from 'react-router-dom';
// Validation schema
const validationSchema = yup.object().shape({
  userID: yup
    .string()
    .required('Enter UserID')
    .matches(/^[1-9]*$/, 'Enter only in number')
    .min(5, 'UserID must be exactly 5 characters')
    .max(5, 'UserID must be exactly 5 characters'),
  userName: yup
    .string()
    .required('Enter UserName')
    .trim()
    .lowercase('Enter your Mail address in lower Case'),
  email: yup
    .string()
    .required('Enter your Email')
    .email('Invalid Email')
    .lowercase()
    .trim(),
  password: yup
    .string()
    .required('Enter Password')
    .min(8, 'Password must be at least 8 characters')
    .max(16, 'Password must be at most 16 characters')
    .matches(/[a-z]+/, 'One lowercase character')
    .matches(/[A-Z]+/, 'One uppercase character')
    .matches(/[@$!%*#?&]+/, 'One special character')
    .matches(/\d+/, 'One number'),
  confirmPass: yup
    .string()
    .required('Confirm the Password')
    .oneOf([yup.ref('password')], 'Passwords must match'),
});

interface Register {
  userID:string,
  userName:string,
  email:string,
  password:string,
  confirmPass:string,
}

// Initial values
const initialValues:Register = {
  userID: '',
  userName: '',
  email: '',
  password: '',
  confirmPass: '',
};

const RegisterPage = () => {
  const [isloading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();
  const handleSubmit = async (values: Register, {resetForm}:FormikHelpers<Register>) => {
    setIsLoading(true)
    try {
      const response = await axiosPrivate.post('/register/createRegister', values);
      console.log('Response Recieved:', response)
      setIsLoading(false)
      toast.success(response.data.message);
      resetForm();
      navigate('/Login');
    } catch (error) {
      setIsLoading(false)
      toast.error('Registration failed. Please try again.');
      
    }
  };

  return (
    <Container component="main" maxWidth="xs">
      <Box sx={{ display: 'flex', 
        flexDirection: 'column', 
        alignItems: 'center', 
        mt: 8,
        border:'1px solid #ccc',
        padding:3,
        borderRadius:5,
        boxShadow:'0 4px 10px rgba(0, 0, 0, 0.1)', 
        }}>
        <Typography component="h1" variant="h5">
          Welcome
        </Typography>
        <Typography>
          Register to continue
        </Typography>
        <Formik 
        initialValues={initialValues} 
        validationSchema={validationSchema} 
        onSubmit={handleSubmit}
        >
          {({ handleChange, values, errors, touched, resetForm, handleBlur}) => (
            <Form>
              <TextField
                margin="dense"
                fullWidth
                label="UserID*"
                name="userID"
                value={values.userID}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.userID && Boolean(errors.userID)}
                helperText={touched.userID && errors.userID}
              />
              <TextField
                margin="dense"
                fullWidth
                label="UserName*"
                name="userName"
                value={values.userName}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.userName && Boolean(errors.userName)}
                helperText={touched.userName && errors.userName}
              />
              <TextField
                margin="dense"
                fullWidth
                label="Email*"
                name="email"
                type="email"
                value={values.email}
                onChange={handleChange}
                onBlur={handleBlur}
                error={touched.email && Boolean(errors.email)}
                helperText={touched.email && errors.email}
              />
              <TextField
              margin='dense'
              fullWidth
              name='password'
              label='Password*'
              type='password'
              value={values.password}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.password && Boolean(errors.password)}
              helperText={touched.password && errors.password}
              />
              <TextField
              margin='dense'
              fullWidth
              name='confirmPass'
              label='Confirm Password*'
              type='password'
              value={values.confirmPass}
              onChange={handleChange}
              onBlur={handleBlur}
              error={touched.confirmPass && Boolean(errors.confirmPass)}
              helperText ={touched.confirmPass && errors.confirmPass}
              />
              <Button type="submit" fullWidth variant="contained" color="primary" sx={{ mt: 3, mb: 2 }}>
                Register
              </Button>
              <Typography variant='body2' align='center'>
                Already an user {' '}
                <Link href='/Login' variant='body2' sx={{color:"black", textDecoration:'none', "&:hover": {color:'blue', textDecoration:'underline'} }}>
                login
              </Link>
              </Typography>
              
            </Form>
          )}
        </Formik>
      </Box>
    </Container>
  );
};

export default RegisterPage;
