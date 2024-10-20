import React, { useEffect, useState } from 'react';
import { Route, useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import HomeIcon from '@mui/icons-material/Home';
import InfoIcon from '@mui/icons-material/Info';
import { Box, Drawer, Typography, Divider, List, ListItem, ListItemIcon, ListItemText, Button, Avatar, Dialog, DialogTitle, DialogContent, DialogActions, TextField } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { axiosPrivate } from '../../axios/Axios';
import AdminPanelSettingsIcon from '@mui/icons-material/AdminPanelSettings';
import { toast } from 'react-toastify';
import { Form, Formik } from 'formik';

interface DecodeName {
  userName: string,
  userID: string,
  email:string,
  reason:string
};



const Home: React.FC = () => {
  const [name, setName] = useState<string | null>(null);
  const [userID, setUserID] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = useState<boolean>(false);
  const [profileDialogOpen, setProfileDialogOPen] = useState<boolean>(false);
  const [profileData, setProfileData] = useState<DecodeName | null>(null);
  const [adminDialog, setAdminDialog] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState(false)

  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decodedToken: DecodeName = jwtDecode(token);
      setName(decodedToken.userName);
      setUserID(decodedToken.userID);
      setEmail(decodedToken.email)
    }
  }, []);

  useEffect(()=>{
    if(userID){
      handleData()
    }
  },[userID]);

  const handleData = async ()=>{
    try {
      const response = await axiosPrivate.get(`/register/getRegister?userID=${userID}`);
      console.log('Responce in Sidebar', response)
      setProfileData(response.data.data[0]);
    } catch (error:any) {
      throw new Error(error.message)
    }
  }

  const menuList = [
    { text: 'Profile', icon: <AccountCircleIcon />, action: 'Profile' },
    { text: 'Dashboard', icon: <HomeIcon />, route: '/Dashboard' },
    { text: 'Tickets', icon: <InfoIcon />, route: '/Ticket' },
    { text:'AdminPage', icon:<AdminPanelSettingsIcon/>, action: 'adminRequest' }
  ];

  const handleMenuClick =(item:any)=>{
    if(item.action === 'Profile'){
        setProfileDialogOPen(true);
    }else if(item.action === 'adminRequest'){
      setAdminDialog(true)
    }else if(item.route){
        navigate(item.route)
    }
  }

  const initialValues:DecodeName = {
    userName: name || '',
    userID: userID || '',
    email: email || '',
    reason:''
  }

  const logout = () => {
    localStorage.removeItem('token');
    navigate('/');
  };

  const handleClickOpen = ()=>{
    setDialogOpen(true)
};

const handleClose = ()=>{
setDialogOpen(false)
}

const handleProfileDialog = ()=>{
  setProfileDialogOPen(false)
};

const handleAdminPageClose = ()=>{
  setAdminDialog(false);
};

// adminpageOnsubmit

const onsubmit = async(values:DecodeName)=>{
  setIsLoading(true)
  try {
    const response = await axiosPrivate.post('/adminPage/RequestAccess', values);
    setIsLoading(false)
    toast.success(response.data.message);
  } catch (error:any) {
    toast.error('Request  Failed to send');
    return ({message:error.message})
  }
}

  const drawerWidth = 240;

  function stringAvatar(name: string) {
    return {
      sx: {
        bgcolor: "lightblue",
      },
      children: `${name.charAt(0)}`,
    };
  };


  return (
    <Drawer
      variant='permanent'
      sx={{
        width: drawerWidth,
        flexShrink: 0,
        [`& .MuiDrawer-paper`]: 
        { width: drawerWidth, boxSizing: 'border-box' },
      }}
    >
      <Box
        display='flex'
        flexDirection='column'
        height='100vh'
        bgcolor={'#f4f4f4'}
        justifyContent={'space-between'}
      >
        {/* Profile Section */}
        <Box m={2}>
          <Box
            display='flex'
            flexDirection='row'
            alignItems='center'
            border='1px solid #ccc'
            boxShadow='0 4px 10px rgba(0, 0, 0, 0.1)'
            borderRadius={2}
            p={1}
          >
            <Avatar 
            {...stringAvatar(name || 'Guest')} 
            sx={{ width: 50, height: 50 }}
            
            />
            <Box ml={2}>
              <Typography>{name ? name : 'Guest'}</Typography>
              <Typography variant="body2">ID: {userID ? userID : '*****'}</Typography>
            </Box>
          </Box>
        </Box>

        <Divider />

        {/* Menu Items */}
        <Box sx={{ overflow: 'auto', flex: 1 }}> {/* Flex-grow to ensure list takes available space */}
          <List>
            {menuList.map((item, index) => (
              <ListItem
                component='button'
                key={index}
                onClick={() => handleMenuClick(item)}
                sx={{
                  display: 'flex',
                  justifyContent: 'flex-start',
                  padding: '10px 16px',
                  textAlign: 'left',
                  width: '100%',
                  background: 'none',
                  border: 'none',
                  color: 'inherit',
                  '&:hover': {
                    backgroundColor: '#f0f0f0',
                  }
                }}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
          </List>
        </Box>

        {/* Logout Button */}
        <Box sx={{ padding: '16px' }}>
          <Button
            variant='contained'
            fullWidth
            onClick={handleClickOpen} // Fix here
            startIcon={<LogoutIcon />}
          >
            Logout
          </Button>
        </Box>

        <Dialog
        open={dialogOpen}
        onClose={handleClose}
        aria-labelledby='alert-dialog-title'
        aria-describedby='alert-dialog-description'
        >
            <DialogTitle id='alert-dialog-title'>
                {"Confirm Logout"}
            </DialogTitle>
            <DialogContent id='alert-dialog-description'>
                Are you sure you want to Logout?
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" onClick={handleClose} color='primary'>
                    No
                </Button>
                <Button variant='contained' onClick={logout} color='primary' autoFocus>
                    Yes
                </Button>
            </DialogActions>
        </Dialog>

        {/* Profile Dialog */}
        <Dialog open={profileDialogOpen} onClose={handleProfileDialog}>
          <DialogTitle>Profile Detail</DialogTitle>
          <DialogContent>
            {profileData ? (
              <>
              <p><strong>User Name: </strong>{profileData.userName}</p>
              <p><strong>Email: </strong>{profileData.email}</p>
              </>
            ):(<p>Loading...</p>)}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleProfileDialog} color='primary'>
              close
            </Button>
          </DialogActions>
      </Dialog>

      {/* Admin Page */}

      <Dialog
      open={adminDialog}
      onClose={handleAdminPageClose}
      >
        <DialogTitle>
          Admin Access Request
        </DialogTitle>
        <DialogContent>
          <Typography sx={{mb:2}}>
          Need Admin Access?
          </Typography>
          <Formik
          initialValues={initialValues}
          onSubmit={onsubmit}
          >
            {({values, handleBlur, handleChange, errors})=>{
              return(
                <Form>
                  <TextField
                  name='reason'
                  label='Request Reason'
                  fullWidth
                  value={values.reason}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  />
                  <Button
                    type='submit'
                    disabled={isLoading}
                    sx={{mt:1}}
                    fullWidth
                    variant='contained'
                    >{isLoading? 'Loading...':'Request'}</Button>
                </Form>
              )
            }}
          </Formik>
        </DialogContent>
        <DialogActions>
          
          <Button
          type='submit'
          onClick={handleAdminPageClose}
          >Close</Button>
        </DialogActions>
      </Dialog>
      </Box>
    </Drawer>
  );
}

export default Home;
