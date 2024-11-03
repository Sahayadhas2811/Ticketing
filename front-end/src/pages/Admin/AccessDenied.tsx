import { Box, Button, Dialog, DialogContent, DialogTitle, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { axiosPrivate } from "../../axios/Axios";
import { toast } from "react-toastify";
import { jwtDecode } from "jwt-decode";
import { Form, Formik } from "formik";

interface UserDetails {
    userID:string,
    userName:string,
    email:string,
    reason:string
}

const AccessDenied:React.FC = ()=>{

    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const token = localStorage.getItem('token')
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [userName, setUserName] = useState<string | null>(null);
    const [userID, setUserID] = useState<string | null> (null);
    const [email, setEmail] = useState<string | null>(null);

    useEffect(()=>{
        if(token){
            const decodedToken:UserDetails = jwtDecode(token);
            setUserName(decodedToken.userName);
            setUserID(decodedToken.userID);
            setEmail(decodedToken.email);
        }
    },[token])

    const handleOPenDialog = ()=>{
        setOpenDialog(true)
    }
    const handleCloseDialog = ()=>{
        setOpenDialog(false)
    }

    const onsubmit = async(values:UserDetails)=>{
        setIsLoading(true)
        try {
            const response = await axiosPrivate.post('/adminPage/RequestAccess', values, {
                headers:{
                    'Authorization':`Bearer ${token}`
                }
            });
            setIsLoading(false);
            toast.success(response.data.data.message || 'Request Send Successfully')
        } catch (error:any) {
            toast.error(error.message || 'request failed to send');
            return (error.message)
        }
    };

    const initialValues:UserDetails = {
        userName:userName || '',
        userID:userID || '',
        email:email || '',
        reason:'',
    }

    return(
        <Box display={'flex'} 
        flexDirection={'column'}
        alignItems={'center'}
        justifyContent={'center'}
        mt={"25%"}
        ml={7}
        mr={7}
        
        >
            <Typography variant="h3" fontWeight={'bold'}>
                403
            </Typography>
            <Typography color="red" variant="h5" mt={1}>
                Access Denied!!!
            </Typography>
            <Typography align="center" mt={2}>
                Only Admin can Enter into this page. if you want admin access, please raise the Request Below
            </Typography>
            <Button variant="outlined" 
            type="submit" 
            sx={{mt:2}}
            onClick={handleOPenDialog}
            >
                Raise Request
            </Button>

            <Dialog
            open={openDialog}
            onClose={handleCloseDialog}
            >
                <DialogTitle>
                    Admin Request
                </DialogTitle>
                <DialogContent>
                <Formik
                initialValues={initialValues}
                onSubmit={onsubmit}
                >
                    {({values, errors, handleChange, handleBlur})=>{
                        return(
                            <Form>
                                <TextField
                                name="reason"
                                label="Reason"
                                fullWidth
                                value={values.reason}
                                onChange={handleChange}
                                onBlur={handleBlur}
                                />
                                
                                <Button
                                type="submit"
                                disabled={isLoading}
                                fullWidth
                                variant="contained"
                                sx={{
                                    mt:2
                                }}
                                >
                                    Submit
                                </Button>
                            </Form>
                        )
                    }}
                </Formik>

                </DialogContent>
            </Dialog>
        </Box>
    )
}

export default AccessDenied