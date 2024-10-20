import react from 'react';
import { Box, Grid } from '@mui/material';
import SideBar from '../pages/Components/Sidebar'
import Header from './Components/Header';
import BreakFix from './Tickets/BreakFix/BreakFix';

const TicketPage: React.FC = ()=>{
    return(
        <Box display={'flex'} width={'100%'}>
            <SideBar/>
            <Box flexGrow={1}>
            <Header/>
            <Box display={'flex'} width={'100%'} flexWrap={'wrap'} mr={1} >
                <Grid container spacing={1}>
                <Grid item xs={12} sm={6} md={4} lg={3} >
                    <BreakFix/>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3} >
                    <BreakFix/>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3} >
                    <BreakFix/>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3} >
                    <BreakFix/>
                </Grid>
                <Grid item xs={12} sm={6} md={4} lg={3} >
                    <BreakFix/>
                </Grid>

                </Grid>
            
            </Box>
            </Box>
        </Box>
    )
}

export default TicketPage