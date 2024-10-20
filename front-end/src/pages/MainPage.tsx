import * as react from 'react';
import { Box, Button, List, ListItem, ListItemText, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { keyframes } from '@mui/system'; 

const Home:React.FC = ()=>{
  const navigate = useNavigate();

  const redirectTicket = ()=>{
    navigate('/RegisterUser');
  }

  const slideInAnimation =keyframes`
  0%{
  transform: translatex(-100%)
  }
  100%{
  transform: translatex(0%)
  }
  `;

  return(
    
    <Box sx={{
      display:'flex',
      flexDirection:'column',
      alignItems:'center',
      justifyContent:'center',
      m:8,
      p:5,
      mx:'auto',
      border:'1px solid #ccc',
      borderRadius:5,
      boxShadow:'0 4px 10px rgba(0, 0, 0, 0.1)',
      position:'relative'
    }}>
      <Typography mb={2} textAlign={'center'} variant='h4' fontWeight={'bold'} fontFamily={'-moz-initial'}>
        Welcome To Ticketer Tool
      </Typography>
      <Typography variant='h6' textAlign={'center'}>
      Your go-to solution for managing support tickets effortlessly!
      </Typography>
      <Typography variant='body1' textAlign={'center'} color='gray'>
      Whether you're reporting an issue, requesting assistance, or tracking progress, Ticketer Tool makes it quick and easy. Let's get started!
      </Typography>
      <Typography mt={5} textAlign={'center'}>
      How Ticketer Tool Helps You:
      </Typography>

      <Box display={'flex'} alignItems={'center'} justifyContent={'center'}>
      <List>
        <ListItem>
          <ListItemText
          primary={<strong>Quick Ticket Creation: </strong>} secondary="Submit your request in just a few clicks."          />
        </ListItem>
        <ListItem>
        <ListItemText
          primary={<strong>Track Your Tickets: </strong>} secondary="Stay updated with the status of your open and resolved tickets."
          />
        </ListItem>
        <ListItem>
        <ListItemText
          primary={<strong>Get Help Fast: </strong>}
          secondary="Our streamlined process ensures faster response times."
          />
        </ListItem>
      </List>

      <Box
      sx={{float:'right', ml:3, width:'250px', height:'250px', alignSelf:'center' }}
      component={'img'}
      src="computer.png"
      alt='image'
      />
      </Box>
      <Button
      type='submit'
      variant='contained'
      onClick={redirectTicket}
      sx={{
        mt: 4,
        animation: `${slideInAnimation} 5s ease-in-out`, // Apply the animation to the button
      }}
      >
        Raise Ticket
      </Button>
    </Box>
  )
}

export default Home