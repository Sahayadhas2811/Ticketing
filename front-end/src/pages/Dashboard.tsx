import react, { useEffect, useState } from 'react';
import Sidebar from '../pages/Components/Sidebar'
import { Box, Button, colors, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TablePagination, TableRow } from '@mui/material';
import Header from './Components/Header';
import { axiosPrivate } from '../axios/Axios';
import { jwtDecode } from 'jwt-decode';

interface ticketdetails{
    _id:string,
    projectType:string,
    supportType:string,
    otherUserID:string,
    userID:string,
    modeOfContact:string,
    requestingFor:string,
    issueDescription:string,
}

const Dashboard:React.FC = ()=>{
    const [tickets, setTickets] = useState<ticketdetails[]>([]);
    const [userID, setUserID] = useState<string>('');
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [inTicketDetails, SetInTicketDetails] = useState<ticketdetails | null>(null);
    const [hoverRow, setHoverRow] = useState<string |null>(null)


    useEffect(()=>{
        const token = localStorage.getItem('token');
        if(token){
            const decodedToken:any = jwtDecode(token);
            setUserID(decodedToken.userID)
        }
    },[])

    useEffect(()=>{
        if(userID){
            handleData()
        }
    },[userID])

    const handleData = async()=>{
        try {
            const fetchdata = await axiosPrivate.get(`/ticket/GetBreakFix/?userID=${userID}`);
            setTickets(fetchdata.data.data);
            console.log("fetched Data:", fetchdata)
        } catch (error:any) {
            throw new Error(error.message)
        }
    }
    console.log("tickets", tickets);

    const handlePageChange = (event:any, newPage:number)=>{
        setPage(newPage)
    }

    const handleRowPerPage = (event:React.ChangeEvent<HTMLInputElement>)=>{
        setRowsPerPage(+event.target.value);
        setPage(0);
    }

    const handleRowTicketDetails = (ticket:ticketdetails)=>{
        setOpenDialog(true);
        SetInTicketDetails(ticket)
    };

    const handlecloseDialog =()=>{
        setOpenDialog(false);
    }

    const displayedTickets = tickets.slice(page*rowsPerPage, page*rowsPerPage+rowsPerPage)

    return(
        <Box display={'flex'} width={'100%'}>
            <Sidebar/>
            <Box flexGrow={1}>
            <Header/>
            <TableContainer component={Paper} sx={{width:'95%', m:2, "&:hover":{colors:'gray'}}} >
                <Table>
                <TableHead>
                    <TableRow>
                        <TableCell>OrderID</TableCell>
                        <TableCell>Project Type</TableCell>
                        <TableCell>Support Type</TableCell>
                        <TableCell>Other User ID</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                {displayedTickets.map(ticket =>(
                    <TableRow 
                    key={ticket._id}
                    onClick={()=>handleRowTicketDetails(ticket)}
                    sx={{cursor:'pointer',
                        backgroundColor: hoverRow === ticket._id ? 'lightgray' : 'inherit',
                        "&:hover": {backgroundColor:'lighblue'}
                    }}
                    onMouseEnter={()=>setHoverRow(ticket._id)}
                    onMouseLeave ={()=>setHoverRow(null)}
                    >
                        <TableCell>{ticket._id}</TableCell>
                        <TableCell>{ticket.projectType}</TableCell>
                        <TableCell>{ticket.supportType}</TableCell>
                        <TableCell>{ticket.otherUserID}</TableCell>

                    </TableRow>
                ))}
                </TableBody>
                </Table>
                <TablePagination
                component={'div'}
                page={page}
                onPageChange={handlePageChange}
                rowsPerPage={rowsPerPage} // Use the correct variable name
                onRowsPerPageChange={handleRowPerPage}
                count={tickets.length}
                >
                </TablePagination>
            </TableContainer>

            {/* DialogBox */}
            {inTicketDetails && (
                <Dialog open={openDialog} onClose={handlecloseDialog}>
                    <DialogTitle>Ticket Details</DialogTitle>
                    <DialogContent>
                        <p><strong>OrderID: </strong>{inTicketDetails._id}</p>
                        <p><strong>UserID: </strong>{inTicketDetails.userID}</p>
                        <p><strong>Project Type: </strong>{inTicketDetails.projectType}</p>
                        <p><strong>Issue Description: </strong>{inTicketDetails.issueDescription}</p>
                        <p><strong>Mode Of Contact: </strong>{inTicketDetails.modeOfContact}</p>
                        <p><strong>Support Type: </strong>{inTicketDetails.supportType}</p>
                        <p><strong>Requesting For: </strong>{inTicketDetails.requestingFor}</p>
                        <p><strong>Other User ID: </strong>{inTicketDetails.otherUserID}</p>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handlecloseDialog} color='primary'>Close</Button>
                    </DialogActions>
                </Dialog>
            )}
            </Box>
        </Box>
    )
}

export default Dashboard;