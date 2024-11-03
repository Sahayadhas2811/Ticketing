import react, { useEffect, useState } from 'react';
import Sidebar from '../Components/Sidebar'
import Header from '../Components/Header';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Paper, Select, SelectChangeEvent, Table, 
    TableBody, TableCell, 
    TableContainer, TableHead, TablePagination, TableRow, 
    Typography} from '@mui/material';
import { axiosPrivate } from '../../axios/Axios';
import React from 'react';

interface TicketDetails{
    _id:string,
    userID:string,
    projectType:string,
    issueDescription:string,
    modeOfContact:string,
    supportType:string,
    requestingFor:string,
    otherUserID:string,
    ticketStatus:string
}

const AdminDashboard:React.FC = () =>{
    const [ticketDetails, setTicketDetails] = useState<TicketDetails[]>([]);
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [openDialog, setOpenDialog] = useState<boolean>(false);
    const [inTicketDetails, SetInTicketDetails] = useState<TicketDetails | null>(null);
    const [hoverRow, setHoverRow] = useState<string | null>(null);
    
    useEffect(()=>{
        const fetchData = async()=>{
            const response = await axiosPrivate.get('/ticket/getAllBreakFix');
            console.log("Response for GetALL:", response );
            setTicketDetails(response.data.data)
        }
        fetchData();
    },[]);

    const updateData = async ()=>{
        if(inTicketDetails){
            try {
                const response = await axiosPrivate.put(`/ticket/UpdateBreakFix/?_id=${inTicketDetails._id}`, inTicketDetails);
                setTicketDetails(prev => prev.map(ticket => ticket._id === inTicketDetails._id ? {...inTicketDetails} : ticket))
                handleCloseDialog()
            } catch (error) {
                return {message:'Failed to update ticket', error}
            }
        }
    };

    const handleTicketStatus = (event: SelectChangeEvent)=>{
        if(inTicketDetails){
            SetInTicketDetails({
                ...inTicketDetails,
                ticketStatus:event.target.value as string 
            })
        }
    }

    const handlePageChange = (event:any, newPage:number)=>{
        setPage(newPage)
    };

    const handleRowsPerChange = (event:React.ChangeEvent<HTMLInputElement>)=>{
        setRowsPerPage(+event.target.value);
        setPage(0)
    };

    const handleOPenDialogTicket = (ticket:TicketDetails)=>{
        setOpenDialog(true)
        SetInTicketDetails(ticket)
    }

    const handleCloseDialog = ()=>{
        setOpenDialog(false)
    }

    const ticketsInPage = ticketDetails.slice(page*rowsPerPage, page*rowsPerPage+rowsPerPage)
    
    return(
        <Box display={'flex'} width={'96%'}>
            <Sidebar/>
            <Box flexGrow={1}>
                <Header/>
                <Box>
                    <TableContainer component={Paper} sx={{m:2, width:'100%', "&:hover":{color:'gray'}}}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell>ID</TableCell>
                                    <TableCell>UserID</TableCell>
                                    <TableCell>Support Type</TableCell>
                                    <TableCell>Requesting For</TableCell>
                                    <TableCell>Status</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {ticketsInPage.map(ticket =>(
                                    <TableRow
                                    key={ticket._id}
                                    onClick={()=>handleOPenDialogTicket(ticket)}
                                    sx={{cursor:'pointer', 
                                        backgroundColor: hoverRow === ticket._id ? 'lightgray' : 'inherit',
                                        "&:hover":{backgroundColor:'lightblue'}
                                    }}
                                    onMouseEnter ={()=>setHoverRow(ticket._id)}
                                    onMouseLeave = {()=>setHoverRow(null)}
                                    >
                                        <TableCell>{ticket._id}</TableCell>
                                        <TableCell>{ticket.userID}</TableCell>
                                        <TableCell>{ticket.supportType}</TableCell>
                                        <TableCell>{ticket.requestingFor}</TableCell>
                                        <TableCell>{ticket.ticketStatus}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                        <TablePagination
                        component={'div'}
                        page={page}
                        onPageChange={handlePageChange}
                        rowsPerPage={rowsPerPage}
                        onRowsPerPageChange={handleRowsPerChange}
                        count={ticketDetails.length}
                        ></TablePagination>
                    </TableContainer>

                    {/* dialog Box  */}

                    {inTicketDetails && (
                        <Dialog
                        open={openDialog}
                        onClose={handleCloseDialog}
                        >
                            <DialogTitle>
                                <Typography>Ticket Details</Typography>
                            </DialogTitle>
                            <DialogContent>
                                <p><strong>Ticket Order ID: </strong>{inTicketDetails?._id}</p>
                                <p><strong>User ID: </strong>{inTicketDetails?.userID}</p>
                                <p><strong>Project Type: </strong>{inTicketDetails?.projectType}</p>
                                <p><strong>Mode Of Contact: </strong>{inTicketDetails?.modeOfContact}</p>
                                <p><strong>Issue Description: </strong>{inTicketDetails?.issueDescription}</p>
                                <p><strong>Requesting For: </strong>{inTicketDetails?.requestingFor}</p>
                                <p><strong>Support Type: </strong>{inTicketDetails?.supportType}</p>
                                <p><strong>Other User ID: </strong>{inTicketDetails?.otherUserID}</p>

                                <FormControl
                                fullWidth
                                margin='dense'
                                >
                                    <InputLabel>Status</InputLabel>
                                    <Select
                                    value={inTicketDetails.ticketStatus}
                                    onChange={handleTicketStatus}
                                    label='Status'
                                    >
                                        <MenuItem value='Pending' >Pending</MenuItem>
                                        <MenuItem value='Fullfillment' >FullFillment</MenuItem>
                                        <MenuItem value='Closed'>Closed</MenuItem>
                                    </Select>
                                </FormControl>
                            </DialogContent>
                            <DialogActions>
                                <Button
                                variant='contained'
                                onClick={updateData}
                                >Update</Button>
                                <Button
                                onClick={handleCloseDialog}
                                >Close</Button>
                            </DialogActions>
                        </Dialog>
                    )}
                </Box>
            </Box>
        </Box>
    )
}

export default AdminDashboard;