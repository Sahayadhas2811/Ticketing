import React from "react";
import { useState, } from "react";
import {Formik, Form, FormikHelpers} from 'formik'
import { axiosPrivate } from "../axios/Axios";
import { toast } from "react-toastify";
import { Box, Button, Container, TextField, Typography, Link } from "@mui/material";
import * as yup from 'yup';
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import { useDispatch } from "react-redux";
import { setCredential } from "../Redux/AuthSlice";

const schema = yup.object().shape({
    email:yup
    .string()
    .email('Enter Valid Email')
    .required('Email is required'),
    password:yup
    .string()
    .required('Password is required')
})

interface LoginUser {
    email:string,
    password:string
}

const initialValues:LoginUser ={
    email:'',
    password:'',
}

const Login: React.FC = ()=>{

    const [isloading, setIsLoading] = React.useState(false);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async(values:LoginUser, {resetForm}:FormikHelpers<LoginUser>)=>{
         setIsLoading(true)
        try {
            const responce = await axiosPrivate.post('/login/loginUser', values, );
            console.log("Login Responce:", responce)
            if(responce.data.status === 'Success'){
                const token = responce.data.token;
                console.log('Token:', token);
                localStorage.setItem('token', token)// for home page use. 
                
                const decodedToken:any = jwtDecode(token);
                const {role, userName} = decodedToken;
                console.log('DecodederRole:', role)
                toast.success(`Welcome ${decodedToken.userName}`);

                dispatch(setCredential({userName, role, token}));
                navigate('/Home')
                
            }else{
                toast.error(responce.data.message)
            }
            setIsLoading(false);
            resetForm();
         } catch (error) {
            setIsLoading(false);
            toast.error('Login Failed, Please Try Again Later')
         }
    }

    return(
        <Container component='main' maxWidth='xs'>
            <Box sx={{
                width:300,
                display:"flex",
                flexDirection:"column",
                alignItems:'center',
                mt:8,
                border:'1px solid #ccc',
                padding:'20px',
                borderRadius:5,
                boxShadow:'0 4px 10px rgba(0, 0, 0, 0.1)'

            }}>
                <Typography component='h1' variant="h5" >
                    Login
                </Typography>
                <Typography sx={{mb:1}}>
                    Login to Continoue
                </Typography>
                <Formik
                initialValues={initialValues}
                onSubmit={handleLogin}
                validationSchema={schema}
                >
                    {({values, handleBlur, handleChange, touched, errors})=>{
                        return(
                            <Form>
                                <TextField
                                margin="dense"
                                fullWidth
                                name="email"
                                type="email"
                                label='Email*'
                                onBlur={handleBlur}
                                value={values.email}
                                onChange={handleChange}
                                error={touched.email && Boolean(errors.email)}
                                helperText={touched.email && errors.email}
                                />
                                <TextField
                                margin="dense"
                                fullWidth
                                name="password"
                                type="password"
                                label='Password*'
                                onBlur={handleBlur}
                                value={values.password}
                                onChange={handleChange}
                                error={touched.password && Boolean(errors.password)}
                                helperText={touched.password && errors.password}
                                />
                                <Button type="submit" fullWidth variant="contained" sx={{mt:3, mb:2}}>
                                    Login
                                </Button>
                                <Typography align="center">
                                    New User? <Link href='/RegisterUser' variant='body2' sx={{color:'black', textDecoration:'none', "&:hover":{color:'blue', textDecoration:'underline'}}} >Register</Link>
                                    {' '}to Continue
                                </Typography>
                            </Form>
                        )
                    }}
                </Formik>
            </Box>
        </Container>
    )
}

export default Login;