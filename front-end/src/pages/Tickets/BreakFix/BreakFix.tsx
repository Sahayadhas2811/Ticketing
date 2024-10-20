import { Box, Button, Card, CardActions, CardContent, CardMedia, Grid, Typography, Link } from "@mui/material";
import React from "react";
import BreakFixForm from "./BreakFixForm";
import { useNavigate } from "react-router-dom";

const cardData = 
    {
        title:'Break Fix',
        description:'Something-Not working (General Query)',
        imageURL:require('../../../Uploads/BreakFix1.jpg')
    }

const BreakFix:React.FC = ()=>{
    const navigate = useNavigate();

    const handleSubmit = ()=>{
        navigate('/Ticket/BreakFix/BreakFixForm')
    }
    return(
        <Box p={2}>
                     <Card sx={{width:'100%',  
                                transition:'transform 0.3s ease-in-out',
                                "&:hover":{transform:'scale(1.05)'}}}>
                                    <CardMedia
                                    component={'img'}
                                    alt="Break Fix"
                                    image={cardData.imageURL}
                                    height={100}
                                    />
                                    <CardContent>
                                        <Typography gutterBottom variant="h5" component={'div'} >
                                            {cardData.title}
                                        </Typography>
                                        <Typography variant="body2" sx={{color:'text.secondary'}}>
                                            {cardData.description}
                                        </Typography>
                                    </CardContent>
                                    <CardActions>
                                        <Button 
                                        variant="contained"
                                        fullWidth
                                        sx={{p:'0 2'}}
                                        onClick={handleSubmit}
                                        > Request
                                        </Button>
                                    </CardActions>
                            </Card>
                </Box>
    )
}

export default BreakFix