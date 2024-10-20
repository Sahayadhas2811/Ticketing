import { Box, Button, Typography } from '@mui/material';
import react from 'react';
import Sidebar from '../pages/Components/Sidebar';
import Header from './Components/Header';
import { keyframes, Keyframes } from '@emotion/react';
import { useNavigate } from 'react-router-dom';

const MainPage:React.FC = () =>{
  const navigate = useNavigate();

  const handleRouteTickets = ()=>{
    navigate('/Ticket')
  }

  const animatedButton = keyframes`
  0%{
  transform: translatex(-100%)
  }100%{
  tranform: translatex(0%)
  }
  `
    return(
        <Box display={'flex'} width={'100%'}>
            <Sidebar/>
            <Box flexGrow={1}>
                <Header/>
                <Box sx={{ display:'flex',
                  flexDirection:'column',
                  alignItems:'center',
                  justifyContent:'center',
                  width:'95%', 
                  ml:2,}}>
                  <Typography justifyContent={'justify'}>
                  A ticketing tool is a system designed to streamline 
                  and manage customer or internal support 
                  requests, commonly referred to as tickets. 
                  Each ticket represents a specific issue,
                  inquiry, or task that requires attention, allowing 
                  teams to track, prioritize, and resolve them efficiently. 
                  These tools help organize workflows by assigning tickets to 
                  the appropriate individuals or departments, ensuring timely 
                  responses and resolutions. With features like status updates,
                   priority settings, and communication tracking, ticketing tools
                    enhance accountability, improve user experience, and facilitate smoother collaboration within teams or with customers.
                  </Typography>
                  <Button
                  type='submit'
                  variant='contained'
                  sx={{mt:5,
                    animation: `${animatedButton} 5s ease-in-out`
                  }}
                  onClick={handleRouteTickets}
                  
                  >
                    Raise Ticket
                  </Button>
                </Box>
            </Box>
        </Box>
    )
}

export default MainPage;