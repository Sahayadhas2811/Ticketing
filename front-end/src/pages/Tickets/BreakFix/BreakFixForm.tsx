import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  FormControlLabel,
  Grid,
  MenuItem,
  Radio,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import SideBar from "../../Components/Sidebar";
import Header from "../../Components/Header";
import * as yup from "yup";
import { useNavigate } from "react-router-dom";
import { axiosPrivate } from "../../../axios/Axios";
import { Field, Form, Formik, FormikHelpers } from "formik";
import "react-toastify/dist/ReactToastify.css";
import { toast } from "react-toastify";
import { RadioGroup } from "@mui/material";
import { jwtDecode } from "jwt-decode";


const validationSchema = yup.object().shape({
  projectType: yup
    .string()
    .oneOf(["Project Based", "Non-Project Based"], "Please Select one to Continue")
    .required("Select one to Continue"),
  issueDescription: yup
    .string()
    .required("Enter Issue Description")
    .max(1000)
    .min(3),
  modeOfContact: yup
    .string()
    .oneOf(["Email", "Phone"], "Please select a mode of Contact")
    .required("Click the Mode Of Contact"),
  supportType: yup
    .string()
    .oneOf(["Remote Support", "Hardware Support"])
    .required("Select the Support Type"),
  requestingFor: yup
    .string()
    .oneOf(["Self", "Others"], "Select one to proceed")
    .required("Select one to Continue"),
  otherUserID: yup.string().when("requestingFor", {
        is: (value:string) => value ===  "Others",
        then: (schema) => schema 
        .required("Please enter the User ID")
        .min(5)
        .max(5)
      }),
});

interface BreakFixFm {
  userID :string;
  userName:string;
  email:string;
  projectType: string;
  issueDescription: string;
  modeOfContact: string;
  supportType: string;
  requestingFor: string;
  otherUserID?:string
}

const BreakFixForm: React.FC = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const navigate = useNavigate();
  const [initialValues, setInitialValues] = React.useState<BreakFixFm>({
    userID:"",
    userName:"",
    email:"",
    projectType: "",
    issueDescription: "",
    modeOfContact: "",
    supportType: "",
    requestingFor: "",
    otherUserID:"",
  })

  useEffect(()=>{

    const token = localStorage.getItem('token');
    if(token){
      const decodedToken:any = jwtDecode(token);
      setInitialValues(prevValue =>({
        ...prevValue, userID:decodedToken.userID || '',
        userName:decodedToken.userName || '',
        email:decodedToken.email || ''
      }))
      console.log("userID:", decodedToken.userID);
      console.log("userName:", decodedToken.userName);
      console.log("email:", decodedToken.email);
    }
  },[]);



  const onsubmit = async (values: BreakFixFm, { resetForm }: FormikHelpers<BreakFixFm>) => {
    setIsLoading(true);
    console.log("values from Front:", values)
    try {
      const formval = await axiosPrivate.post("/ticket/CreateBreakFix", values);
      setIsLoading(false)
      toast.success(formval.data.message);
      resetForm()
      navigate('/Dashboard')
    } catch (error) {
      setIsLoading(false);
      toast.error('Failed to update, Try again later')
   
    }
  };

  return (
    <Box>
      <Box display={"flex"} width={"100%"}>
        <SideBar />
        <Box flexGrow={1}>
          <Header />
          <Box display={"flex"} p={2}>
            <Box sx={{ width: "100%" }}>
              <Typography variant="h5" gutterBottom>
                BreakFix Support
              </Typography>
              <Box display={"grid"}>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={onsubmit}
                  enableReinitialize={true}
                >
                  {({ values, errors, touched, handleBlur, handleChange, resetForm }) => (
                    <Form>
                      <Box width={"100%"}>
                        <Grid container spacing={6}>
                          <Grid item xs={6}>
                            <Box sx={{ border: "1px solid #ccc", p: 2, borderRadius: 2 }}>
                              <Grid container spacing={2} alignItems="center">
                                <Grid item xs={12} md={4}>
                                  <Typography>Project Type</Typography>
                                </Grid>
                                <Grid item xs={12} md={8}>
                                  <Select
                                    name="projectType"
                                    label="Project Type"
                                    value={values.projectType}
                                    fullWidth
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={touched.projectType && Boolean(errors.projectType)}
                                  >
                                    <MenuItem value="">Select</MenuItem>
                                    <MenuItem value="Project Based">Project Based</MenuItem>
                                    <MenuItem value="Non-Project Based">Non Project Based</MenuItem>
                                  </Select>
                                </Grid>
                                <Grid item xs={12} md={4}>
                                  <Typography>Issue Description</Typography>
                                </Grid>
                                <Grid item xs={12} md={8}>
                                  <Field
                                    name="issueDescription"
                                    as={TextField}
                                    label="Issue Description"
                                    value={values.issueDescription}
                                    fullWidth
                                    multiline
                                    onChange={handleChange}
                                    onBlur={handleBlur}
                                    error={touched.issueDescription && Boolean(errors.issueDescription)}
                                    helperText={touched.issueDescription && errors.issueDescription}
                                  />
                                </Grid>
                                <Grid item xs={12} md={4}>
                                  <Typography>Mode Of Contact</Typography>
                                </Grid>
                                <Grid item xs={12} md={8}>
                                 <RadioGroup
                                      name="modeOfContact"
                                      value={values.modeOfContact}
                                      onBlur={handleBlur}
                                      onChange={handleChange}
                                    >
                                      <FormControlLabel value="Email" control={<Radio />} label="Email" />
                                      <FormControlLabel value="Phone" control={<Radio />} label="Phone" />
                                    </RadioGroup>
                                    {touched.modeOfContact && Boolean(errors.modeOfContact) && (
                                      <Typography color="error">{errors.modeOfContact}</Typography>
                                    )}
                                </Grid>
                                <Grid item xs={12} md={4}>
                                  <Typography>Support Type</Typography>
                                </Grid>
                                <Grid item xs={12} md={8}>
                                  <RadioGroup
                                  name="supportType"
                                  value={values.supportType}
                                  onBlur={handleBlur}
                                  onChange={handleChange}
                                  >
                                    <FormControlLabel value='Remote Support' control={<Radio/>} label="Remote Support"/>
                                    <FormControlLabel value="Hardware Support" control={<Radio/>} label='Hardware Support'/>

                                  </RadioGroup>
                                    {touched.supportType && Boolean(errors.supportType) && (
                                      <Typography color="error">{errors.supportType}</Typography>
                                    )}
                                  
                                </Grid>
                              </Grid>
                            </Box>
                          </Grid>
                          <Grid item xs={6}>
                            <Box sx={{ border: "1px solid #ccc", p: 2, borderRadius: 2, width: "90%" }}>
                              <Grid container spacing={2} alignItems="center">
                                <Grid item xs={12} md={4}>
                                  <Typography>Requesting For</Typography>
                                </Grid>
                                <Grid item xs={12} md={8}>
                                  <Select
                                    name="requestingFor"
                                    value={values.requestingFor}
                                    fullWidth
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={touched.requestingFor && Boolean(errors.requestingFor)}
                                  >
                                    <MenuItem value="">Select</MenuItem>
                                    <MenuItem value="Self">Self</MenuItem>
                                    <MenuItem value="Others">Other Person</MenuItem>
                                  </Select>
                                </Grid>
                                {/* UserId */}
                                {values.requestingFor === 'Others' && 
                                <>
                                <Grid item xs={12} md={4}>
                                    <Typography>
                                        User ID
                                    </Typography>
                                </Grid>
                                <Grid item xs={12} md={8}>
                                    <Field
                                    name='otherUserID'
                                    value={values.otherUserID}
                                    as={TextField}
                                    label={'User ID'}
                                    fullWidth
                                    onBlur={handleBlur}
                                    onChange={handleChange}
                                    error={touched.otherUserID && Boolean(errors.otherUserID)}
                                    helperText={touched.otherUserID && errors.otherUserID}
                                    />
                                </Grid>
                                </>
                                }
                                <Grid item xs={12} md={8}>
                                  <Button type="submit" 
                                  variant="contained" 
                                  fullWidth sx={{ ml: 2, mr: 4 }}
                                  disabled={isLoading}
                                  >
                                    {isLoading?'Loading....':'Submit'}
                                  </Button>
                                </Grid>
                              </Grid>
                            </Box>
                          </Grid>
                        </Grid>
                      </Box>
                    </Form>
                  )}
                </Formik>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default BreakFixForm;
